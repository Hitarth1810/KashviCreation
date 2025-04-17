import { NextResponse } from "next/server";

import { getProduct, updateProduct } from "@/lib/products";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ error: "Product ID is required" },
				{ status: 400 }
			);
		}

		const product = await getProduct(id);

		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		return NextResponse.json(product, { status: 200 });
	} catch (error) {
		console.error("Error fetching product:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		if (!id) {
			return NextResponse.json(
				{ error: "Product ID is required" },
				{ status: 400 }
			);
		}

		const formData = await req.formData();
		// Extract product data
		const pid = formData.get("id") as string;
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const category = formData.get("category") as string;
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

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					return (uploadResponse as any).secure_url;
				})
			);

			images = uploadedImages;
		}
    const oldProduct = await getProduct(pid);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const updatedProduct: any = {
			id: pid,
			name,
			description,
			category,
			colors,
      images: [...oldProduct!.images, ...images],
		};
		
		const product = await updateProduct(updatedProduct);
		return NextResponse.json(
			{ message: "Product updated successfully", product },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating product:", error);
		return NextResponse.json(
			{ error: `Internal Server Error: ${error}` },
			{ status: 500 }
		);
	}
}
