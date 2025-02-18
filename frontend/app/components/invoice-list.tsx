"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Invoice } from "@prisma/client";
import InvoicePreview from "./invoice-preview";
import { X } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./ui/button";
interface InvoiceData {
	id: number;
	orderId: string;
	customer: string;
	date: string;
}

export default function InvoiceList() {
	const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
	const [invoices, setInvoices] = useState<InvoiceData[]>([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const response = await axios.get("/api/protected/admin/invoice");
			const data = await Promise.all(
				response.data.map((invoice: Invoice) => ({
					customer: axios
						.get(
							`/api/protected/admin/customer?customerId=${invoice.customerId}`
						)
						.then((res) => res.data.name),
					date: new Date(invoice.createdAt).toISOString().split("T")[0],
					...invoice,
				}))
			);
			setInvoices(data);
		};
		fetchInvoices();
	}, []);

	const componentRef = useRef<HTMLDivElement>(null);

	const generatePDF = () => {
		const input = componentRef.current;
		console.log("heh");

		if (input) {
			html2canvas(input).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("p", "mm", "a4");
				const imgWidth = 210;
				const imgHeight = (canvas.height * imgWidth) / canvas.width;

				pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
				pdf.save(`invoice-${selectedInvoice}.pdf`);
			});
		}
	};

	return (
		<div className='p-4'>
			<div className='grid grid-cols-4 gap-5 text-sm font-medium text-muted-foreground'>
				<div>Date</div>
				<div>Invoice ID</div>
				<div>Order ID</div>
				<div>Customer</div>
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
						}}
					>
						<div className='grid grid-cols-4 items-center gap-4'>
							<div>{invoice.date}</div>
							<div className='font-medium'>{invoice.id}</div>
							<div>{invoice.orderId}</div>
							<div>{invoice.customer}</div>
						</div>
					</div>
				))}
			</div>
			<div>
				{selectedInvoice ? (
					<div className='fixed inset-0 bg-black/5 backdrop-blur-sm z-40'>
						<div className='container mx-auto p-4'>
							<div className='bg-white rounded-lg shadow-lg'>
								{/* Header with X button */}
								<div className='flex justify-end p-4'>
									<div
										className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors'
										onClick={() => setSelectedInvoice(null)}
									>
										<X className='w-6 h-6' />
									</div>
								</div>

								{/* Invoice Preview */}
								<div ref={componentRef}>
									<InvoicePreview invoiceId={selectedInvoice} />
								</div>

								{/* Footer with Download button */}
								<div className='p-4 border-t'>
									<Button
										className=''
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											generatePDF();
										}}
									>
										Download
									</Button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
