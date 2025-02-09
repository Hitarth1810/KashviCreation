import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "./jwt";
import { createUser } from "./user";

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

export async function signupUser(
	name: string,
	email: string,
	phone: number,
	password: string
) {
	try {

		const user = await createUser({ name, email, phone: Number(phone), password });

		

		if (!user) {
			console.error("Signup Error: User already exists!");
			throw new Error("User already exists!");
		}

		const token = generateToken(user);
		

		return { user, token };
	} catch (error) {
		throw error;
	}
}

