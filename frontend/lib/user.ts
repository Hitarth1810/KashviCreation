import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { verifyToken } from "./jwt";
import { shippingAddress } from "@/types/user";
import { generateOrderId } from "./utils";


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

// export async function generatePasswordResetToken(email: string) {
// 	const token = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

// 	const expires = new Date(Date.now() + 3600000); // 1 hour

// 	await prisma.user.update({
// 		where: { email },
// 		data: {
// 			resetToken: token,
// 			resetTokenExpires: expires,
// 		},
// 	});

// 	return token;
// }

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

// export async function generateEmailVerificationToken(userId: string) {
// 	const token = window.crypto
// 		.getRandomValues(new Uint32Array(1))[0]
// 		.toString(16);

// 	await prisma.user.update({
// 		where: { id: userId },
// 		data: {
// 			verifyToken: token,
// 		},
// 	});

// 	return token;
// }

export async function insertUserCart(token: string, productid: string) {
	const data = verifyToken(token);
	const existingUser = await prisma.user.findUnique({
		where: { id: data.userId },
	});
	if (!existingUser) {
		throw new Error("User not found");
	}

	const user = await prisma.user.update({
		where: { id: data.userId },
		data: {
			Cart: {
				set: [...(existingUser.Cart || []), productid], // Ensure Cart exists before pushing
			},
		},
	});
	return user.Cart;
}

export async function deleteUserCart(token: string, productid: string) {
	const data = verifyToken(token);
	const oldUser = await prisma.user.findUnique({
		where: { id: data.userId },
	});
	if (!oldUser || !oldUser.Cart) {
		throw new Error("User not found or Cart is empty");
	}
	const user = await prisma.user.update({
		where: { id: data.userId },
		data: {
			Cart: {
				set: oldUser.Cart.filter((p) => p !== productid),
			},
		},
	});
	return user.Cart;
}

export async function clearUserCart(token: string) {
	const data = verifyToken(token);
	try {
		const user = await prisma.user.update({
			where: { id: data.userId },
			data: {
				Cart: [],
			},
		});
		return user.Cart;
	} catch (error) {
		console.error(error)
	}
}

export async function getUserCart(id: string) {
	const user = await prisma.user.findUnique({
		where: { id },
	});
	if (!user?.Cart) return null;
	return user.Cart;
}

export async function insertUserWishlist(token: string, productid: string) {
	const data = verifyToken(token);
	const user = await prisma.user.update({
		where: { id: data.userId },
		data: {
			Wishlist: {
				push: productid,
			},
		},
	});
	return user.Wishlist;
}

export async function deleteUserWishlist(token: string, productid: string) {
	const data = verifyToken(token);
	const oldUser = await prisma.user.findUnique({
		where: { id: data.userId },
	});
	if (!oldUser || !oldUser.Wishlist) {
		throw new Error("User not found or Wishlist is empty");
	}
	const user = await prisma.user.update({
		where: { id: data.userId },
		data: {
			Wishlist: {
				set: oldUser.Wishlist.filter((p) => p !== productid),
			},
		},
	});
	return user.Wishlist;
}

export async function getUserWishlist(id: string) {
	const user = await prisma.user.findUnique({
		where: { id },
	});
	if (!user?.Wishlist) return null;
	return user.Wishlist;
}

export async function getShippingAddress(id: string) {
	const user = await prisma.user.findUnique({
		where: { id: id },
		include: {
			shippingAddress: true, // ✅ Correct way to include related records
		},
	});
	return user?.shippingAddress;
}

export async function setShippingAddress(
	token: string,
	address: shippingAddress
) {
	const { userId } = verifyToken(token);
	const shippingAddress = await prisma.address.create({
		data: {
			...address,
			user: {
				connect: { id: userId },
			},
		},
	});
	return shippingAddress;
}

export async function getCustomerOrders(userId: string) {
	const orders = await prisma.order.findMany({
		where: { userId },
	});
	return orders;
}

export async function createCustomerOrder(token: string, products: string[]) {
	const { userId } = verifyToken(token);
	const order = await prisma.order.create({
		data: {
			id: generateOrderId(userId),
			userId,
			products,
		},
	});
	return order;
}
