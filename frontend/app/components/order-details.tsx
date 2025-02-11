"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";

export function OrderDetails() {
	// Sample data - replace with your actual data
	const order = {
		id: "ORD001",
		customer: {
			name: "Priya Sharma",
			email: "priya.sharma@example.com",
			phone: "+91 98765 43210",
			avatar: "/placeholder.svg",
		},
		status: "Processing",
		date: "March 14, 2024",
		items: [
			{
				id: 1,
				name: "Banarasi Silk Saree",
				price: "₹15,999",
				quantity: 1,
			},
			// Add more items...
		],
		total: "₹15,999",
	};

	return (
		<div className='h-full border-l'>
			<div className='border-b bg-muted/40 p-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold'>Order Details</h2>
					<Badge variant='secondary'>{order.status}</Badge>
				</div>
				<p className='text-sm text-muted-foreground'>Order #{order.id}</p>
			</div>
			<div className='p-4'>
				<div className='flex items-center gap-4'>
					<Image
						src={order.customer.avatar || "/placeholder.svg"}
						alt={order.customer.name}
						width={64}
						height={64}
						className='rounded-full'
					/>
					<div>
						<h3 className='font-semibold'>{order.customer.name}</h3>
						<div className='mt-1 space-y-1 text-sm text-muted-foreground'>
							<div className='flex items-center gap-2'>
								<Mail className='h-4 w-4' />
								{order.customer.email}
							</div>
							<div className='flex items-center gap-2'>
								<Phone className='h-4 w-4' />
								{order.customer.phone}
							</div>
						</div>
					</div>
				</div>
				<Separator className='my-4' />
				<div>
					<h4 className='font-semibold'>Order Items</h4>
					<div className='mt-4 space-y-4'>
						{order.items.map((item) => (
							<Card key={item.id}>
								<CardContent className='flex items-center justify-between p-4'>
									<div>
										<p className='font-medium'>{item.name}</p>
										<p className='text-sm text-muted-foreground'>
											Quantity: {item.quantity}
										</p>
									</div>
									<p className='font-medium'>{item.price}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				<Separator className='my-4' />
				<div className='flex items-center justify-between font-semibold'>
					<span>Total</span>
					<span>{order.total}</span>
				</div>
			</div>
		</div>
	);
}
