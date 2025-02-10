import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signupUser } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		const { name, phone, email, password } = await request.json();
		const { user, token } = await signupUser(name, email, phone, password);
		(await cookies()).set("token", token, {
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
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
