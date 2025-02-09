"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
	const router = useRouter();
	const [userType, setUserType] = useState("user");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		try {
			const response = await axios.post("/api/auth/signup", {
				name,
				email,
				phone,
				password,
			});

			const data = response.data;

			if (response.status !== 200) {
				throw new Error(data.message || "Something went wrong");
			}

			router.push("/signin");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#FDF8F7] px-4'>
			<div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold'>Create an Account</h1>
					<p className='text-gray-600 mt-2'>
						Enter your details to create your account
					</p>
				</div>
				{error && (
					<p className='text-red-500 text-sm mb-4 text-center'>{error}</p>
				)}
				<form onSubmit={onSubmit} className='space-y-6'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Full Name
						</label>
						<input
							id='name'
							type='text'
							placeholder='Enter your full name'
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent'
						/>
					</div>
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
							htmlFor='phone'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Phone Number
						</label>
						<input
							id='phone'
							type='tel'
							placeholder='Enter your phone number'
							required
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
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
							placeholder='Create a password'
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Account Type
						</label>
						<div className='flex space-x-4'>
							<label className='flex items-center'>
								<input
									type='radio'
									name='userType'
									value='user'
									checked={userType === "user"}
									onChange={(e) => setUserType(e.target.value)}
									className='mr-2 text-[#8B1B48] focus:ring-[#8B1B48]'
								/>
								<span className='text-sm text-gray-700'>User</span>
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='userType'
									value='admin'
									checked={userType === "admin"}
									onChange={(e) => setUserType(e.target.value)}
									className='mr-2 text-[#8B1B48] focus:ring-[#8B1B48]'
								/>
								<span className='text-sm text-gray-700'>Admin</span>
							</label>
						</div>
					</div>
					<button
						type='submit'
						className='w-full bg-[#8B1B48] text-white py-2 px-4 rounded-md hover:bg-[#6B1537] transition-colors duration-200'
					>
						Sign Up
					</button>
					<div className='text-center text-sm text-gray-600'>
						Already have an account?{" "}
						<Link href='/signin' className='text-[#8B1B48] hover:underline'>
							Sign In
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
