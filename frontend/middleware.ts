import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";
import { prisma } from "./lib/prisma";

export async function middleware(request: NextRequest) {


	// Check for protected routes
	if (request.nextUrl.pathname.startsWith("/api/admin")) {
		try {
			const token = request.headers.get("cookie")?.split("=")[1];
			console.log(token);
			if (!token) {
				console.log("no token");
				return NextResponse.json(
					{ error: "Authentication required" },
					{ status: 401 }
				);
			}
			console.log("token exists");
			// Verify JWT
			const payload = verifyToken(token);
			console.log("kek")

			// Check if session exists in database
			const session = await prisma.session.findFirst({
				where: {
					token,
					expires: { gt: new Date() },
					user: { id: payload.userId },
				},
				include: { user: true },
			});


			if (!session) {
				return NextResponse.json(
					{ error: "Invalid or expired session" },
					{ status: 401 }
				);
			}

			if(session.user.role !== "ADMIN") return NextResponse.json({error: "Unauthorized"}, {status: 401})

			// Update session last used time
			await prisma.session.update({
				where: { id: session.id },
				data: { lastUsed: new Date() },
			});

			// Add user to request
			const requestHeaders = new Headers(request.headers);
			requestHeaders.set("x-user-id", session.user.id);
			requestHeaders.set("x-user-role", session.user.role);

			return NextResponse.next({
				request: {
					headers: requestHeaders,
				},
			});
		} catch (error) {
			return NextResponse.json(
				{ error: `Authentication failed: ${error}` },
				{ status: 401 }
			);
		}
	}

	

	return NextResponse.next();
}
