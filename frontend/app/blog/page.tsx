"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

interface blogPosts {
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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/blog_slider.jpg",
    "/blog_slider2.jpg",
    "/blog_slider3.jpg",
    "/blog_slider4.jpg",
    "/blog_slider5.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Hero Section with Slider */}
      <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -1000 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide] || "/placeholder.svg"}
              alt="Saree Collection"
              width={1500}
              height={100}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore Trends, Unravel Stories, and Embrace Elegance!
          </h1>
        </div>
        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white  overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-64 sm:h-80">
                  {/* Use object-[position] and object-contain */}
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 mb-2">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-semibold text-white line-clamp-2">
                      {post.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{post.date}</span>
                    <span className="text-indigo-600 font-medium flex items-center gap-1 group">
                      Read more
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
