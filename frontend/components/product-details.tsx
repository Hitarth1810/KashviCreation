"use client"

import { useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Edit2, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProductForm } from "@/components/product-form"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Product } from "@/types/product"

// Sample data - replace with your actual data fetching logic
const products: Record<string, Product> = {
  PROD001: {
    id: "PROD001",
    name: "Banarasi Silk Saree",
    description: "Traditional Banarasi silk saree with intricate zari work",
    thumbnails: ["/placeholder.svg", "/placeholder.svg"],
    colors: ["Red", "Blue", "Green"],
    price: 15999,
    stock: 10,
    reviews: [
      {
        id: "REV001",
        rating: 5,
        comment: "Beautiful saree, excellent quality!",
        customerName: "Priya Sharma",
        createdAt: new Date(),
      },
      {
        id: "REV002",
        rating: 4,
        comment: "Good product, but delivery was delayed",
        customerName: "Anita Patel",
        createdAt: new Date(),
      },
    ],
  },
}

export function ProductDetails() {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const product = productId ? products[productId] : null

  if (!product) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        Select a product to view its details
      </div>
    )
  }

  return (
    <>
      <div className="border-b bg-muted/40 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <ProductForm product={product} onSuccess={() => setEditDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="overflow-auto">
        <div className="p-4">
          <Carousel className="w-full">
            <CarouselContent>
              {product.thumbnails.map((thumbnail, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={thumbnail || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Colors</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Badge key={color} variant="secondary">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Price & Stock</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>{product.stock} in stock</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold">Reviews</h3>
              <div className="mt-4 space-y-4">
                {product.reviews?.map((review) => (
                  <div key={review.id} className="rounded-lg border bg-card p-4 text-card-foreground">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.customerName}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.createdAt.toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

