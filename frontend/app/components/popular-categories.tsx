import Image from "next/image";
const categories = [
  {
    name: "SAREES",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "LEHENGA CHOLI",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "SALWAR SUIT",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "INDO-WESTERN",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "KURTAS",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "BUNDI SET",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "INDO-WESTERN",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "BANDHGALA",
    image: "/placeholder.svg?height=400&width=300",
  },
];

export function PopularCategories() {
  return (
    <div className="bg-[#FFF5E9] px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h2 className="font-serif text-3xl text-center mb-12">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-[3/4]">
              <div className="absolute inset-0 bg-[url('/category-frame.svg')] bg-contain bg-no-repeat">
                <div className="relative w-full h-full p-4">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width="253"
                    height="383"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center transition-opacity group-hover:bg-black/60">
                    <h3 className="text-white font-medium text-lg text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
