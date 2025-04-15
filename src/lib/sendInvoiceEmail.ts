/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import * as puppeteer from "puppeteer";
import { getCustomer, getCustomerAddress } from "./customer";
import { getInvoice } from "./invoice";
import { getProduct } from "./products";
import { Address } from "@prisma/client";

let htmlTemplate = `<!DOCTYPE html>
<html>
	<head>
		<title>Invoice</title>
		<style>
			/* Base styles */
			body {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
					"Helvetica Neue", Arial, sans-serif;
				line-height: 1.5;
				color: #333;
				margin: 0;
				padding: 0;
				background-color: #f5f5f5;
			}

			/* Container styling */
			.flex {
				display: flex;
			}

			.items-center {
				align-items: center;
			}

			.justify-center {
				justify-content: center;
			}

			.h-full {
				height: 100vh;
			}

			.bg-white {
				background-color: #ffffff;
			}

			.p-8 {
				padding: 2rem;
			}

			.rounded-lg {
				border-radius: 0.5rem;
			}

			.shadow {
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			}

			/* Main invoice container */
			.invoice-container {
				background-color: white;
				padding: 2rem;
				border-radius: 0.5rem;
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
				width: 60%;
				height: 80%;
				margin: 0 auto;
			}

			/* Grid layout */
			.grid {
				display: grid;
			}

			.gap-8 {
				gap: 2rem;
			}

			/* Header styling */
			.flex-between {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
			}

			.text-4xl {
				font-size: 2.25rem;
			}

			.font-semibold {
				font-weight: 600;
			}

			.text-sm {
				font-size: 0.875rem;
			}

			.text-muted-foreground {
				color: #6c757d;
			}

			.whitespace-pre-line {
				white-space: pre-line;
			}

			.text-right {
				text-align: right;
			}

			.font-medium {
				font-weight: 500;
			}

			.mb-1 {
				margin-bottom: 0.25rem;
			}

			/* Table styling */
			.border {
				border: 1px solid #e2e8f0;
			}

			.overflow-hidden {
				overflow: hidden;
			}

			table {
				width: 100%;
				border-collapse: collapse;
			}

			.bg-muted {
				background-color: #f1f5f9;
			}

			.text-left {
				text-align: left;
			}

			.p-3 {
				padding: 0.75rem;
			}

			.border-t {
				border-top: 1px solid #e2e8f0;
			}

			/* Print styles */
			@media print {
				.shadow {
					box-shadow: none;
				}

				.invoice-container {
					padding: 0;
					width: 100%;
					height: auto;
					box-shadow: none;
				}
			}
		</style>
	</head>
	<body>
		<div class="flex items-center justify-center h-full">
			<div class="invoice-container">
				<div class="grid gap-8">
					<!-- Header with company and invoice info -->
					<div class="flex-between">
						<div>
							<div class="text-4xl font-semibold">INVOICE</div>
							<div class="text-sm text-muted-foreground whitespace-pre-line">
								Kashavi Creation
							</div>
							<div class="text-sm text-muted-foreground whitespace-pre-line">
								Shop No. 113, Millennium Textile Market - 2, Ring Road, Surat -
								395002.
							</div>
						</div>
						<div class="text-right">
							<div class="text-sm font-medium">
								Invoice Number:
								<!-- INVOICE_ID -->
							</div>
							<div class="text-sm font-medium">
								Order ID:
								<!-- ORDER_ID -->
							</div>
							<div class="text-sm text-muted-foreground">
								Date:
								<!-- INVOICE_DATE -->
							</div>
						</div>
					</div>

					<!-- Customer details -->
					<div>
						<div class="font-medium mb-1">Bill To:</div>
						<div class="text-sm"><!-- CUSTOMER_NAME --></div>
						<div class="text-sm text-muted-foreground whitespace-pre-line">
							<!-- CUSTOMER_ADDRESS -->
						</div>
					</div>

					<!-- Products table -->
					<div class="border rounded-lg overflow-hidden">
						<table class="w-full">
							<thead>
								<tr class="bg-muted">
									<th class="text-left p-3">Product ID</th>
									<th class="text-left p-3">Name</th>
									<th class="text-right p-3">Quantity</th>
								</tr>
							</thead>
							<tbody>
								<!-- PRODUCT_ROWS -->
								<!-- Example row:
              <tr class="border-t">
                <td class="text-left p-3">12345</td>
                <td class="p-3">Product Name</td>
                <td class="text-right p-3">2</td>
              </tr>
              --></tbody>
						</table>
					</div>

					<!-- Notes section -->
					<div id="notes-section" style="display: none">
						<div class="font-medium mb-1">Notes:</div>
						<div class="text-sm text-muted-foreground whitespace-pre-line">
							<!-- NOTES -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
`
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
	createdAt: Date;
	updatedAt: Date;
	address: Address;
	user: {
		name: string;
		email: string;
		phone: number;
		image: string | null;
	};
}

