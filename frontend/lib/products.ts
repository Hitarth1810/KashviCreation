import { prisma } from "./prisma";

interface ProductData {
	id: string;
	name: string;
	description: string;
	images: string[];
	colors: string[];
	stock: number;
	category: string;
}

export async function getProducts() {
	try {
		const products = prisma.product.findMany();
		return products;
	} catch {
		throw new Error("Error fetching products");
	}
}

export async function getProduct(id: string) {
	try {
		const product = prisma.product.findUnique({
			where: {
				id,
			},
		});
		return product;
	} catch {
		throw new Error("Error fetching product");
	}
}

export async function createProduct(data: ProductData) {
	try {
		const product = prisma.product.create({
			data,
		});
		return product;
	} catch {
		throw new Error("Error creating product");
	}
}
