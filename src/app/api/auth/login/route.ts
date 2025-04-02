import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { loginUser } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		const {
			body: { email, password },
		} = await request.json();
		const { user, token } = await loginUser(email, password);

		// Set JWT in HTTP-only cookie
		(
			await // Set JWT in HTTP-only cookie
			cookies()
		).set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60, // 1 day
		});

		return NextResponse.json({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
		});
	} catch {
		return NextResponse.json({ error: "Login failed" }, { status: 401 });
	}
}
