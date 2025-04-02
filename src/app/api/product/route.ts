import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
export async function GET(): Promise<NextResponse> {
    console.log("Fetching products...");
    try {
        const products = await getProducts();
        return NextResponse.json(products);
    } catch(error) {
        console.error("Error fetching products:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}