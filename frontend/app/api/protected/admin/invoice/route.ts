import { getCustomer, getCustomerAddress } from "@/lib/customer";
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
		if (!searchParams.has("id")) {
			const invoices = await getInvoices();
			return NextResponse.json(invoices);
		}
		const invoiceId = searchParams.get("id");
		if (!invoiceId) {
			return NextResponse.json({
				status: 400,
				body: "Bad Request: Missing invoiceId",
			});
		}

		const invoices = await getInvoice(invoiceId);
		const customer = await getCustomer(invoices!.customerId);
		const address = await getCustomerAddress(invoices!.addressId);
		console.log(invoices?.products);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let products: any = [];
		if (invoices?.products) {
			await Promise.all(
				invoices.products.map(async (product: string) => {
					const data = await getProduct(product);
					products.push({ id: data?.id, name: data?.name });
				})
			);
		}
		products = mergeDuplicateProducts(products)
		console.log(products);
		const data = {
			...invoices,
			user: {
				name: customer?.name,
				email: customer!.email,
				phone: customer!.phone,
				image: customer!.image,
			},
			products: products,
			address
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