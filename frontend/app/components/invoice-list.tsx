"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Invoice } from "@prisma/client";
import { useRouter } from "next/navigation";

interface InvoiceData {
	invoiceId: number;
	orderId: string;
	customer: string;
	date: string;
	notes?: string;
	address: string
}

export default function InvoiceList() {
	const router = useRouter();
	const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
	const [invoices, setInvoices] = useState<InvoiceData[]>([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const response = await axios.get("/api/protected/admin/invoice");
			const data = await Promise.all(
				response.data.map((invoice: Invoice) => ({
					customer: axios
						.get(`/api/protected/admin/customer?customerId=${invoice.customerId}`)
						.then((res) => res.data.name),
					...invoice,
				}))
			);
			setInvoices(data);
		};
		fetchInvoices();
	}, []);

	return (
		<div className='p-4'>
			<div className='grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground'>
				<div>Invoice ID</div>
				<div>Customer</div>
				<div>Status</div>
			</div>
			<div className='mt-2 space-y-2'>
				{invoices.map((invoice) => (
					<div
						key={invoice.id}
						className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
							selectedInvoice === invoice.id ? "border-primary bg-muted" : ""
						}`}
						onClick={() => {
							setSelectedInvoice(invoice.id);
							router.push(`/admin/invoices?id=${invoice.id}`);
						}}
					>
						<div className='grid grid-cols-3 items-center gap-4'>
							<div className='font-medium'>{invoice.id}</div>
							<div>{invoice.customer}</div>
							<div>
								<Badge
									variant={invoice.status === "Paid" ? "default" : "secondary"}
								>
									{invoice.status}
								</Badge>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
