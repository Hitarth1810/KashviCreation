export interface Product {
  id: string
  name: string
  description: string
  thumbnails: string[]
  colors: string[]
  price: number
  stock: number
  reviews?: ProductReview[]
}

export interface ProductReview {
  id: string
  rating: number
  comment: string
  customerName: string
  customerAvatar?: string
  createdAt: Date
}

