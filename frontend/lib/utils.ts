import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Function to generate a custom numeric order ID
export function generateOrderId(userObjectId: string): string {
	const hexPart = userObjectId.substring(0, 4); // First 8 chars (timestamp)
	const userNumericId = parseInt(hexPart, 2).toString(); // Extracted user ID
	const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
	const randomPart = Math.floor(Math.random() * 100); // Random 2-digit number

	return `${userNumericId}${timestamp}${randomPart}`;
}
