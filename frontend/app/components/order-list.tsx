"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";

interface Invoice  {
	id: number;
	customer: string;
	status: string;
	total: string;
}

export function OrderList({ }) {
	const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
	const [orders, setOrders] = useState<Invoice[]>([]);

	useEffect(() => {
		axios.get("/api/protected/admin/orders").then((response) => {
			setOrders(response.data);
		});
	})

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
