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
      {/* <div className="absolute top-0 left-0 right-0 h-24">
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
      </div> */}

      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <h2
            className="font-serif text-3xl tracking-wider"
            style={{ fontFamily: "Tenor Sans, serif" }}
          >
            Featured Products
          </h2>
          {/* <div className="h-[1px] w-24 bg-gray-300 mt-1"></div> */}
        </div>
        <Link href="/">
          <button className="text-gray-600 hover:text-[#8B1D3F] pl-0 hover:cursor-pointer">
            View All →
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] mb-4">
              <div className="absolute inset-0">
                <svg
                  width="253"
                  height="383"
                  viewBox="0 0 253 383"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <clipPath id="clip-path">
                    <path
                      d="M247.335 57.1045C251.599 61.5573 252 72.3043 252 72.3043V381.525H1.46753V71.8293C1.46753 71.8293 1.86867 61.0823 6.13294 56.6295C8.24985 54.4191 9.88515 53.5891 12.6645 52.3546C17.2226 50.3301 21.4669 52.3026 25.2611 49.0296C27.935 46.7231 28.6077 45.2105 29.9265 41.9047C32.5084 35.4331 30.5104 30.7418 34.1254 24.805C37.2597 19.6575 39.2037 17.7977 44.3893 14.8301C50.368 11.4087 54.4157 10.7285 61.1848 9.6052C69.2768 8.26238 82.1792 9.6052 82.1792 9.6052C82.1792 9.6052 93.0377 10.4795 99.9077 9.6052C110.77 8.2228 123.546 1.84697 126.501 0.580322C129.455 1.84697 142.698 8.69779 153.56 10.0802C160.43 10.9545 171.289 10.0802 171.289 10.0802C171.289 10.0802 184.191 8.73738 192.283 10.0802C199.052 11.2035 203.1 11.8837 209.078 15.3051C214.264 18.2727 216.208 20.1325 219.342 25.28C222.957 31.2168 220.959 35.9081 223.541 42.3797C224.86 45.6855 225.533 47.1981 228.207 49.5046C232.001 52.7776 236.245 50.805 240.803 52.8296C243.583 54.0641 245.218 54.8941 247.335 57.1045Z"
                      stroke="black"
                    />
                  </clipPath>
                </svg>

                <div
                  className="absolute inset-0"
                  style={{ clipPath: `url(#clip-path)` }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:cursor-pointer"
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
