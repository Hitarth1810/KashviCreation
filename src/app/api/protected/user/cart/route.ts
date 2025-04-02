import { NextResponse } from "next/server";
import { getUserCart, insertUserCart, deleteUserCart, clearUserCart } from "@/lib/user";
export async function POST(req: Request): Promise<NextResponse> {
	try {
		const body = await req.json();
		const { productId } = body;
		console.log(productId)
		if (!productId) {
			return NextResponse.json(
				{ message: "Product ID are required" },
				{ status: 400 }
			);
		}

		const token = req.headers.get("cookie")?.split("=")[1];
		if (!token) {
			return NextResponse.json(
				{ message: "Cookie is required" },
				{ status: 400 }
			);
		}
		const cart = await insertUserCart(token, productId);
		return NextResponse.json(cart, { status: 200 });
	} catch (error) {
		console.error("Error updating cart:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function GET(req: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 }
			);
		}

		const cart = await getUserCart(userId);
		if (!cart) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json(cart, { status: 200 });
	} catch (error) {
		console.error("Error fetching cart:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request): Promise<NextResponse> {
	try {
	
		const searchParams = new URL(req.url).searchParams;
		const productId = searchParams.get("productId");
		const token = req.headers.get("cookie")?.split("=")[1];
		if (!token) {
			return NextResponse.json(
				{ message: "Cookie is required" },
				{ status: 400 }
			);
		}
		if (!productId) {
			const cart = await clearUserCart(token);
			return NextResponse.json(cart, { status: 200 });
		}

		const cart = await deleteUserCart(token, productId);
		return NextResponse.json(cart, { status: 200 });
	} catch (error) {
		console.error("Error deleting cart:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
