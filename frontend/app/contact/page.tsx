"use client"

import { Phone, Mail, Users, MessageSquare, Video } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import RangoliPattern from "./RangoliPattern"

export default function ContactPage() {
  const [, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <RangoliPattern />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        {/* Left Column */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-bold text-orange-800 mb-4">Contact Us</h1>
            <p className="text-gray-600">
              Email, call, or complete the form to learn how we can solve your needs.
            </p>
          </div>

          <div className="space-y-6">
            <motion.div 
              className="flex items-center space-x-3 group"
              whileHover={{ x: 4 }}
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Mail className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              </div>
              <a href="mailto:contact@sareestore.com" className="text-gray-700 hover:text-orange-600 transition-colors">
                contact@sareestore.com
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3 group"
              whileHover={{ x: 4 }}
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Phone className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              </div>
              <a href="tel:+911234567890" className="text-gray-700 hover:text-orange-600 transition-colors">
                +91 123 456 7890
              </a>
            </motion.div>
          </div>

          {/* Horizontal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-orange-100 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-3">
                <Users className="w-8 h-8 text-orange-600 group-hover:text-orange-700 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-orange-800 mb-2 group-hover:text-orange-900">Customer Support</h3>
              <p className="text-gray-600 text-sm">
                Available 24/7 to address your concerns and queries.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-orange-100 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-3">
                <MessageSquare className="w-8 h-8 text-orange-600 group-hover:text-orange-700 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-orange-800 mb-2 group-hover:text-orange-900">Feedback</h3>
              <p className="text-gray-600 text-sm">
                Share your thoughts to help us improve.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-orange-100 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-3">
                <Video className="w-8 h-8 text-orange-600 group-hover:text-orange-700 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-orange-800 mb-2 group-hover:text-orange-900">Media Inquiries</h3>
              <p className="text-gray-600 text-sm">
                Press and media related questions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-orange-800 mb-2">Get in Touch</h2>
            <p className="text-gray-600">You can reach us anytime</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 bg-orange-50/50 border-2 border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 bg-orange-50/50 border-2 border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-orange-50/50 border-2 border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex">
                <select className="px-4 py-3 bg-orange-50/50 border-2 border-orange-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 bg-orange-50/50 border-2 border-l-0 border-orange-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <textarea
                placeholder="How can we help?"
                rows={4}
                className="w-full px-4 py-3 bg-orange-50/50 border-2 border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              ></textarea>
              <div className="text-right text-gray-500 text-sm mt-1">0/120</div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-md shadow-md hover:from-orange-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit
            </motion.button>

            <p className="text-center text-sm text-gray-500">
              By contacting us, you agree to our{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}