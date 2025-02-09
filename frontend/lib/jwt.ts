import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "1d";

type JWTPayload = {
	userId: string;
	email: string;
	role: string;
};

export function generateToken(user: User): string {
	const payload: JWTPayload = {
		userId: user.id,
		email: user.email,
		role: user.role,
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload {
	return jwt.verify(token, JWT_SECRET) as JWTPayload;
}
