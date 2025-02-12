import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
export async function GET(): Promise<NextResponse> {
    console.log("Fetching products...");
    try {
        const products = await getProducts();
        return NextResponse.json(products);
    } catch {
        return NextResponse.json(
            { error: "Error fetching products" },
            { status: 500 }
        );
    }
}