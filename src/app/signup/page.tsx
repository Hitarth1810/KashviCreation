"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Popup from "@/app/components/popup";
import { useSignupMutation } from "@/lib/api/authApiSlice";

export default function SignUpPage() {
  const [signup] = useSignupMutation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPopup({ message: "", type: "error", isVisible: false });

    // Validation: Phone number
    if (!/^\d{10}$/.test(phone)) {
      setPopup({
        message: "Invalid number. Enter a 10-digit phone number.",
        type: "error",
        isVisible: true,
      });
      return;
    }

    // Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPopup({
        message: "Invalid email format. Please enter a valid email.",
        type: "error",
        isVisible: true,
      });
      return;
    }

    // Validation: Password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPopup({
        message:
          "Password must include at least 1 uppercase, 1 lowercase, and 1 special character.",
        type: "error",
        isVisible: true,
      });
      return;
    }

    // If all validations pass, proceed to signup
    try {
      await signup({ email, password, phone: Number(phone), name });
      setPopup({
        message: "Sign up successful!",
        type: "success",
        isVisible: true,
      });
      setTimeout(() => {
        setPopup({ ...popup, isVisible: false });
        router.push("/signin");
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setPopup({ message: err.message, type: "error", isVisible: true });
      } else {
        setPopup({
          message: "An unknown error occurred",
          type: "error",
          isVisible: true,
        });
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
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-600 mt-2">
            Enter your details to create your account
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
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
            Sign Up
          </button>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#8B1B48] hover:underline">
              Sign In
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
