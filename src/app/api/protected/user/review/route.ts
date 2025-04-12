// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust if your prisma import path is different
import { getCookieToken, verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const productId = searchParams.get("productId");

	if (!productId) {
		return NextResponse.json(
			{ error: "Missing productId in query" },
			{ status: 400 }
		);
	}

	try {
		const reviews = await prisma.review.findMany({
			where: { productId },
			select: {
				rating: true,
				comment: true,
				user: {
					select: { name: true }, // adjust to match your actual User field
				},
        createdAt: true,
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(reviews);
	} catch (error) {
		console.error("Error fetching reviews:", error);
		return NextResponse.json(
			{ error: "Failed to fetch reviews." },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const { productId, comment, rating } = await req.json();
		const token = getCookieToken(req.headers.get("cookie") || "", "token");
		const { email } = verifyToken(token);
		const user = await prisma.user.findUnique({ where: { email } });
		if (!productId || !rating || !comment || !user) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const savedReview = await prisma.review.create({
			data: {
				productId,
				rating,
				comment,
				userId: user.id, // Replace with actual user ID from session/auth
			},
			select: {
				id: true,
				rating: true,
				comment: true,
				user: { select: { name: true } },
        createdAt: true,
			},
		});

		return NextResponse.json(savedReview, { status: 201 });
	} catch (error) {
		console.error("Error saving review:", error);
		return NextResponse.json(
			{ error: "Failed to save review" },
			{ status: 500 }
		);
	}
}
