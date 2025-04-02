"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Address } from "@prisma/client";

interface InvoiceData {
	id: string;
	orderId: string;
	customerId: string;
	notes: string | null;
	products: {
		id: string;
		name: string;
		quantity: number;
	}[];
	total: number;
	createdAt: string;
	updatedAt: string;
	address: Address;
	user: {
		name: string;
		email: string;
		phone: number;
		image: string | null;
	};
}

export default function InvoicePreview({
	invoiceId,
}: {
	invoiceId: number | null;
}) {
	const [invoice, setInvoice] = useState<InvoiceData | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		const fetchInvoice = async (id: number | null) => {
			const { data } = await axios.get(`/api/protected/admin/invoice?id=${id}`);
			setInvoice(data);
			console.log(data);
			setLoading(false);
		};
		fetchInvoice(invoiceId);
	}, [invoiceId]);

	return (
		<div className='flex items-center justify-center h-full'>
			<div className='bg-white p-8 rounded-lg shadow h-[80%] w-[60%]  print:shadow-none print:p-0'>
				{loading ? (
					<div>Loading...</div>
				) : (
					<div className='grid gap-8'>
						<div className='flex justify-between items-start'>
							<div>
								<div className='text-4xl font-semibold'>INVOICE</div>
								<div className='text-sm text-muted-foreground whitespace-pre-line'>
									Kashavi Creation
								</div>
								<div className='text-sm text-muted-foreground whitespace-pre-line'>
									{
										"Shop No. 113, Millennium Textile Market - 2, Ring Road, Surat - 395002."
									}
								</div>
							</div>
							<div className='text-right'>
								<div className='text-sm font-medium'>
									Invoice Number: {invoice?.id}
								</div>
								<div className='text-sm font-medium'>
									Order ID: {invoice?.orderId}
								</div>

								<div className='text-sm text-muted-foreground'>
									Date: {invoice?.createdAt.split("T")[0]}
								</div>
							</div>
						</div>

						<div>
							<div className='font-medium mb-1'>Bill To:</div>
							<div className='text-sm'>{invoice!.user.name}</div>
							<div className='text-sm text-muted-foreground whitespace-pre-line'>
								{invoice?.address.address}
							</div>
						</div>

						<div className='border rounded-lg overflow-hidden'>
							<table className='w-full'>
								<thead>
									<tr className='bg-muted'>
										<th className='text-left p-3'>Product ID</th>
										<th className='text-left p-3'>Name</th>
										<th className='text-right p-3'>Quantity</th>
									</tr>
								</thead>
								<tbody>
									{invoice?.products.map((item, index) => (
										<tr key={index} className='border-t'>
											<td className='text-left p-3'>{item.id}</td>
											<td className='p-3'>{item.name}</td>
											<td className='text-right p-3'>{item.quantity}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{invoice!.notes && (
							<div>
								<div className='font-medium mb-1'>Notes:</div>
								<div className='text-sm text-muted-foreground whitespace-pre-line'>
									{invoice!.notes}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
