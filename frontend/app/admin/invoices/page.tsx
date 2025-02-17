"use client"
import InvoiceList from "@/app/components/invoice-list";
import InvoicePreview from "@/app/components/invoice-preview";
import { useState } from "react";

export default function OrdersPage() {
    const [openPreview, setOpenPreview] = useState(false);
	return (
		<div className='flex h-screen'>
			<div className='flex-1 overflow-auto border-r'>
				<div className='border-b bg-muted/40 p-4'>
					<h1 className='text-2xl font-semibold'>Invoices</h1>
				</div>
				<InvoiceList />
                {
                    openPreview && <InvoicePreview />
                }
			</div>
		</div>
	);
}
