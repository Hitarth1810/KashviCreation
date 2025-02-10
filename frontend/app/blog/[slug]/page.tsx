import { blogPosts } from "../../data/blogPosts";
import Image from "next/image";
import { notFound } from "next/navigation";



export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const slug  = (await params).slug
    

  // Find the blog post by slug
  const blog = blogPosts.find((post) => post.slug === slug);

  // If no blog is found, show a 404 page
  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p className="text-sm">{blog.date} · {blog.readTime}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
        <p className="text-gray-800 leading-7">{blog.content}</p>
      </div>
    </div>
  );
}
