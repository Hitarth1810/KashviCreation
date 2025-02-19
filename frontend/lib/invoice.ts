import { prisma } from "./prisma";
import { Invoice } from "@prisma/client";

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


