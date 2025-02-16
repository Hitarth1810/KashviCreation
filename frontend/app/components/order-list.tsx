"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Invoice } from "@prisma/client";
import { useRouter } from "next/navigation";

interface InvoiceData {
	id: number;
	customer: string;
	status: string;
}

export function OrderList({}) {
	const router = useRouter();
	const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
	const [orders, setOrders] = useState<InvoiceData[]>([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const invoices = await axios.get("/api/protected/admin/invoice");
			const data = invoices.data.map((invoice: Invoice) => ({
				id: invoice.id,
				customer: axios
					.get(`/api/protected/admin/customer?customerId=${invoice.userId}`)
					.then((res) => {
						return res.data.name;
					}),
				status: invoice.status,
			}));
			console.log(data);
			setOrders(data);
		};
		fetchInvoices();
	}, []);

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
										order.status === "Delivered" ? "default" : "secondary"
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
