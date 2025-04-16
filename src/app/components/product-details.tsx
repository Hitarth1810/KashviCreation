"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Edit2, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";
import { ProductForm } from "@/app/components/product-form";
import { Product } from "@/types/product";
import ProductItems from "./product-details-items";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function ProductDetails() {
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const searchParams = useSearchParams();
	const productId = searchParams.get("id");

	const isMobile = useMediaQuery("(max-width: 768px)");

	useEffect(() => {
		if (!productId) return;
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`/api/protected/admin/product/${productId}`
				);
				setProduct(response.data);
				if (isMobile) {
					setMobileDialogOpen(true);
				}
			} catch (err) {
				setError(`Failed to fetch product: ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId, isMobile]);

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
			{/* Desktop: Show Product Details & Edit Button */}
			{!isMobile && (
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
					<ProductItems productP={product} />
				</>
			)}

			{/* Mobile: Show Product Details in Dialog with Edit button and one close */}
			{isMobile && (
				<Dialog open={mobileDialogOpen} onOpenChange={setMobileDialogOpen}>
					<DialogContent
						className='max-h-[90vh] overflow-y-auto sm:max-w-[95vw]'
					>
						<div className='flex items-center justify-between'>
							<DialogTitle>Product Details</DialogTitle>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setMobileDialogOpen(false)}
							>
								<X className='h-5 w-5' />
							</Button>
						</div>

						{/* Edit Button inside mobile dialog */}
						<div className="mb-4">
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

						<ProductItems productP={product} />
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
