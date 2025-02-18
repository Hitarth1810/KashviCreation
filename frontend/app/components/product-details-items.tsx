import { Product } from "@/types/product";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "./ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ProductItems({
	productP,
	productId,
}: {
	productP?: Product;
	productId?: string | null;
}) {
	const [productS, setProduct] = useState<Product | null>(null);

	const product = productP || productS;
	useEffect(() => {
		if (!productId) return;
		const fetchProduct = async () => {
			const response = await axios.get(
				`/api/protected/admin/product/${productId}`
			);
			console.log(response.data);
			setProduct(response.data);
		};

		fetchProduct();
	}, [productId]);

	return (
		<div className='overflow-auto h-[calc(100vh-4rem)]'>
			<div className='p-4'>
				<div className=''>
					<Carousel className='w-full'>
						<CarouselContent>
							{product?.images.map((image, index) => (
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
						<h3 className='font-semibold'>Product ID</h3>
						<p className='mt-1 text-m'>{product?.id}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Name</h3>
						<p className='mt-1 text-m'>{product?.name}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Description</h3>
						<p className='mt-1 text-m'>{product?.description}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Category</h3>
						<p className="mt-1 text-m'">{product?.category}</p>
					</div>
					<div className='flex flex-row justify-between'>
						<div>
							<h3 className='font-semibold'>Created On</h3>
							<p>{new Date(product!.createdAt).toLocaleDateString()}</p>
						</div>
						<div>
							<h3 className='font-semibold'>Last Updated On</h3>
							<p>{new Date(product!.updatedAt).toLocaleDateString()}</p>
						</div>
					</div>
					<div>
						<span className='font-semibold'>Colors: </span>
						<span>
							{product?.colors.map((c, index) => (
								<span
									key={index}
									className='inline-block px-2 py-1 text-sm bg-gray-200 rounded-lg mr-2'
								>
									{c}
								</span>
							))}
						</span>
					</div>
					<div>
						<span className='font-semibold'>Stock: </span>
						<span>{product?.stock}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
