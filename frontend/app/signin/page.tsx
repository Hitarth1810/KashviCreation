"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

export default function SignInPage() {
	const { login } = useAuth();
	const [userType, setUserType] = useState("user");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		try {
			await login(email, password);
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
					<h1 className='text-3xl font-bold'>Welcome Back</h1>
					<p className='text-gray-600 mt-2'>Sign in to your account</p>
				</div>
				{error && (
					<p className='text-red-500 text-sm mb-4 text-center'>{error}</p>
				)}
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
						Sign In
					</button>
					<div className='text-center text-sm text-gray-600'>
						Don&apos;t have an account?{" "}
						<Link href='/signup' className='text-[#8B1B48] hover:underline'>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
