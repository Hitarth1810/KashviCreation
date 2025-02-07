import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Multi Color Net Embroidered Lehenga Set",
    price: 7500,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Embellished Indian Bridal Wear Lehenga Choli",
    price: 25700,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Green Blouse Embroidered Lehenga Set",
    price: 22800,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Pink Silk Floral Embroidered Bundi And Kurta Set",
    price: 11500,
    image: "/placeholder.svg?height=400&width=300",
  },
]

export function PopularProducts() {
  return (
    <div className="bg-white px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-serif text-3xl">Popular Products</h2>
        <Link href="/products" className="text-gray-600 hover:text-[#8B1D3F] flex items-center gap-2">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] mb-4">
              <div className="absolute inset-0 bg-[url('/frame.svg')] bg-contain bg-no-repeat">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover p-4"
                />
              </div>
            </div>
            <h3 className="font-medium text-sm mb-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <p className="font-semibold">₹{product.price.toLocaleString()}</p>
              <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

