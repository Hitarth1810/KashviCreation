"use client";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/user/userSlice";
import { useState } from "react";
import Link from "next/link";
import Popup from "@/app/components/popup";
import {
	useGoogleLoginMutation,
	useLoginMutation,
} from "@/lib/api/authApiSlice";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export default function SignInPage() {
	const dispatch = useDispatch();
	const [login] = useLoginMutation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [popup, setPopup] = useState<{
		message: string;
		type: "success" | "error";
		isVisible: boolean;
	}>({ message: "", type: "success", isVisible: false });

	const [googleLogin] = useGoogleLoginMutation(); // Assuming you have a googleLogin mutation

	const router = useRouter();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setPopup({ message: "", type: "success", isVisible: false });

		try {
			const result = await login({ email, password }).unwrap();

			// after `const result = await login(...).unwrap();`
			dispatch(setUser(result.user)); // Immediately update Redux with new user
			localStorage.setItem("user", JSON.stringify(result.user));

			// Assuming result contains user object and token
			setPopup({
				message: "Sign in successful! Redirecting...",
				type: "success",
				isVisible: true,
			});

			setTimeout(() => {
				setPopup((prev) => ({ ...prev, isVisible: false }));

				// Use returned user role instead of store (store not updated yet)
				if (result.user.role === "ADMIN") {
					router.push("/admin/products");
				} else {
					router.push("/dashboard?tab=orders");
				}
			}, 1500);
		} catch (err: unknown) {
			// Check if the backend returned a proper error message
			if (
				typeof err === "object" &&
				err !== null &&
				"data" in err &&
				typeof (err as { data?: { message?: string } }).data === "object" &&
				(err as { data?: { message?: string } }).data !== null &&
				"message" in (err as { data?: { message?: string } }).data!
			) {
			}

			setPopup({
				message: "Incorrect credentials, please try again.",
				type: "error",
				isVisible: true,
			});
		}
	}

	const handleGoogleLogin = async (credential: string) => {
		try {
			const data = await googleLogin(credential).unwrap();
			dispatch(setUser({ user: data.user, token: data.token }));
			localStorage.setItem("token", data.token);
			router.push("/dashboard?tab=orders");
		} catch (error) {
			console.error("Google login failed:", error);
			setPopup({
				message: "Google login failed, please try again.",
				type: "error",
				isVisible: true,
			});
		}
	};

	function closePopup() {
		setPopup({ ...popup, isVisible: false });
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#FDF8F7] px-4'>
			<div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold'>Welcome Back</h1>
					<p className='text-gray-600 mt-2'>Sign in to your account</p>
				</div>
				<form onSubmit={onSubmit} className='space-y-6'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Email
						</label>
						<input
							id='email'
							type='email'
							placeholder='Enter your email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent'
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							placeholder='Enter your password'
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent'
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-[#8B1B48] text-white py-2 px-4 rounded-md hover:bg-[#6B1537] transition-colors duration-200'
					>
						Sign In
					</button>
					<GoogleLogin
						onSuccess={(res) => {
							if (res.credential) {
								handleGoogleLogin(res.credential);
							} else {
								setPopup({
									message: "Google credential not found. Please try again.",
									type: "error",
									isVisible: true,
								});
							}
						}}
					></GoogleLogin>
					<div className='text-center text-sm text-gray-600'>
						Don&apos;t have an account?{" "}
						<Link href='/signup' className='text-[#8B1B48] hover:underline'>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
			{popup.isVisible && (
				<Popup message={popup.message} type={popup.type} onClose={closePopup} />
			)}
		</div>
	);
}
