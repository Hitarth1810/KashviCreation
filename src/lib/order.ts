import { createInvoice } from "./invoice";
import { prisma } from "./prisma";
import {  Status } from "@prisma/client";
import { generateInvoiceId } from "./utils";
export function createOrder(
	orderId: string,
	userId: string,
	products: string[]
) {
	return prisma.order.create({
		data: {
			id: orderId,
			userId,
			products,
		},
	});
}

export function getOrder(orderId: string) {
	return prisma.order.findUnique({
		where: { id: orderId },
	});
}

export function getOrders() {
	return prisma.order.findMany();
}

export async function updateOrderStatus(orderId: string, status: Status) {
	const res = await prisma.order.update({
		where: { id: orderId },
		data: { status },
	});

	const addresData = await prisma.address.findFirst({
		where: {
			userId: res.userId,
			isDefault: true
		}
	})

	if(status === "COMPLETE"){
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = {
			id: generateInvoiceId(),
			orderId: orderId,
			customerId: res.userId,
			addressId: addresData?.id,
			products: res.products
		} 
		await createInvoice(data)
	}

	return res
}
