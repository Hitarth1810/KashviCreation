"use client";

import { useState, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { FileText, Printer, Download, Eye } from "lucide-react";
import { InvoicePreview } from "../../components/invoice-preview";

export type InvoiceData = {
	invoiceNumber: string;
	date: string;
	dueDate: string;
	billTo: string;
	billToAddress: string;
	billFrom: string;
	billFromAddress: string;
	items: {
		id: string;
		name: string;
		quantity: number;
	}[];
	notes: string;
};

const defaultInvoice: InvoiceData = {
	invoiceNumber: "INV-001",
	date: new Date().toISOString().split("T")[0],
	dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
		.toISOString()
		.split("T")[0],
	billTo: "Client Name",
	billToAddress: "123 Client Street\nCity, State 12345",
	billFrom: "Your Company",
	billFromAddress: "456 Company Street\nCity, State 12345",
	items: [
		{
			id: "234",
			name: "Item 1",
			quantity: 1,
		},
	],
	notes: "Thank you for your business!",
};

export function InvoiceForm() {
	const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice);
	const [isPreview, setIsPreview] = useState(false);
	const componentRef = useRef(null);

	const updateItem = (index: number, field: string, value: string | number) => {
		const newItems = [...invoice.items];
		newItems[index] = {
			...newItems[index],
			[field]: field === "quantity" ? Number(value) : value,
		};

		setInvoice({
			...invoice,
			items: newItems,
		});
	};

	const addItem = () => {
		setInvoice({
			...invoice,
			items: [
				...invoice.items,
				{
					id: Math.random().toString(36).substr(2, 9),
					name: "",
					quantity: 1,
				},
			],
		});
	};

	const removeItem = (index: number) => {
		const newItems = invoice.items.filter((_, i) => i !== index);
		setInvoice({
			...invoice,
			items: newItems,
		});
	};

	return (
		<div className='grid gap-8'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Fashion Invoice</h1>
				<div className='flex gap-2'>
					<Button variant='outline' onClick={() => setIsPreview(!isPreview)}>
						{isPreview ? (
							<FileText className='h-4 w-4 mr-2' />
						) : (
							<Eye className='h-4 w-4 mr-2' />
						)}
						{isPreview ? "Edit" : "Preview"}
					</Button>
					<Button variant='outline'>
						<Printer className='h-4 w-4 mr-2' />
						Print
					</Button>
					<Button>
						<Download className='h-4 w-4 mr-2' />
						Download PDF
					</Button>
				</div>
			</div>

			{isPreview ? (
				<div ref={componentRef}>
					<InvoicePreview invoice={invoice} />
				</div>
			) : (
				<div className='grid gap-8 bg-card p-6 rounded-lg shadow'>
					<div className='grid gap-6 md:grid-cols-2'>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='invoiceNumber'>Invoice Number</Label>
								<Input
									id='invoiceNumber'
									value={invoice.invoiceNumber}
									onChange={(e) =>
										setInvoice({ ...invoice, invoiceNumber: e.target.value })
									}
								/>
							</div>
							<div>
								<Label htmlFor='date'>Date</Label>
								<Input
									id='date'
									type='date'
									value={invoice.date}
									onChange={(e) =>
										setInvoice({ ...invoice, date: e.target.value })
									}
								/>
							</div>
							<div>
								<Label htmlFor='dueDate'>Due Date</Label>
								<Input
									id='dueDate'
									type='date'
									value={invoice.dueDate}
									onChange={(e) =>
										setInvoice({ ...invoice, dueDate: e.target.value })
									}
								/>
							</div>
						</div>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='billFrom'>Bill From</Label>
								<Input
									id='billFrom'
									value={invoice.billFrom}
									onChange={(e) =>
										setInvoice({ ...invoice, billFrom: e.target.value })
									}
								/>
							</div>
							<div>
								<Label htmlFor='billFromAddress'>Bill From Address</Label>
								<Textarea
									id='billFromAddress'
									value={invoice.billFromAddress}
									onChange={(e) =>
										setInvoice({ ...invoice, billFromAddress: e.target.value })
									}
								/>
							</div>
						</div>
					</div>

					<div className='grid gap-6 md:grid-cols-2'>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='billTo'>Bill To</Label>
								<Input
									id='billTo'
									value={invoice.billTo}
									onChange={(e) =>
										setInvoice({ ...invoice, billTo: e.target.value })
									}
								/>
							</div>
							<div>
								<Label htmlFor='billToAddress'>Bill To Address</Label>
								<Textarea
									id='billToAddress'
									value={invoice.billToAddress}
									onChange={(e) =>
										setInvoice({ ...invoice, billToAddress: e.target.value })
									}
								/>
							</div>
						</div>
					</div>

					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<h3 className='text-lg font-semibold'>Items</h3>
							<Button onClick={addItem} variant='outline' size='sm'>
								Add Item
							</Button>
						</div>
						<div className='space-y-4'>
							{invoice.items.map((item, index) => (
								<div
									key={index}
									className='grid gap-4 md:grid-cols-3 items-end'
								>
									<div className='md:col-span-2'>
										<Label htmlFor={`name-${index}`}>Item Name</Label>
										<Input
											id={`name-${index}`}
											value={item.name}
											onChange={(e) =>
												updateItem(index, "name", e.target.value)
											}
										/>
									</div>
									<div className='flex gap-2'>
										<div className='flex-1'>
											<Label htmlFor={`quantity-${index}`}>Quantity</Label>
											<Input
												id={`quantity-${index}`}
												type='number'
												min='1'
												value={item.quantity}
												onChange={(e) =>
													updateItem(index, "quantity", e.target.value)
												}
											/>
										</div>
										<Button
											variant='destructive'
											size='icon'
											onClick={() => removeItem(index)}
											className='self-end'
										>
											×
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='space-y-4'>
						<div>
							<Label htmlFor='notes'>Notes</Label>
							<Textarea
								id='notes'
								value={invoice.notes}
								onChange={(e) =>
									setInvoice({ ...invoice, notes: e.target.value })
								}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
