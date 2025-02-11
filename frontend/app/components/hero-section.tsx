"use client";

import React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
// import React from "react";
import Image from "next/image";

const images = [
  "/blog_bridal.jpg",
  "/blog_drapping.jpg",
  "/blog_fabriccare.jpg",
  "/blog_fashiontrends.jpg",
  "/blog_history.jpg",
  "/blog_trad.jpg",
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Carousel auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const visibleImages = [
    images[(currentIndex - 2 + images.length) % images.length],
    images[(currentIndex - 1 + images.length) % images.length],
    images[currentIndex],
    images[(currentIndex + 1) % images.length],
    images[(currentIndex + 2) % images.length],
  ];

  const gradientStyle = {
    background: `radial-gradient(
      circle at ${mousePosition.x}% ${mousePosition.y}%,
      #FFF1E6 0%,
      #FFE4D6 30%,
      #FFD9C7 70%,
      #FFF1E6 100%
    )`,
    transition: 'background 0.3s ease-out',
  };

  return (
    <main 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={gradientStyle}
    >
      {/* Half-page design */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/rangoli.png')" }}>
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Heading with Hindi text */}
        <div className="text-center py-8">
          <h1 className="text-4xl text-gray-800 kalam-bold">हमारी सुंदरता की कहानी</h1>
        </div>

        {/* Image Carousel */}
        <div className="pt-[2em] pb-16 px-4 flex justify-center items-center gap-8 relative">
          <div className="flex gap-5 items-center justify-center">
            <AnimatePresence mode="popLayout">
              {visibleImages.map((image, index) => (
                <motion.div
                  key={image}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                  className={`relative ${
                    index === 2 ? "w-[23em] h-[32em]" : index === 1 || index === 3 ? "w-[18em] h-[24em]" : "w-[15em] h-[20em]"
                  } overflow-hidden rounded-lg shadow-lg hover:shadow-2xl`}
                >
                  <Image
                    src={image}
                    alt={`Carousel image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={400}
                    height={100}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
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
    </main>
  )
}