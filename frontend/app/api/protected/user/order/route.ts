/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateOrderStatus } from "@/lib/order";
import { prisma } from "@/lib/prisma";
import { createCustomerOrder, getCustomerOrders } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");
	if (!userId) {
		return NextResponse.json(
			{ message: "User ID is required" },
			{ status: 400 }
		);
	}

	const orders = await getCustomerOrders(userId);
    const data = await Promise.all(
        orders.map(async (order) => {
            const products = await Promise.all(
                order.products.map(async (product: any) => {
                    return await prisma.product.findUnique({
                        where: { id: product },
                    });
                })
            );

            return {
                id: order.id,
                products: products,
                status: order.status,
            };
        })
    );


	return NextResponse.json(data);
}

export async function POST(req: Request): Promise<NextResponse> {
	const token = req.headers.get("cookie")?.split("=")[1];
	const res = await req.json();
	if (!token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	console.log(res.products);
	const { products } = res;
	try {
		const order = await createCustomerOrder(token, products);
		return NextResponse.json(order);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ message: errorMessage }, { status: 400 });
	}
}

export async function PUT(req: Request): Promise<NextResponse> {
	const res = await req.json();
	const { orderId, status } = res;
	try {
		const order = await updateOrderStatus(orderId, status);
		return NextResponse.json(order);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ message: errorMessage }, { status: 400 });
	}
}
