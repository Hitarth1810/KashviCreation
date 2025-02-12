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

type UserType = "USER" | "ADMIN";

export type { UserData, JWTPayload };