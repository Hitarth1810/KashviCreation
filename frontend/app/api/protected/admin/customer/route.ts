import { getCustomers, getCustomer } from "@/lib/customer";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(req.url);
		if (!searchParams.has("customerId")) {
			const customers = await getCustomers();
			return NextResponse.json(customers);
		}
        
		const customerId = searchParams.get("customerId");
		if (customerId) {
			const customers = await getCustomer(customerId);
			return NextResponse.json(customers);
		} else {
			return NextResponse.json({
				status: 400,
				body: "Bad Request: customerId is required",
			});
		}
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: `Internal Server Error: ${error}`,
		});
	}
}
