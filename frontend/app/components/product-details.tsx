"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Edit2 } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";
import { ProductForm } from "@/app/components/product-form";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/app/components/ui/carousel";
import { Product } from "@/types/product";

export function ProductDetails() {
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const searchParams = useSearchParams();
	const productId = searchParams.get("id");

	useEffect(() => {
		if (!productId) return;
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`/api/protected/admin/product/${productId}`
				);
				console.log(response.data);
				setProduct(response.data);
			} catch (err) {
				setError(`Failed to fetch product: ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	if (!product) {
		return (
			<div className='flex h-full items-center justify-center p-8 text-center text-muted-foreground'>
				Select a product to view its details
			</div>
		);
	}

	if (loading) {
		return (
			<div className='flex h-full items-center justify-center p-8 text-center'>
				Loading product details...
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex h-full items-center justify-center p-8 text-center text-red-500'>
				{error}
			</div>
		);
	}

	return (
		<>
			<div className='border-b bg-muted/40 p-4'>
				<div className='flex items-center justify-between'>
					<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
						<DialogTrigger asChild>
							<Button variant='outline' size='sm'>
								<Edit2 className='mr-2 h-4 w-4' />
								Edit
							</Button>
						</DialogTrigger>
						<DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
							<DialogHeader>
								<DialogTitle>Edit Product</DialogTitle>
							</DialogHeader>
							<ProductForm
								product={product}
								onSuccess={() => setEditDialogOpen(false)}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<div className='overflow-auto h-[calc(100vh-4rem)]'>
				<div className='p-4'>
					<div className=''>
						<Carousel className='w-full'>
							<CarouselContent>
								{product.images.map((image, index) => (
									<CarouselItem key={index}>
										<div className='aspect-square overflow-hidden rounded-lg'>
											<Image
												src={image}
												alt={`${product.name} - Image ${index + 1}`}
												width={400}
												height={400}
												className='h-full w-full object-contain'
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<div className='flex justify-center gap-4'>
								<CarouselPrevious />
								<CarouselNext />
							</div>
						</Carousel>
					</div>
					<div className='mt-4 space-y-4'>
						<div>
							<h3 className="font-semibold">Product ID</h3>
							<p className="mt-1 text-m">{product.id}</p>
						</div>
						<div>
							<h3 className='font-semibold'>Name</h3>
							<p className='mt-1 text-m'>{product.name}</p>
						</div>
						<div>
							<h3 className='font-semibold'>Description</h3>
							<p className='mt-1 text-m'>{product.description}</p>
						</div>
						<div>
							<h3 className="font-semibold">Category</h3>
							<p className="mt-1 text-m'">{product.category}</p>
						</div>
						<div className='flex flex-row justify-between'>
							<div>
								<h3 className='font-semibold'>Created On</h3>
								<p>{new Date(product.createdAt).toLocaleDateString()}</p>
							</div>
							<div>
								<h3 className='font-semibold'>Last Updated On</h3>
								<p>{new Date(product.updatedAt).toLocaleDateString()}</p>
							</div>
						</div>
						<div>
							<span className='font-semibold'>Colors: </span>
							<span>
								{
									product.colors.map((c, index) => (
										<span key={index} className='inline-block px-2 py-1 text-sm bg-gray-200 rounded-lg mr-2'>
											{c}
										</span>
									))
								}
								</span>
							
						</div>
						<div>
							<span className="font-semibold">Stock: </span><span>{product.stock}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
