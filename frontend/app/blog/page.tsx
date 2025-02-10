"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Draping: 10 Traditional Saree Styles You Must Know",
    excerpt:
      "Discover the rich cultural heritage behind different saree draping styles, from the classic Nivi to the elegant Gujarati style...",
    category: "Styling Guide",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/blog_drapping.jpg",
    slug: "art-of-draping",
  },
  {
    id: 2,
    title: "Understanding Silk Sarees: A Complete Guide to Types and Care",
    excerpt:
      "Learn about different types of silk sarees, from Kanjeevaram to Banarasi, and how to maintain their timeless beauty...",
    category: "Fabric Care",
    date: "March 12, 2024",
    readTime: "6 min read",
    image: "/blog_fabriccare.jpg",
    slug: "silk-sarees-guide",
  },
  {
    id: 3,
    title: "Modern Saree Trends: Fusion Wear for the Contemporary Woman",
    excerpt:
      "Explore innovative ways to style your saree with contemporary elements, perfect for the modern fashion-forward woman...",
    category: "Fashion Trends",
    date: "March 10, 2024",
    readTime: "5 min read",
    image: "/blog_fashiontrends.jpg",
    slug: "modern-saree-trends",
  },
  {
    id: 4,
    title: "Traditional Sarees: The Timeless Beauty of Indian Heritage",
    excerpt:
      "Dive into the world of traditional Indian sarees, from the regal Kanjivaram to the delicate Chanderi. Explore the craftsmanship, rich fabrics, and cultural significance behind these timeless weaves...",
    category: "Traditional Wear",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "/blog_trad.jpg",
    slug: "traditional-wear-sarees",
  },

  {
    id: 5,
    title: "The Evolution of Saree: From Ancient Times to Modern Fashion",
    excerpt:
      "Trace the journey of the saree through history, exploring how this timeless garment has adapted to changing fashion trends while maintaining its cultural significance...",
    category: "Fashion History",
    date: "March 5, 2024",
    readTime: "7 min read",
    image: "/blog_history.jpg",
    slug: "saree-evolution",
  },
  {
    id: 6,
    title: "Bridal Sarees: A Timeless Elegance for the Perfect Wedding Look",
    excerpt:
      "Explore the grandeur of bridal sarees, from Banarasi silk to Kanjivaram weaves. Discover how to choose the perfect saree for your big day, blending tradition with modern aesthetics...",
    category: "Bridal Guide",
    date: "March 5, 2024",
    readTime: "7 min read",
    image: "/blog_bridal.jpg",
    slug: "bridal-wear-sarees",
  },
];

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
      {/* Improved Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[50vh] min-h-[500px] bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Elegance Unveiled
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed"
          >
            Embark on a journey through the rich tapestry of saree culture.
            Explore timeless traditions, contemporary styles, and expert care
            guides.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
