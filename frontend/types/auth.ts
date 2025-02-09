interface UserData {
	id: string;
	email: string;
	name: string;
}

interface JWTPayload {
	userId: string;
	email: string;
}

export type { UserData, JWTPayload };