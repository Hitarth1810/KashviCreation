import type { InvoiceData } from "./invoice";

export function InvoicePreview({ invoice }: { invoice: InvoiceData }) {
	return (
		<div className='bg-white p-8 rounded-lg shadow min-h-[297mm] print:shadow-none print:p-0'>
			<div className='grid gap-8'>
				<div className='flex justify-between items-start'>
					<div>
						<h1 className='text-4xl font-bold text-primary mb-2'>INVOICE</h1>
						<div className='text-sm text-muted-foreground whitespace-pre-line'>
							{invoice.billFrom}
						</div>
						<div className='text-sm text-muted-foreground whitespace-pre-line'>
							{invoice.billFromAddress}
						</div>
					</div>
					<div className='text-right'>
						<div className='text-sm font-medium'>
							Invoice Number: {invoice.invoiceNumber}
						</div>
						<div className='text-sm text-muted-foreground'>
							Date: {invoice.date}
						</div>
						<div className='text-sm text-muted-foreground'>
							Due Date: {invoice.dueDate}
						</div>
					</div>
				</div>

				<div>
					<div className='font-medium mb-1'>Bill To:</div>
					<div className='text-sm'>{invoice.billTo}</div>
					<div className='text-sm text-muted-foreground whitespace-pre-line'>
						{invoice.billToAddress}
					</div>
				</div>

				<div className='border rounded-lg overflow-hidden'>
					<table className='w-full'>
						<thead>
							<tr className='bg-muted'>
								<th className='text-left p-3'>Description</th>
								<th className='text-right p-3'>Quantity</th>
								<th className='text-right p-3'>Price</th>
								<th className='text-right p-3'>Amount</th>
							</tr>
						</thead>
						<tbody>
							{invoice.items.map((item, index) => (
								<tr key={index} className='border-t'>
									<td className='p-3'>{item.description}</td>
									<td className='text-right p-3'>{item.quantity}</td>
									<td className='text-right p-3'>${item.price.toFixed(2)}</td>
									<td className='text-right p-3'>${item.amount.toFixed(2)}</td>
								</tr>
							))}
						</tbody>
						<tfoot className='font-medium'>
							<tr className='border-t'>
								<td colSpan={3} className='text-right p-3'>
									Subtotal
								</td>
								<td className='text-right p-3'>
									${invoice.subtotal.toFixed(2)}
								</td>
							</tr>
							<tr className='border-t'>
								<td colSpan={3} className='text-right p-3'>
									Tax (10%)
								</td>
								<td className='text-right p-3'>${invoice.tax.toFixed(2)}</td>
							</tr>
							<tr className='border-t'>
								<td colSpan={3} className='text-right p-3'>
									Total
								</td>
								<td className='text-right p-3'>${invoice.total.toFixed(2)}</td>
							</tr>
						</tfoot>
					</table>
				</div>

				{invoice.notes && (
					<div>
						<div className='font-medium mb-1'>Notes:</div>
						<div className='text-sm text-muted-foreground whitespace-pre-line'>
							{invoice.notes}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
