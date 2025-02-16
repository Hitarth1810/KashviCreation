import { prisma } from "./prisma";
import { Status } from "@prisma/client";
export function createOrder(
	orderId: string,
	userId: string,
	products: string[]
) {
	return prisma.order.create({
		data: {
			id: orderId,
			userId,
			products: { connect: products.map((id) => ({ id })) },
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

export function updateOrderStatus(orderId: string, status: Status) {
	return prisma.order.update({
		where: { id: orderId },
		data: { status },
	});
}
