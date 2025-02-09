import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "./jwt";

export async function loginUser(email: string, password: string) {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw new Error("Invalid credentials");
	}

	// Generate JWT token
	const token = generateToken(user);

	// Create session in database
	await prisma.session.create({
		data: {
			userId: user.id,
			token,
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
		},
	});

	return { user, token };
}
