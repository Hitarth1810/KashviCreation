"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import Popup from "@/app/components/popup";

export default function SignInPage() { 
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error"; isVisible: boolean }>({ message: "", type: "success", isVisible: false });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPopup({ message: "", type: "success", isVisible: false });

    try {
      await login(email, password);
      setPopup({ message: "Sign in successful!", type: "success", isVisible: true });
      setTimeout(() => {
        setPopup({ ...popup, isVisible: false });
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setPopup({ message: err.message, type: "error", isVisible: true });
      } else {
        setPopup({ message: "An unknown error occurred", type: "error", isVisible: true });
      }
    }
  }

  function closePopup() {
    setPopup({ ...popup, isVisible: false });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F7] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8B1B48] text-white py-2 px-4 rounded-md hover:bg-[#6B1537] transition-colors duration-200"
          >
            Sign In
          </button>
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#8B1B48] hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      {popup.isVisible && <Popup message={popup.message} type={popup.type} onClose={closePopup} />}
    </div>
  );
}
