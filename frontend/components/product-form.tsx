"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/types/product"

interface ProductFormProps {
  product?: Product
  onSuccess: () => void
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [colors, setColors] = useState<string[]>(product?.colors || [])
  const [newColor, setNewColor] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your form submission logic here
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" required defaultValue={product?.name} placeholder="Enter product name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            required
            defaultValue={product?.description}
            placeholder="Enter product description"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" type="number" required defaultValue={product?.price} placeholder="Enter price" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" required defaultValue={product?.stock} placeholder="Enter stock quantity" />
        </div>
        <div className="grid gap-2">
          <Label>Colors</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
                {color}
                <button
                  type="button"
                  onClick={() => setColors(colors.filter((_, i) => i !== index))}
                  className="ml-1 rounded-full hover:bg-secondary-foreground/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newColor} onChange={(e) => setNewColor(e.target.value)} placeholder="Add a color" />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newColor) {
                  setColors([...colors, newColor])
                  setNewColor("")
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Images</Label>
          <Input type="file" multiple accept="image/*" />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => onSuccess()}>
          Cancel
        </Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  )
}

