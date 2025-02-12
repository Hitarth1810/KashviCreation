import { NextResponse } from "next/server";
import {getUserCart, updateUserCart } from "@/lib/user";
export async function POST(req: Request): Promise<NextResponse>{
    
    try {
        const body = await req.json();
        const { userId, productId } = body;  
        if (!userId || !productId) {
          return NextResponse.json({ message: "User ID and Product ID are required" }, { status: 400 });
        }
  
        const user= await updateUserCart(userId,productId)  
        return NextResponse.json(user, { status: 200 });
      } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
}

export async function GET(req: Request): Promise<NextResponse>{
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId) {
          return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }
  
        const cart=await getUserCart(userId)
        if (!cart) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(cart, { status: 200 });
      } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
}