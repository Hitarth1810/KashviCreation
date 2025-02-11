"use client"

import { blogPosts } from "../../data/blogPosts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

export default function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const blog = blogPosts.find((post) => post.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image Container */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Title and Meta Container */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-600">
            {blog.date} · {blog.readTime}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8 mt-8 leading-8 text-lg text-gray-800 font-serif leading-tight text-justify">
          {blog.content ? (
            <div 
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="text-gray-600 text-center">Content coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
}