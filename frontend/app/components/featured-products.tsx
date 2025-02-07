import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Multi Color Net Embroidered Lehenga Set",
    price: 27200,
    image: "/dummy1.jpg",
  },
  {
    id: 2,
    name: "Green Quilted Jacket And Pant Set",
    price: 17500,
    image: "/dummy2.jpg",
  },
  {
    id: 3,
    name: "Yellow Silk Blend Floral Embroidered Bundi",
    price: 12500,
    image: "/dummy3.jpeg",
  },
  {
    id: 4,
    name: "Wine Pure Banarasi Silk Lehenga Choli",
    price: 10500,
    image: "/dummy4.jpg",
  },
];

export function FeaturedProducts() {
  return (
    <div className="relative bg-gradient-to-b from-white to-[#FFF5E9] px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="absolute top-0 left-0 right-0 h-24">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C320,20 480,80 720,50 C960,20 1120,80 1440,50 L1440,0 L0,0 Z"
            fill="none"
            stroke="#E5D1B8"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <h2
            className="font-serif text-3xl tracking-wider"
            style={{ fontFamily: "Tenor Sans, serif" }}
          >
            Featured Products
          </h2>
          <div className="h-[1px] w-24 bg-gray-300 mt-1"></div>
        </div>
        <Link
          href="/"
          className="text-gray-600 hover:text-[#8B1D3F] flex items-center gap-2 text-sm"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] mb-4">
              <div className="absolute inset-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
                  <defs>
                    <clipPath id={`scallop-${product.id}`}>
                      <path
                        d="M30,0 H270 C285,0 300,15 300,30 
                        V320 
                        C300,350 285,365 270,380
                        Q250,400 150,400
                        Q50,400 30,380
                        C15,365 0,350 0,320
                        V30 C0,15 15,0 30,0 Z"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `url(#scallop-${product.id})` }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={product.id === 1}
                  />
                </div>
              </div>
            </div>
            <h3 className="font-medium text-sm mb-2 text-gray-800">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="font-semibold">₹{product.price.toLocaleString()}</p>
              <button className="px-4 py-1 rounded-full border border-[#8B1D3F] text-[#8B1D3F] text-sm bg-white hover:bg-[#8B1D3F] hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
