import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

import { updateUserRole } from "@/lib/user";

export async function PUT(req: NextRequest) {
	try {
		const session = await getSession();
		console.log("Session:", session);
		if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    

		const { userId, role } = await req.json();
		console.log("Request data:", { userId, role });
		if (!userId || !["USER", "ADMIN"].includes(role)) {
			return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
		}

		await updateUserRole(userId, role);

		return NextResponse.json({ success: true, message: "User role updated successfully" });
	} catch (error) {
		console.error("Error updating user role:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
