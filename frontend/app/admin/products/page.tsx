"use client";

import { ProductList } from "@/app/components/product-list";
import { ProductDetails } from "@/app/components/product-details";
import { AddProductButton } from "@/app/components/add-product-button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
	const [products, setProducts] = useState([]);

	// Function to fetch products from the API
	const fetchProducts = async () => {
		try {
			const response = await axios.get("/api/protected/admin/product");
			setProducts(response.data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	// Fetch products on initial load
	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='flex h-screen flex-col md:flex-row'>
			<div className='flex-1 overflow-auto border-r'>
				<div className='flex items-center justify-between border-b bg-muted/40 p-4'>
					<h1 className='text-2xl font-semibold'>Products</h1>
					{/* Pass fetchProducts function to update the list after adding a new product */}
					<AddProductButton refreshProducts={fetchProducts} />
				</div>
				<ProductList products={products} />
			</div>
			<div className='w-full border-t md:w-[400px] md:border-t-0'>
				<ProductDetails />
			</div>
		</div>
	);
}
