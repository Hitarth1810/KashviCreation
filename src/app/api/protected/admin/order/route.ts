import { getCustomer } from "@/lib/customer";
import {
	createOrder,
	getOrder,
	getOrders,
	updateOrderStatus,
} from "@/lib/order";
import { getProduct } from "@/lib/products";
import { Status } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(req.url);
		if (!searchParams.has("orderId")) {
			const orders = await getOrders();
			return NextResponse.json(orders);
		}
		const orderId = searchParams.get("orderId");
		if (!orderId) {
			return NextResponse.json({
				status: 400,
				body: "Bad Request: Missing orderId",
			});
		}

		const order = await getOrder(orderId);
		const customer = await getCustomer(order!.userId);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let products: any = [];
		if (order?.products) {
			await Promise.all(
				order.products.map(async (product: string) => {
					const data = await getProduct(product);
					products.push({ id: data?.id, name: data?.name });
				})
			);
		}

		products = mergeDuplicateProducts(products);

		const data = {
			id: order!.id,
			user: {
				name: customer?.name,
				email: customer!.email,
				phone: customer!.phone,
				image: customer!.image,
			},
			products: products,
			status: order!.status,
		};

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: `Internal Server Error: ${error}`,
		});
	}
}

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const data = await req.json();
		const { orderId, userId, products } = data;
		const order = await createOrder(orderId, userId, products);
		const customer = await getCustomer(order!.userId);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let productsRes: any = [];
		if (order?.products) {
			await Promise.all(
				order.products.map(async (product: string) => {
					const data = await getProduct(product);
					productsRes.push({ id: data?.id, name: data?.name });
				})
			);
		}

		productsRes = mergeDuplicateProducts(productsRes);

		const resdata = {
			id: order!.id,
			user: {
				name: customer?.name,
				email: customer!.email,
				phone: customer!.phone,
				image: customer!.image,
			},
			products: productsRes,
			status: order!.status,
		};
		return NextResponse.json({ status: 200, body: resdata });
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: `Internal Server Error: ${error}`,
		});
	}
}

export async function PUT(req: Request): Promise<NextResponse> {
	try {
		const data = await req.json();
		const { orderId, status } = data;
		const order = await updateOrderStatus(orderId, ((status as string).toLocaleUpperCase()) as Status);
		const customer = await getCustomer(order!.userId);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let productsRes: any = [];
		if (order?.products) {
			await Promise.all(
				order.products.map(async (product: string) => {
					const data = await getProduct(product);
					productsRes.push({ id: data?.id, name: data?.name });
				})
			);
		}

		productsRes = mergeDuplicateProducts(productsRes);

		const resdata = {
			id: order!.id,
			user: {
				name: customer?.name,
				email: customer!.email,
				phone: customer!.phone,
				image: customer!.image,
			},
			products: productsRes,
			status: order!.status,
		};
		console.log(order)
		return NextResponse.json({ status: 200, body: resdata });
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: `Internal Server Error: ${error}`,
		});
	}
}

function mergeDuplicateProducts(products: { id: string; name: string }[]) {
	const productMap = new Map<
		string,
		{ id: string; name: string; quantity: number }
	>();

	products.forEach((product) => {
		if (productMap.has(product.id)) {
			productMap.get(product.id)!.quantity += 1;
		} else {
			productMap.set(product.id, { ...product, quantity: 1 });
		}
	});

	return Array.from(productMap.values());
}
