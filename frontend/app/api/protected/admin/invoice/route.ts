import { getCustomer } from "@/lib/customer";
import {
	createInvoice,
	getInvoice,
	getInvoices,
	updateInvoiceStatus,
} from "@/lib/invoice";
import { getProduct } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(req.url);
		if (!searchParams.has("invoiceId")) {
			const invoices = await getInvoices();
			return NextResponse.json(invoices);
		}
		const invoiceId = searchParams.get("invoiceId");
		if (!invoiceId) {
			return NextResponse.json({
				status: 400,
				body: "Bad Request: Missing invoiceId",
			});
		}

		const invoices = await getInvoice(invoiceId);
		const customer = await getCustomer(invoices!.userId);
		console.log(invoices?.products);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const products: any = [];
		if (invoices?.products) {
			await Promise.all(
				invoices.products.map(async (product: string) => {
					const data = await getProduct(product);
					products.push({ id: data?.id, name: data?.name });
				})
			);
		}
		console.log(products);
		const data = {
			id: invoices!.id,
			user: {
				name: customer?.name,
				email: customer!.email,
				phone: customer!.phone,
				image: customer!.image,
			},
			products: products,
			status: invoices!.status,
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
		const { invoiceId, userId, products } = data;
		const invoice = await createInvoice(invoiceId, userId, products);
		return NextResponse.json({ status: 200, body: invoice });
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
		const { invoiceId, status } = data;
		const invoice = await updateInvoiceStatus(invoiceId, status);
		return NextResponse.json({ status: 200, body: invoice });
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: `Internal Server Error: ${error}`,
		});
	}
}
