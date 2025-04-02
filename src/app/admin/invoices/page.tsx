
import InvoiceList from "@/app/components/invoice-list";

export default function OrdersPage() {
	return (
		<div className='flex h-screen'>
			<div className='flex-1 overflow-auto border-r'>
				<div className='border-b bg-muted/40 p-4'>
					<h1 className='text-2xl font-semibold'>Invoices</h1>
				</div>
				<InvoiceList />
			</div>
		</div>
	);
}
