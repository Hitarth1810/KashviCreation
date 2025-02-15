"use client";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/auth";

interface AuthContextType {
	user: UserData | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (
		email: string,
		password: string,
		phone: number,
		name: string
	) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserData | null>(null);
	const router = useRouter();
	useEffect(() => {
		// Check auth status on mount
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const res = await axios.get("/api/auth/me");
			const { id, email, name, phone, image, role } = res.data;
			if (res.status === 200) {
				setUser({
					id,
					email,
					name,
					phone,
					image,
					role,
				});
			}
		} catch (e) {
			console.log(e);
			setUser(null);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const res = await axios.post(
				"/api/auth/login",

				{
					headers: { "Content-Type": "application/json" },
					body: { email, password },
				}
			);

			if (res.status === 401) throw Error("Unauthorized");
			if (res.status !== 200) {
				throw new Error("Login failed");
			}

			const { role } = res.data.user;
			await checkAuth();

			if (role === "ADMIN") {
				router.push("/admin/dashboard");
			} else {
				router.push("/dashboard");
			}
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	const signup = async (
		email: string,
		password: string,
		phone: number,
		name: string
	) => {
		const response = await axios.post("/api/auth/signup", {
			name,
			email,
			phone,
			password,
		});

		const data = response.data;

		if (response.status !== 200) {
			throw new Error(data.message || "Something went wrong");
		}

		router.push("/signin");
	};

	const logout = async () => {
		await axios.post("/api/auth/logout");
		setUser(null);
		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
