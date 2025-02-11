"use client"

import React from "react"
import Link from "next/link"
export function HeroSection() {
  const categories = [
    "Bridal Wear",
    "Groom Wear",
    "Family Collection",
    "Festive Outfits",
    "Sangeet Collection",
    "Pooja Outfit",
  ]

  return (
    <div className="relative bg-gradient-to-b from-[#FFF8F0] to-[#FFF5E9] px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
            Find Your Perfect <span className="text-[#8B1D3F]">Blend</span> of Our{" "}
            <span className="text-[#8B1D3F]">Traditional</span> and <span>Modern Fashion</span>
          </h1>
          <div>
            <p className="text-gray-600 mb-6">What are you looking for?</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                 
                  className="rounded-full border-gray-300 hover:border-[#8B1D3F] hover:text-[#8B1D3F]"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <Link href="/collections">
            <button  className="text-gray-600 hover:text-[#8B1D3F] pl-0">
              — Explore all
            </button>
          </Link>
        </div>
        <div className="relative">
          <div className="aspect-[3/4] rounded-[2rem] overflow-hidden border-8 border-white shadow-xl relative">
            
            <div className="absolute top-4 right-4">
              <div className="w-16 h-16 rounded-full border border-gray-200 bg-white/80 backdrop-blur flex items-center justify-center">
                <div className="text-xs text-center">
                  INDIAN
                  <br />
                  FASHION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
          <path
            d="M985.66 92.83C906.67 72 823.78 31 743.84 14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84 11.73-114 31.07-172 41.86A600.21 600.21 0 0 1 0 27.35V120h1200V95.8c-67.81 23.12-144.29 15.51-214.34-2.97Z"
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  )
}
