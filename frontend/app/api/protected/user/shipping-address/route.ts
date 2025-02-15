import { getShippingAddress, setShippingAddress } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
	try {
		const token = req.headers.get("cookie")?.split("=")[1];
		if (!token) {
			return NextResponse.json(
				{ message: "Cookie is required" },
				{ status: 400 }
			);
		}
		const address = await getShippingAddress(token);
		if (!address) {
			return NextResponse.json(
				{ message: "No shipping address found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(address, { status: 200 });
	} catch (error) {
		console.error("Error fetching address:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const token = req.headers.get("cookie")?.split("=")[1];
		if (!token) {
			return NextResponse.json(
				{ message: "Cookie is required" },
				{ status: 400 }
			);
		}
		const address = await req.json();
		if (!address) {
			return NextResponse.json(
				{ message: "Address is required" },
				{ status: 400 }
			);
		}
		const shippingAddress = await setShippingAddress(token, address);
		return NextResponse.json(shippingAddress, { status: 200 });
	} catch (error) {
		console.error("Error setting address:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
