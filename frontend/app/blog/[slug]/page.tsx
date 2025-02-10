"use client"

import { blogPosts } from "../../data/blogPosts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";

export default function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Find the blog post by slug
  const blog = blogPosts.find((post) => post.slug === slug);

  // If no blog is found, show a 404 page
  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="relative flex flex-col md:flex-row items-center justify-center h-[55vh]">
        {/* Hero Image */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: -270 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute w-full md:w-1/2 h-full rounded-xl overflow-hidden shadow-lg"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Blog Title & Meta */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 270 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute max-w-md text-center md:text-left"
        >
          <h1 className="text-4xl font-normal text-gray-900">{blog.title}</h1>
          <p className="text-md text-gray-600 mt-1">
            {blog.date} · {blog.readTime}
          </p>
        </motion.div>
      </div>

      {/* Blog Content */}
      <div className="bg-white shadow-lg rounded-xl p-8 mt-8 leading-8 text-lg text-gray-800">
        {blog.content ? (
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p className="text-gray-600 text-center">Content coming soon...</p>
        )}
      </div>
    </div>
  );
}