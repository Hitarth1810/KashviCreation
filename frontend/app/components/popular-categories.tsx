import Image from "next/image";

const categories = [
  {
    name: "TRADITIONAL",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "BRIDAL",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "FESTIVE",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "CASUAL",
    image: "/placeholder.svg?height=400&width=300",
  },
];

export function PopularCategories() {
  return (
    <div className="bg-[#FFF5E9] px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h2 className="font-serif text-3xl text-center mb-12">
        Popular Categories
      </h2>
      <div className="flex flex-row justify-center gap-8">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="group cursor-pointer w-64 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative aspect-[3/4]">
              <div className="absolute inset-0 bg-[url('/category-frame.svg')] bg-contain bg-no-repeat">
                <div className="relative w-full h-full p-4">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width="253"
                    height="383"
                    className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-black/60">
                    <h3 className="text-white font-medium text-lg text-center transition-all duration-300 group-hover:scale-110">
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