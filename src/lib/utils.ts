import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateCustomUuid } from "custom-uuid"
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Function to generate a custom numeric order ID
export function generateOrderId(userObjectId: string): string {
	return generateCustomUuid(userObjectId, 7);
}

export function generateInvoiceId(): string {
	return generateCustomUuid("1234567890ABC", 7);
}

