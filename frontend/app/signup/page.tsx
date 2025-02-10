"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Popup from "./Popup"

export default function SignUpPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("user")
  const [popup, setPopup] = useState({ message: "", type: "", isVisible: false })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Add your signup logic here
    const success = true // Replace with actual success/failure condition
    if (success) {
      setPopup({ message: "Sign up successful!", type: "success", isVisible: true })
      setTimeout(() => {
        setPopup({ ...popup, isVisible: false })
        router.push("/signin")
      }, 3000)
    } else {
      setPopup({ message: "Sign up failed. Please try again.", type: "error", isVisible: true })
    }
  }

  function closePopup() {
    setPopup({ ...popup, isVisible: false })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F7] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-600 mt-2">Enter your details to create your account</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
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
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1B48] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === "user"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2 text-[#8B1B48] focus:ring-[#8B1B48]"
                />
                <span className="text-sm text-gray-700">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2 text-[#8B1B48] focus:ring-[#8B1B48]"
                />
                <span className="text-sm text-gray-700">Admin</span>
              </label>
            </div>
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
      {popup.isVisible && <Popup message={popup.message} type={popup.type} onClose={closePopup} />}
    </div>
  )
}