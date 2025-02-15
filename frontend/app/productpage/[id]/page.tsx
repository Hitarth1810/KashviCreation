"use client";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type React from "react";
import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Send, Minus, Plus, ShoppingCart } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-neutral-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Zoom>
                <Image
                  src={hoveredImage || selectedImage}
                  alt={product?.name || "Product Image"}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </Zoom>
            </motion.div>

            {/* Thumbnails */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-4 gap-4"
            >
              {product?.images?.map((image, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(image)}
                  onMouseEnter={() => setHoveredImage(image)}
                  onMouseLeave={() => setHoveredImage(null)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    (hoveredImage || selectedImage) === image
                      ? "border-indigo-500 shadow-lg"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product?.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Product Details */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 lg:pt-8"
          >
            <div className="space-y-2">
              <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-4xl lg:text-5xl text-gray-900 font-serif"
              >
                {product?.name}
              </motion.h1>
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < 4 ? "text-amber-400" : "text-gray-300"
                      }`}
                      fill={idx < 4 ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.0 (128 reviews)</span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg text-gray-600"
            >
              <p>{product?.description}</p>
            </motion.div>

            {/* Color Selection */}
            {product?.colors && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900">Color</h3>
                <div className="flex space-x-4">
                  {product.colors.map((color, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-full ${color} border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selection */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
              <div className="inline-flex items-center bg-white rounded-full shadow-md p-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange("decrement")}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5 text-indigo-600" />
                </motion.button>
                <span className="mx-6 text-lg font-semibold text-gray-900">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange("increment")}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5 text-indigo-600" />
                </motion.button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex space-x-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCartClick}
                className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isInCart ? "View Cart" : "Add to Cart"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsInWishlist(!isInWishlist)}
                className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 lg:mt-24"
        >
          <h2 className="text-3xl font-serif text-gray-900 mb-8">
            Customer Reviews
          </h2>

          {/* Add Review Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            onSubmit={handleSubmitReview}
            className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg mb-8 space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              Write a Review
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= (hoverRating || newReview.rating)
                            ? "text-amber-400"
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
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Review
              </motion.button>
            </div>
          </motion.form>

          {/* Reviews List */}
          <div className="space-y-6">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative w-16 h-16">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        className="rounded-full object-cover"
                        fill
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {review.name}
                        </h3>
                        <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-5 h-5 ${
                              idx < review.rating
                                ? "text-amber-400"
                                : "text-gray-300"
                            }`}
                            fill={idx < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-gray-600 text-base leading-relaxed"
                      >
                        {review.comment}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;