import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
	try {
		const token = (await cookies()).get("token")?.value;

		if (token) {
			// Delete session from database
			await prisma.session.deleteMany({
				where: { token },
			});

			// Clear cookie
			(await
                // Clear cookie
                cookies()).delete("token");
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Logout failed" }, { status: 500 });
	}
}
