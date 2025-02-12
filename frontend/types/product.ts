export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  createdAt: Date
  updatedAt: Date
  colors: string[]
  stock: number
  reviews?: ProductReview[]
  category: string
}

export interface ProductReview {
  id: string
  rating: number
  comment: string
  customerName: string
  customerAvatar?: string
  createdAt: Date
}

