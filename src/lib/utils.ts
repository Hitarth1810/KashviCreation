import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Function to generate a custom numeric order ID
export function generateOrderId(userObjectId: string): string {
	const hexPart: string = userObjectId.substring(0, 8); // First 8 chars (timestamp)
	const userNumericId: string = parseInt(hexPart, 16).toString().substring(0, 4); // Extracted user ID
	const timestamp: string = Math.floor(Date.now() / 1000)
		.toString()
		.substring(0, 2); // Unix timestamp in seconds
	const randomPart: string = Math.floor(Math.random() * 100)
		.toString()
		.substring(0, 2); // Random 2-digit number
	return `${userNumericId}${timestamp}${randomPart}`;
}

export function generateInvoiceId(): string {
	const timestamp: string = Math.floor(Date.now() / 1000)
		.toString()
		.substring(0, 4); // Unix timestamp in seconds
	const randomPart: string = Math.floor(Math.random() * 100)
		.toString()
		.substring(0, 2); // Random 2-digit number
	return `${timestamp}${randomPart}`;
}


