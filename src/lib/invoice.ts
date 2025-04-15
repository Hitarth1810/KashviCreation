import { prisma } from "./prisma";

type Invoice = {
	id: string;
	orderId: string;
	customerId: string;
	addressId: string;
	products: string[];
	notes: string | null;
};

export async function createInvoice(data: Invoice) {
	console.log("enter part 2");
	try {
		const d = await prisma.invoice.create({
			data: data,
		});
		console.log("d",d)
		return d
	} catch (error) {
		throw error;
	}
}

export function getInvoice(invoiceId: string) {
	return prisma.invoice.findUnique({
		where: { id: invoiceId },
	});
}

export function getInvoices() {
	return prisma.invoice.findMany();
}
