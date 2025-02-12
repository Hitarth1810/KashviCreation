'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, ScrollText } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover object-center"
        >
          <source src="/sexy video.mp4" type="video/mp4" />
        </video>

        {/* Vignette effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-black/10 to-black/70" />
      </div>

      {/* Content */}
      <div className="absolute  inset-0 flex flex-col justify-center items-center text-[#FFF5E6] px-6 md:px-[9%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl mx-auto text-center"
        >
          {/* Title */}
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-4xl pr-[3%] md:text-7xl font-kalam font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            प्रेम और विश्वास
          </motion.h1>

          <motion.h1
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-4xl pl-[13%] md:text-7xl font-kalam font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            का अनोखा संगम
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-2xl text-[#F5E6E0] font-light tracking-wide mt-4"
          >
            Discover the elegance of traditional Indian craftsmanship
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-8"
          >
            <Link href='/collections' passHref>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#E8C4BC] hover:bg-[#eb8c7d] text-gray-800 shadow-lg px-6 md:px-8 py-4 text-lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
              </Button>
            </motion.div>
            </Link>
            <Link href='/about' passHref>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="border-2 border-[#E8C4BC] text-[#e7a292] hover:bg-[#E8C4BC]/10 px-6 md:px-8 py-4 text-lg">
                <ScrollText className="mr-2 h-5 w-5" />
                Our Story
              </Button>
            </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
