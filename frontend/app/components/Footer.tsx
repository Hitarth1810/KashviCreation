"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import Logo from "@/public/KCLogo.png";
import LogoLetter from "@/public/KCLogoLetter.png";

export default function Footer() {
  return (
    <footer className="bg-pink-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section with Map and Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative">
          {/* Map Section */}
          <div className="w-full rounded-lg overflow-hidden shadow-md md:w-[90%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.198385451438!2d72.84406537431065!3d21.18427668242081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e4bffd55d29%3A0x9facf9728614cf00!2sMillennium%20Textile%20Market%202!5e0!3m2!1sen!2sin!4v1739453271727!5m2!1sen!2sin"
              className="w-full h-[200px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Instagram Feed Section */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-2xl font-serif mb-6 text-gray-800 text-center flex items-center justify-center gap-2">
              Follow us on Instagram
              <a
                href="https://www.instagram.com/_kashvicreation?igsh=eG5naW1yMGU5ZjB0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition duration-300"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  width={22}
                  height={22}
                />
              </a>
            </h3>

            {/* Instagram Grid */}
            <div className="grid grid-cols-4 gap-0.5 w-full max-w-md">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="aspect-square w-full relative">
                  <Image
                    src={`/instagram-post-${index + 1}.jpg`} // Replace with actual image paths
                    alt={`Instagram post ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-gray-200">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mr-3 group">
              <div className="flex items-center space-x-3 transition-all duration-300">
                <Image
                  src={Logo}
                  alt="logo"
                  width={40}
                  height={50}
                  className="opacity-90 transition-all duration-300 group-hover:opacity-100 transform group-hover:scale-110"
                  priority
                />
                <Image
                  src={LogoLetter}
                  alt="logoletter"
                  width={90}
                  height={30}
                  className="opacity-90 transition-all duration-300 group-hover:opacity-100 transform group-hover:scale-110"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-600 text-sm mt-10">
              We are a fashion brand that offers the best of contemporary,
              ethnic Indian fashion and fusion-wear styles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li className="group relative">
                <Link
                  href="/collections"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    Collections
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link
                  href="/about"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    About Us
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link
                  href="/contact"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    Contact us
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link
                  href="/blog"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    Blog
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link
                  href="/faq"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    FAQs
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-xl font-medium mb-4">My Account</h4>
            <ul className="space-y-2">
              <li className="group relative">
                <Link
                  href="/signin"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    Login
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link
                  href="/cart"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    Shopping Cart
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link
                  href="/wishlist"
                  className="text-gray-600 group-hover:text-pink-600 text-lg relative inline-block"
                >
                  <span className="relative">
                    Wishlist
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
<div>
  <h4 className="text-xl font-medium mb-4">Contact</h4>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Address Column */}
    <ul className="space-y-4">
      {/* Head Office */}
      <li className="flex items-start group relative">
        <MapPin 
          className="w-6 h-6 text-gray-600 transition-all duration-300 group-hover:text-pink-600 transform group-hover:scale-110 flex-shrink-0 mt-1"
          strokeWidth={2}
        />
        <div className="text-gray-600 group-hover:text-pink-600 text-lg ml-2 relative">
          <span className="relative">
            <strong>Head Office:</strong><br />
            Shop No. 6115 To 6124,<br />
            Millennium Textile Market-4,<br />
            Bhathena, Surat-395002
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </span>
        </div>
      </li>

      {/* Sales Office */}
      <li className="flex items-start group relative">
        <MapPin 
          className="w-6 h-6 text-gray-600 transition-all duration-300 group-hover:text-pink-600 transform group-hover:scale-110 flex-shrink-0 mt-1"
          strokeWidth={2}
        />
        <div className="text-gray-600 group-hover:text-pink-600 text-lg ml-2 relative">
          <span className="relative">
            <strong>Sales Office:</strong><br />
            Shop No.113,<br />
            Millennium Textile Market-2,<br />
            Ring Road, Surat-395002
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </span>
        </div>
      </li>
    </ul>

    {/* Contact Details Column */}
    <ul className="space-y-4">
      {/* Email */}
      <li className="flex items-center group relative">
        <Mail
          className="w-6 h-6 text-gray-600 transition-all duration-300 group-hover:text-pink-600 transform group-hover:scale-110 flex-shrink-0"
          strokeWidth={2}
        />
        <Link
          href="mailto:Kashvicreation10@gmail.com"
          className="text-gray-600 group-hover:text-pink-600 text-lg ml-2 relative"
        >
          <span className="relative">
            Kashvicreation10@gmail.com
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </span>
        </Link>
      </li>

      {/* Phone */}
      <li className="flex items-center group relative">
        <Phone 
          className="w-6 h-6 text-gray-600 transition-all duration-300 group-hover:text-pink-600 transform group-hover:scale-110 flex-shrink-0"
          strokeWidth={2}
        />
        <div className="text-gray-600 group-hover:text-pink-600 text-lg ml-2 relative">
          <span className="relative">
            <a href="tel:+919376421333" className="hover:text-pink-600">+91 9376421333</a>
            {" / "}
            <a href="tel:+917290909696" className="hover:text-pink-600">+91 7290909696</a>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </span>
        </div>
      </li>

      {/* Hours */}
      <li className="flex items-center group relative">
        <Clock 
          className="w-6 h-6 text-gray-600 transition-all duration-300 group-hover:text-pink-600 transform group-hover:scale-110 flex-shrink-0"
          strokeWidth={2}
        />
        <div className="text-gray-600 group-hover:text-pink-600 text-lg ml-2 relative">
          <span className="relative">
            10 AM - 7 PM, Monday - Saturday
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-400 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</div>
      </div>
        

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            © 2007 - {new Date().getFullYear()} Kashvi Creation. All Rights Reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2 md:mt-0">
            We Ship Across the World
          </p>
        </div>
      </div>
    </footer>
  );
}
