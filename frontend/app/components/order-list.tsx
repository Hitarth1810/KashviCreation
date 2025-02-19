"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";

interface InvoiceData {
	id: number;
	customer: string;
	status: string;
}

export function OrderList({ updateDetails }: { updateDetails: boolean }) {
	const router = useRouter();
	const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
	const [orders, setOrders] = useState<InvoiceData[]>([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const orders = await axios.get("/api/protected/admin/order");
			console.log(orders);
			const data = await Promise.all(
				orders.data.map((order: Order) => ({
					id: order.id,
					customer: axios
						.get(`/api/protected/admin/customer?customerId=${order.userId}`)
						.then((res) => {
							return res.data.name;
						}),
					status: order.status,
				}))
			);
			console.log(data);
			setOrders(data);
		};
		fetchInvoices();
	}, [updateDetails]);

	return (
		<div className='p-4'>
			<div className='grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground'>
				<div>Order ID</div>
				<div>Customer</div>
				<div>Status</div>
			</div>
			<div className='mt-2 space-y-2'>
				{orders.map((order) => (
					<div
						key={order.id}
						className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
							selectedOrder === order.id ? "border-primary bg-muted" : ""
						}`}
						onClick={() => {
							setSelectedOrder(order.id);
							router.push(`/admin/orders?id=${order.id}`);
						}}
					>
						<div className='grid grid-cols-3 items-center gap-4'>
							<div className='font-medium'>{order.id}</div>
							<div>{order.customer}</div>
							<div>
								<Badge
									variant={
										order.status === "confirmed" ? "default" : order.status === "cancelled" ? "destructive" : "outline"
									}
									
								>
									{order.status}
								</Badge>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
