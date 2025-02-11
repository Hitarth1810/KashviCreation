interface UserData {
	id: string;
	email: string;
	name: string;
	phone: number;
	image: string;
	role: UserType;
}

interface JWTPayload {
	userId: string;
	email: string;
}

type UserType = "User" | "Admin";

export type { UserData, JWTPayload };