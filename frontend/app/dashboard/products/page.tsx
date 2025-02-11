import { ProductList } from "@/components/product-list"
import { ProductDetails } from "@/components/product-details"
import { AddProductButton } from "@/components/add-product-button"

export default function ProductsPage() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex-1 overflow-auto border-r">
        <div className="flex items-center justify-between border-b bg-muted/40 p-4">
          <h1 className="text-2xl font-semibold">Products</h1>
          <AddProductButton />
        </div>
        <ProductList />
      </div>
      <div className="w-full border-t md:w-[400px] md:border-t-0">
        <ProductDetails />
      </div>
    </div>
  )
}

