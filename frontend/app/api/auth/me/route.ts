import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
interface Request {
	headers: Headers;
}

export async function GET(req: Request): Promise<NextResponse> {
	// Get token from headers
	const token = req.headers.get("cookie")?.split("=")[1];
	if (!token) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		// Verify JWT token (replace 'your-secret-key' with your actual secret)
		const user = verifyToken(token); // Your JWT verification function

		return NextResponse.json(user);
	} catch {
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });
	}
}
