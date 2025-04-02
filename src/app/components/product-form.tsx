"use client";

import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductFormProps {
	product?: Product;
	onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
	const [id, setId] = useState(product?.id || "");
	const [name, setName] = useState(product?.name || "");
	const [description, setDescription] = useState(product?.description || "");
	const [category, setCategory] = useState(product?.category || "");
	const [stock, setStock] = useState(product?.stock || 0);
	const [colors, setColors] = useState<string[]>(product?.colors || []);
	const [newColor, setNewColor] = useState("");
	const [images, setImages] = useState<File[]>([]); // Store images as File objects
	const [loading, setLoading] = useState(false);

	// Handle Image Upload
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		// Convert FileList to Array and append to state
		setImages([...images, ...Array.from(files)]);
	};

	// Handle Form Submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("id", id);
			formData.append("name", name);
			formData.append("description", description);
			formData.append("category", category);
			formData.append("stock", stock.toString());

			colors.forEach((color) => formData.append("colors", color)); // Ensure colors are properly sent
			images.forEach((file) => formData.append("images", file)); // Ensure images are properly appended

			const response = await axios.post(
				"/api/protected/admin/product",
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			if (response.status === 200) {
				onSuccess();
			}
		} catch (error) {
			console.error("Error saving product:", error);
		} finally {
			setLoading(false);
		}
	};


	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='space-y-4'>
				{!product && (
					<div className='grid gap-2'>
						<Label htmlFor='product-id'>Product ID</Label>
						<Input
							id='product-id'
							value={id}
							onChange={(e) => setId(e.target.value)}
							required
							placeholder='Enter product id'
						/>
					</div>
				)}
				<div className='grid gap-2'>
					<Label htmlFor='name'>Name</Label>
					<Input
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						placeholder='Enter product name'
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='description'>Description</Label>
					<Textarea
						id='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						placeholder='Enter product description'
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='category'>Category</Label>
					<Input
						id='category'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
						placeholder='Enter product category'
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='stock'>Stock</Label>
					<Input
						id='stock'
						type='number'
						value={stock}
						onChange={(e) => setStock(Number(e.target.value))}
						required
						placeholder='Enter stock quantity'
					/>
				</div>
				<div className='grid gap-2'>
					<Label>Colors</Label>
					<div className='flex flex-wrap gap-2'>
						{colors.map((color, index) => (
							<div
								key={index}
								className='flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm'
							>
								{color}
								<button
									type='button'
									onClick={() =>
										setColors(colors.filter((_, i) => i !== index))
									}
									className='ml-1 rounded-full hover:bg-secondary-foreground/10'
								>
									<X className='h-3 w-3' />
								</button>
							</div>
						))}
					</div>
					<div className='flex gap-2'>
						<Input
							value={newColor}
							onChange={(e) => setNewColor(e.target.value)}
							placeholder='Add a color'
						/>
						<Button
							type='button'
							variant='outline'
							onClick={() => {
								if (newColor) {
									setColors([...colors, newColor]);
									setNewColor("");
								}
							}}
						>
							Add
						</Button>
					</div>
				</div>

				{/* Image Upload */}
				<div className='grid gap-2'>
					<Label>Images</Label>
					<Input
						type='file'
						accept='image/*'
						multiple
						onChange={handleImageUpload}
						disabled={loading}
					/>

					{/* Display Uploaded Images */}
					<div className='flex flex-wrap gap-2'>
						{images.map((image, index) => (
							<div key={index} className='relative w-24 h-24'>
								<Image
									src={URL.createObjectURL(image)} // Preview before upload
									alt={`Uploaded ${index}`}
									fill
									objectFit='contain'
									className='rounded-lg'
								/>
								<button
									type='button'
									onClick={() =>
										setImages(images.filter((_, i) => i !== index))
									}
									className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full'
								>
									<X className='h-4 w-4' />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='flex justify-end gap-4'>
				<Button
					type='button'
					variant='outline'
					onClick={onSuccess}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button type='submit' disabled={loading}>
					{loading ? "Saving..." : "Save Product"}
				</Button>
			</div>
		</form>
	);
}
