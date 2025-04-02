import { prisma } from "./prisma";


type Invoice = {
    id: string;
    orderId: string
    customerId: string;
    addressId: string;
    products: string[];
    notes: string | null;
}

export function createInvoice(
	data: Invoice
) {
	return prisma.invoice.create({
		data: data
	});
}

export function getInvoice(invoiceId: string) {
	return prisma.invoice.findUnique({
		where: { id: invoiceId },
	});
}

export function getInvoices() {
	return prisma.invoice.findMany();
}


