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
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Hero Image */}
      <div className="relative h-[55vh] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

     {/* Blog Title & Meta */}
<div className="text-left mt-4">
  <h1 className="text-4xl font-normal text-gray-900">{blog.title}</h1>
  <p className="text-md text-gray-600 mt-1">{blog.date} · {blog.readTime}</p>
</div>



      {/* Blog Content */}
      <div className="bg-white shadow-lg rounded-xl p-8 mt-1 leading-8 text-lg text-gray-800">
        {blog.content ? (
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <p className="text-gray-600 text-center">Content coming soon...</p>
        )}
      </div>
      
    </div>
  );
}
