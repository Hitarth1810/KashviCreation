"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/auth";

interface AuthContextType {
	user: UserData | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string, name: string) => Promise<void>;
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
			const res = await fetch("/api/auth/me");
			if (res.ok) {
				const userData = await res.json();
				setUser(userData);
			}
		} catch {
			setUser(null);
		}
	};

	const login = async (email: string, password: string) => {
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (!res.ok) {
			throw new Error("Login failed");
		}

		await checkAuth();
		router.push("/dashboard");
	};

	const signup = async (email: string, password: string, name: string) => {
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password, name }),
		});

		if (!res.ok) {
			throw new Error("Signup failed");
		}

		await checkAuth();
		router.push("/dashboard");
	};

	const logout = async () => {
		await fetch("/api/auth/logout", { method: "POST" });
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
