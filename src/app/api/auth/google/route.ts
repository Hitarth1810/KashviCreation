import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/jwt";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
	const { credential } = await req.json();

	try {
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const { email, name } = payload || {};

		if (!email) throw new Error("Invalid Google response");

		// Check or create user
		let user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			user = await prisma.user.create({
				data: { email, name },
			});
		}

		const token = generateToken({ id: user.id, email: user.email } as User);
		(await cookies()).set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60, // 1 day
		});
		return NextResponse.json({ token, user });
	} catch {
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });
	}
}
