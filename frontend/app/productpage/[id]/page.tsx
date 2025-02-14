"use client";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type React from "react";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Send, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface NewReview {
  name: string;
  comment: string;
  rating: number;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely stunning saree! The quality of the silk is exceptional, and the zari work is intricate and beautiful. Perfect for my daughter's wedding.",
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 4,
    date: "1 month ago",
    comment:
      "Beautiful craftsmanship and the color is exactly as shown in the pictures. The only reason for 4 stars is that delivery took a bit longer than expected.",
  },
  {
    id: 3,
    name: "Meera Shah",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    rating: 5,
    date: "2 months ago",
    comment:
      "This saree exceeded my expectations! The border design is exquisite and the fabric drapes beautifully. Received many compliments at the event.",
  },
];

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    comment: "",
    rating: 5,
  });
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]); // Set first image as selected
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReview.name.trim() && newReview.comment.trim()) {
      const review: Review = {
        id: reviews.length + 1,
        ...newReview,
        date: "Just now",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: "", comment: "", rating: 5 });
    }
  };
  const handleCartClick = () => {
    if (isInCart) {
      router.push("/cart");
    } else {
      setIsInCart(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-[60vh] sm:h-[80vh] rounded-xl overflow-hidden bg-white flex items-center justify-center px-4"
            >
              <Zoom>
                <Image
                  src={hoveredImage || selectedImage}
                  alt={product?.name || "Product Image"}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  priority
                />
              </Zoom>
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto sm:overflow-hidden sm:grid sm:grid-cols-4 px-2">
              {product?.images?.map((image, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(image)}
                  onMouseEnter={() => setHoveredImage(image)}
                  onMouseLeave={() => setHoveredImage(null)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                    (hoveredImage || selectedImage) === image
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product?.name}
              </h1>
            </div>

            {/* Reviews Summary */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={idx < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.0 (128 reviews)</span>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-600">
              <p>{product?.description}</p>
            </div>

            {/* Color Selection */}
            {product?.colors && (
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="flex space-x-3 mt-2">
                  {product.colors.map((color, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-md`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center mt-2 border border-gray-300 rounded-lg w-max p-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange("decrement")}
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </motion.button>
                <span className="mx-4 text-lg font-semibold">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange("increment")}
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 py-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCartClick}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {isInCart ? "View Cart" : "Add to Cart"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsInWishlist(!isInWishlist)}
                className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>

          {/* Add Review Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmitReview}
            className="bg-white p-6 rounded-lg shadow-sm mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Write a Review
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= (hoverRating || newReview.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill={
                          rating <= (hoverRating || newReview.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </motion.button>
            </div>
          </motion.form>

          {/* Reviews List */}
          <div className="space-y-8">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {review.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={idx < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
