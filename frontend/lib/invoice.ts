import { prisma } from "./prisma";

export function createInvoice(
	invoiceId: string,
	userId: string,
	products: string[]
) {
	return prisma.invoice.create({
		data: {
			id: invoiceId,
			userId,
			products,
		},
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

import { Status } from "@prisma/client";

export function updateInvoiceStatus(invoiceId: string, status: Status) {
	return prisma.invoice.update({
		where: { id: invoiceId },
		data: { status },
	});
}
