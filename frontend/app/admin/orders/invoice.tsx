import { useState, useRef } from "react";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceData {
	title: string;
	invoiceNumber: string;
	billTo: string;
	companyAddress: string;
	invoiceDate: string;
	dueDate: string;
	additionalNotes: string;
	products: Product[];
}

interface Product {
	id: string;
	description: string;
	quantity: number;
}

function App() {
	const [invoiceData, setInvoiceData] = useState<InvoiceData>({
		title: "",
		invoiceNumber: "",
		billTo: "",
		companyAddress: "",
		invoiceDate: format(new Date(), "yyyy-MM-dd"),
		dueDate: format(
			new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			"yyyy-MM-dd"
		),
		additionalNotes: "",
		products: [],
	});

	const invoiceRef = useRef<HTMLDivElement>(null);

	const downloadPDF = async () => {
		if (invoiceRef.current) {
			const canvas = await html2canvas(invoiceRef.current);
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "px",
				format: [canvas.width, canvas.height],
			});

			pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
			pdf.save("invoice.pdf");
		}
	};

	return (
		<div className='min-h-screen bg-gray-100 py-8 px-4'>
			<div className='max-w-4xl mx-auto'>
				

				{/* Preview Section */}
				<div ref={invoiceRef} className='bg-white rounded-lg shadow-lg p-8'>
					<div className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-800'>
							{invoiceData.title || "Invoice Title"}
						</h2>
						<p className='text-gray-600'>
							Invoice #{invoiceData.invoiceNumber || "INV-001"}
						</p>
					</div>

					<div className='grid grid-cols-2 gap-8 mb-8'>
						<div>
							<h3 className='font-semibold text-gray-700 mb-2'>Bill To:</h3>
							<pre className='whitespace-pre-line'>
								{invoiceData.billTo || "Client Details"}
							</pre>
						</div>
						<div>
							<h3 className='font-semibold text-gray-700 mb-2'>From:</h3>
							<pre className='whitespace-pre-line'>
								{invoiceData.companyAddress || "Company Details"}
							</pre>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-8 mb-8'>
						<div>
							<p className='text-gray-600'>
								Invoice Date: {invoiceData.invoiceDate}
							</p>
						</div>
						<div>
							<p className='text-gray-600'>Due Date: {invoiceData.dueDate}</p>
						</div>
					</div>

					{invoiceData.products.length > 0 && (
						<div className='mb-8'>
							<h3 className='font-semibold text-gray-700 mb-4'>
								Products/Services:
							</h3>
							<div className='border rounded-lg overflow-hidden'>
								<table className='w-full'>
									<thead className='bg-gray-50'>
										<tr>
											<th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
												Description
											</th>
											<th className='px-4 py-2 text-left text-sm font-medium text-gray-700 w-24'>
												Quantity
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{invoiceData.products.map((product) => (
											<tr key={product.id}>
												<td className='px-4 py-2 text-sm text-gray-700'>
													{product.description}
												</td>
												<td className='px-4 py-2 text-sm text-gray-700'>
													{product.quantity}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}

					{invoiceData.additionalNotes && (
						<div className='mt-8 border-t pt-4'>
							<h3 className='font-semibold text-gray-700 mb-2'>
								Additional Notes:
							</h3>
							<p className='text-gray-600 whitespace-pre-line'>
								{invoiceData.additionalNotes}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