// Function to populate the HTML template with invoice data
function generateInvoiceHTML(invoice: InvoiceData): string {
	try {
		console.log(invoice)
		htmlTemplate = htmlTemplate
			.replace("<!-- INVOICE_ID -->", invoice.id)
			.replace("<!-- ORDER_ID -->", invoice.orderId)
			.replace("<!-- INVOICE_DATE -->", invoice.createdAt.toISOString())
			.replace("<!-- CUSTOMER_NAME -->", invoice.user.name)
			.replace("<!-- CUSTOMER_ADDRESS -->", invoice.address.address);

		let productRows = "";
		invoice.products.forEach((item: any) => {
			productRows += `
      <tr class="border-t">
        <td class="text-left p-3">${item.id}</td>
        <td class="p-3">${item.name}</td>
        <td class="text-right p-3">${item.quantity}</td>
      </tr>`;
		});

		htmlTemplate = htmlTemplate.replace("<!-- PRODUCT_ROWS -->", productRows);

		if (invoice.notes) {
			htmlTemplate = htmlTemplate
				.replace('style="display: none;"', "")
				.replace("<!-- NOTES -->", invoice.notes);
		}

		return htmlTemplate;
	} catch (err) {
		throw new Error(
			`Failed to generate invoice HTML: ${(err as Error).message}`
		);
	}
}

// Function to convert HTML to PDF
async function generatePDF(html: string): Promise<Buffer> {
	let browser: puppeteer.Browser | null = null;
	try {
		browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();
		await page.setContent(html, { waitUntil: "networkidle0" });

		const pdfBuffer = await page.pdf({
			format: "A4",
			printBackground: true,
			margin: {
				top: "20px",
				right: "20px",
				bottom: "20px",
				left: "20px",
			},
		});
		return Buffer.from(pdfBuffer);
	} catch (err) {
		throw new Error(`Failed to generate PDF: ${(err as Error).message}`);
	} finally {
		if (browser) await browser.close();
	}
}

// Function to send email with HTML content and PDF attachment using Gmail
async function sendEmail(
	recipientEmail: string,
	html: string,
	pdfBuffer: Buffer,
	invoice: any
): Promise<nodemailer.SentMessageInfo> {
	

	const gmailUser = "alt.highintoxic14@gmail.com";
	const gmailPass = "xicj lvfs qsby pync";

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: gmailUser,
			pass: gmailPass,
		},
	});

	const mailOptions = {
		from: `"Kashavi Creation" <${gmailUser}>`,
		to: recipientEmail,
		subject: `Invoice #${invoice.id} for your order #${invoice.orderId}`,
		html,
		attachments: [
			{
				filename: `invoice-${invoice.id}.pdf`,
				content: pdfBuffer,
				contentType: "application/pdf",
			},
		],
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		return info;
	} catch (err) {
		throw new Error(`Failed to send email: ${(err as Error).message}`);
	}
}

// Main function to run the application
export async function sendInvoiceEmail(invoiceId: string): Promise<void> {
	try {
		let invoice;

		// Fetch invoice data
		try {
			const invoices = await getInvoice(invoiceId);
			const customer = await getCustomer(invoices!.customerId);
			const address = await getCustomerAddress(invoices!.addressId);
			let products: any = [];
			if (invoices?.products) {
				await Promise.all(
					invoices.products.map(async (product: string) => {
						const data = await getProduct(product);
						products.push({ id: data?.id, name: data?.name });
					})
				);
			}
			products = mergeDuplicateProducts(products);
			const data = {
				...invoices,
				user: {
					name: customer?.name,
					email: customer!.email,
					phone: customer!.phone,
					image: customer!.image,
				},
				products: products,
				address,
			};
			invoice = data;
		} catch (err) {
			throw new Error(
				`Failed to fetch invoice data: ${(err as Error).message}`
			);
		}

		// Generate HTML
		let invoiceHTML: string;
		try {
			invoiceHTML = generateInvoiceHTML(invoice as InvoiceData);
		} catch (err) {
			throw new Error(
				`Error generating invoice HTML: ${(err as Error).message}`
			);
		}

		// Convert to PDF
		let pdfBuffer: Buffer;
		try {
			pdfBuffer = await generatePDF(invoiceHTML);
		} catch (err) {
			throw new Error(
				`Error generating invoice PDF: ${(err as Error).message}`
			);
		}

		// Send Email
		try {
			await sendEmail(invoice.user.email, invoiceHTML, pdfBuffer, invoice);
		} catch (err) {
			throw new Error(`Error sending email: ${(err as Error).message}`);
		}
	} catch (err) {
		console.error(
			`[sendInvoiceEmail] ${new Date().toISOString()} - ${
				(err as Error).message
			}`
		);
		throw err;
	}
}


function mergeDuplicateProducts(products: { id: string; name: string }[]) {
	const productMap = new Map<
		string,
		{ id: string; name: string; quantity: number }
	>();

	products.forEach((product) => {
		if (productMap.has(product.id)) {
			productMap.get(product.id)!.quantity += 1;
		} else {
			productMap.set(product.id, { ...product, quantity: 1 });
		}
	});

	return Array.from(productMap.values());
}