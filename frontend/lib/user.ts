import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export type CreateUserInput = {
	email: string;
	phone: number;
	password: string;
	name?: string;
};

export type UpdateUserInput = {
	email?: string;
	name?: string;
	phone?: number;
	password?: string;
};

export async function createUser(data: CreateUserInput) {
	const hashedPassword = await bcrypt.hash(data.password, 12);

	try {
		const u = await prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				phone: Number(data.phone),
				password: hashedPassword,
			},
		});
		console.log(u);
		return u;
	} catch (error) {
		console.error("User Creation Error:", error);
		throw new Error(error instanceof Error ? error.message : String(error));
	}
}

export async function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: { email },
	});
}

export async function findUserById(id: string) {
	return prisma.user.findUnique({
		where: { id },
	});
}

export async function updateUser(id: string, data: UpdateUserInput) {
	const updateData = { ...data };

	if (data.password) {
		updateData.password = await bcrypt.hash(data.password, 12);
	}

	return prisma.user.update({
		where: { id },
		data: updateData,
		select: {
			id: true,
			email: true,
			name: true,
			role: true,
			updatedAt: true,
		},
	});
}

export async function generatePasswordResetToken(email: string) {
	const token = crypto.randomBytes(32).toString("hex");
	const expires = new Date(Date.now() + 3600000); // 1 hour

	await prisma.user.update({
		where: { email },
		data: {
			resetToken: token,
			resetTokenExpires: expires,
		},
	});

	return token;
}

export async function verifyPasswordResetToken(token: string) {
	const user = await prisma.user.findFirst({
		where: {
			resetToken: token,
			resetTokenExpires: {
				gt: new Date(),
			},
		},
	});

	return user;
}

export async function generateEmailVerificationToken(userId: string) {
	const token = crypto.randomBytes(32).toString("hex");

	await prisma.user.update({
		where: { id: userId },
		data: {
			verifyToken: token,
		},
	});

	return token;
}
