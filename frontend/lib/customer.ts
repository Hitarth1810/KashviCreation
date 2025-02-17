import { prisma } from "./prisma";

export function getCustomer(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}

export function getCustomers() {
    return prisma.user.findMany();
}

export function getCustomerAddress(id: string){
    return prisma.address.findUnique({
        where: { id },
    });
}