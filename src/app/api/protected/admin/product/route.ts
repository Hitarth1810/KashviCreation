/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/products";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET - Fetch all products
export async function GET(): Promise<NextResponse> {
	console.log("Fetching products...");
	try {
		const products = await getProducts();
		return NextResponse.json(products);
	} catch {
		return NextResponse.json(
			{ error: "Error fetching products" },
			{ status: 500 }
		);
	}
}

// POST - Create a new product
export async function POST(req: Request): Promise<NextResponse> {
	try {
		// Parse the FormData from the request
		const formData = await req.formData();
		// Extract product data
		const id = formData.get("id") as string;
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const category = formData.get("category") as string;
		const stock = formData.get("stock") as unknown as number;
		const colors = formData.getAll("colors") as string[];

		// Handle image files
		const imageFiles = formData.getAll("images") as File[];
		console.log(imageFiles);
		let images: string[] = [];

		if (imageFiles.length > 0) {
			const uploadedImages = await Promise.all(
				imageFiles.map(async (file) => {
					// Convert File to ArrayBuffer
					const arrayBuffer = await file.arrayBuffer();
					const buffer = Buffer.from(arrayBuffer);
					console.log(arrayBuffer);
					console.log(buffer);

					// Upload to Cloudinary
					const uploadResponse = await new Promise((resolve, reject) => {
						const uploadStream = cloudinary.uploader.upload_stream(
							{
								resource_type: "auto",
							},
							(error, result) => {
								if (error) {
									console.error("Cloudinary upload error:", error);
									reject(error);
								} else {
									resolve(result);
								}
							}
						);

						// Write buffer to stream
						uploadStream.write(buffer);
						uploadStream.end();
					});

					return (uploadResponse as any).secure_url;
				})
			);

			images = uploadedImages;
		}

        console.log({
					id,
					name,
					description,
					category,
					stock,
					colors,
					images,
				});
		// Create product in DB
		const product = await createProduct({
			id,
			name,
			description,
			category,
			stock: Number(stock),
			colors,
			images,
		});
        console.log(product)
        

		return NextResponse.json(product);
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ error: `Error creating product:, ${error}` },
			{ status: 500 }
		);
	}
}
