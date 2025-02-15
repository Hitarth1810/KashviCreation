import { createInvoice, getInvoice, getInvoices, updateInvoiceStatus } from "@/lib/invoice";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
	try {
        const data = await req.json();
        if(data.invoiceId) {
            const invoice = await getInvoice(data.invoiceId);
            return NextResponse.json({ status: 200, body: invoice });
        }
		const invoices = await getInvoices();
		return NextResponse.json({ status: 200, body: invoices });
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