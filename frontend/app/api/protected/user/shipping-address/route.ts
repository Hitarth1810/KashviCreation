import { getShippingAddress, setShippingAddress } from "@/lib/user";
import { NextResponse } from "next/server";


export async function GET(req: Request): Promise<NextResponse> {
  try {
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    console.log(req.json())

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const address = await getShippingAddress(token);
    if (!address) {
      return NextResponse.json(
        { message: "No shipping address found" },
        { status: 404 }
      );
    }

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Get token from cookies
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const address = await req.json();
    

    // Save address
    const shippingAddress = await setShippingAddress(token, address);
    console.log(shippingAddress)
    return NextResponse.json(shippingAddress, { status: 200 });
  } catch (error) {
    console.error("Error setting address:", error);
    // If it's a known error from your setShippingAddress function
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    // For unknown errors
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}