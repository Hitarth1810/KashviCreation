"use client";

import { useState } from "react";
import { Badge } from "@/app/components/ui/badge";

// Sample data - replace with your actual data fetching logic
const orders = [
	{
		id: "ORD001",
		customer: "Priya Sharma",
		date: new Date(),
		status: "Processing",
		total: "₹15,999",
	},
	{
		id: "ORD002",
		customer: "Anita Patel",
		date: new Date(),
		status: "Delivered",
		total: "₹24,999",
	},
	// Add more orders...
];

export function OrderList() {
	const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

	return (
		<div className='p-4'>
			<div className='grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground'>
				<div>Order ID</div>
				<div>Customer</div>
				<div>Status</div>
				<div>Total</div>
			</div>
			<div className='mt-2 space-y-2'>
				{orders.map((order) => (
					<div
						key={order.id}
						className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
							selectedOrder === order.id ? "border-primary bg-muted" : ""
						}`}
						onClick={() => setSelectedOrder(order.id)}
					>
						<div className='grid grid-cols-4 items-center gap-4'>
							<div className='font-medium'>{order.id}</div>
							<div>{order.customer}</div>
							<div>
								<Badge
									variant={
										order.status === "Delivered" ? "default" : "secondary"
									}
								>
									{order.status}
								</Badge>
							</div>
							<div>{order.total}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
