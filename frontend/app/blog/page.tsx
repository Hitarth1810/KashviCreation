"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  content: string;
}

const categories = [
  "All",
  "Styling Guide",
  "Fabric Care",
  "Fashion Trends",
  "Bridal Guide",
  "Traditional Wear",
  "Fashion History",
];

const slides = [
  "https://res.cloudinary.com/diujpbja7/image/upload/v1739209832/24341-1_jnrnno.png",
  "https://res.cloudinary.com/diujpbja7/image/upload/v1739209823/19595-8_sntvo1.jpg",
  "https://res.cloudinary.com/diujpbja7/image/upload/v1739209801/19491-5_davbfz.jpg",
  "https://res.cloudinary.com/diujpbja7/image/upload/v1739209809/19591-8_rzu3ps.jpg"
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF7F3] to-rose-50">
      {/* Hero Slider Section */}
      <div className="relative h-[33vh] md:h-[70vh] border-b-2 border-[#8B1D3F]/20">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={slides[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                fill
                className="object-cover object-top"
                priority
                unoptimized
                sizes="100vw"
                loader={({ src }) => src}
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/30 hover:bg-white/50 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/30 hover:bg-white/50 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif size-bold text-gray-800 mb-3">
            Discover the Art of
            <span className="text-[#8B1D3F]"> Elegant Living</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-gray-600">
            Explore our curated collection of stories, guides, and inspiration
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto mb-10 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-b-2 border-gray-300 focus:outline-none focus:border-[#8B1D3F] transition-all duration-300 font-serif text-lg text-gray-700 placeholder:text-gray-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B1D3F] group-hover:w-full transition-all duration-300" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-serif text-base transition-all duration-300
                  ${
                    selectedCategory === category
                      ? "bg-[#8B1D3F] text-white shadow-md shadow-[#8B1D3F]/20"
                      : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-sm"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -5 }}
              className="group bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-60 overflow-hidden">
                  <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-top"
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loader={({ src }) => src}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-serif font-medium bg-white/90 text-[#8B1D3F] mb-2">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-serif font-bold text-white">
                      {post.title}
                    </h2>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 font-serif text-base line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm font-serif">
                    <span className="text-gray-500">{post.date}</span>
                    <span className="text-[#8B1D3F] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}