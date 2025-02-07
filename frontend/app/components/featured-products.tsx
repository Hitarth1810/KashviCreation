import Link from "next/link"
import Image from "next/image"

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
    price: 27200,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Green Quilted Jacket And Pant Set",
    price: 17500,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Yellow Silk Blend Floral Embroidered Bundi",
    price: 12500,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Wine Pure Banarasi Silk Lehenga Choli",
    price: 10500,
    image: "/placeholder.svg?height=400&width=300",
  },
]

export function FeaturedProducts() {
  return (
    <div className="bg-gradient-to-b from-white to-[#FFF5E9] px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-serif text-3xl">Featured Products</h2>
        <Link href="/products" className="text-gray-600 hover:text-[#8B1D3F] flex items-center gap-2">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] mb-4">
              <div className="absolute inset-0 bg-[url('/arch-frame.svg')] bg-contain bg-no-repeat">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover p-4"
                />
              </div>
            </div>
            <h3 className="font-medium text-sm mb-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <p className="font-semibold">₹{product.price.toLocaleString()}</p>
              <button  className="opacity-0 group-hover:opacity-100 transition-opacity">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

