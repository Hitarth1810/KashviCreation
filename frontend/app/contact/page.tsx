"use client";

import { Phone, Mail, Users, MessageSquare, Video } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RangoliPattern from "./RangoliPattern";

export default function ContactPage() {
  const [, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF7F3] to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <RangoliPattern />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        {/* Left Column */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-bold text-[#8B1D3F] mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600">
              Email, call, or complete the form to learn how we can solve your
              needs.
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              className="flex items-center space-x-3 group"
              whileHover={{ x: 4 }}
            >
              <div className="w-10 h-10 bg-[#FDF7F3] rounded-lg flex items-center justify-center group-hover:bg-[#f8e3d5] transition-colors">
                <Mail className="w-5 h-5 text-[#8B1D3F] group-hover:text-[#8B1D3F]" />
              </div>
              <a
                href="mailto:Kashvicreation10@gmail.com"
                className="text-gray-700 hover:text-[#8B1D3F] transition-colors"
              >
                kashvicreation10@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 group"
              whileHover={{ x: 4 }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#FDF7F3] rounded-lg flex items-center justify-center group-hover:bg-[#f8e3d5] transition-colors">
                    <Phone className="w-5 h-5 text-[#8B1D3F] group-hover:text-[#8B1D3F]" />
                  </div>
                  <div className="flex flex-col">
                    <a
                      href="tel:+917290909696"
                      className="text-gray-700 hover:text-[#8B1D3F] transition-colors"
                    >
                      +91 7290909696
                    </a>
                    <a
                      href="tel:+919376421333"
                      className="text-gray-700 hover:text-[#8B1D3F] transition-colors"
                    >
                      +91 9376421333
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Horizontal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#f8e3d5] group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-3">
                <Users className="w-8 h-8 text-[#8B1D3F] group-hover:text-[#8B1D3F] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-[#8B1D3F] mb-2 group-hover:text-[#8B1D3F]">
                Customer Support
              </h3>
              <p className="text-gray-600 text-sm">
                Available 24/7 to address your concerns and queries.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#f8e3d5] group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-3">
                <MessageSquare className="w-8 h-8 text-[#8B1D3F] group-hover:text-[#8B1D3F] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-[#8B1D3F] mb-2 group-hover:text-[#8B1D3F]">
                Feedback
              </h3>
              <p className="text-gray-600 text-sm">
                Share your thoughts to help us improve.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#f8e3d5] group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-3">
                <Video className="w-8 h-8 text-[#8B1D3F] group-hover:text-[#8B1D3F] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-[#8B1D3F] mb-2 group-hover:text-[#8B1D3F]">
                Media Inquiries
              </h3>
              <p className="text-gray-600 text-sm">
                Press and media related questions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-[#8B1D3F] mb-2">
              Get in Touch
            </h2>
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
                  className="w-full px-4 py-3 bg-[#FDF7F3]/50 border-2 border-[#f8e3d5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:border-[#8B1D3F]"
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
                  className="w-full px-4 py-3 bg-[#FDF7F3]/50 border-2 border-[#f8e3d5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:border-[#8B1D3F]"
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
                className="w-full px-4 py-3 bg-[#FDF7F3]/50 border-2 border-[#f8e3d5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:border-[#8B1D3F]"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex">
                <select className="px-4 py-3 bg-[#FDF7F3]/50 border-2 border-[#f8e3d5] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:border-[#8B1D3F]">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 bg-[#FDF7F3]/50 border-2 border-l-0 border-[#f8e3d5] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:border-[#8B1D3F]"
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
                className="w-full px-4 py-3 bg-[#FDF7F3]/50 border-2 border-[#f8e3d5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:border-[#8B1D3F]"
              ></textarea>
              <div className="text-right text-gray-500 text-sm mt-1">0/120</div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full px-4 py-3 bg-[#8B1D3F] text-white font-semibold rounded-md shadow-md hover:bg-[#7a1936] focus:outline-none focus:ring-2 focus:ring-[#8B1D3F] focus:ring-offset-2 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit
            </motion.button>

            <p className="text-center text-sm text-gray-500">
              By contacting us, you agree to our{" "}
              <a href="#" className="text-[#8B1D3F] hover:underline">
                Terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#8B1D3F] hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}