import { prisma } from "./prisma";

export function getCustomer(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}

export function getCustomers() {
    return prisma.user.findMany();
}