/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/products";
import { v2 as cloudinary } from "cloudinary";
import { IncomingForm } from "formidable";
import fs from "fs/promises";

// Enable parsing of form data
export const config = {
	api: {
		bodyParser: false,
	},
};

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to parse form data
async function parseForm(req: Request): Promise<{ fields: any; files: any }> {
	return new Promise((resolve, reject) => {
		const form = new IncomingForm({ multiples: true });

		form.parse(req as any, (err: any, fields: any, files: any) => {
			if (err) reject(err);
			else resolve({ fields, files });
		});
	});
}

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
		const { fields, files } = await parseForm(req);
        console.log(fields, files)
		// Extract product data
		const { id, name, description, category, stock, colors } = fields;
		let images: string[] = [];

		if (files.images) {
			const uploadedImages = await Promise.all(
				files.images.map(async (file: any) => {
					const fileData = await fs.readFile(file.filepath);

					const uploadResponse = await new Promise((resolve, reject) => {
						cloudinary.uploader
							.upload_stream({}, (error, result) => {
								if (error) reject(error);
								else resolve(result);
							})
							.end(fileData);
					});

					return (uploadResponse as any).secure_url;
				})
			);

			images = uploadedImages;
		}

		// Create product in DB
		const product = await createProduct({
			id,
			name,
			description,
			category,
			stock,
			colors,
			images,
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ error: "Error creating product" },
			{ status: 500 }
		);
	}
}
