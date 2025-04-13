// lib/sendInvoiceEmail.ts
import nodemailer from "nodemailer";
import { getInvoice } from "@/lib/invoice";
import { getCustomer } from "@/lib/customer";
import puppeteer from "puppeteer";

export async function sendInvoiceEmail(invoiceId: string) {
	const invoice = await getInvoice(invoiceId);
	if (!invoice) throw new Error("Invoice not found");

	const customer = await getCustomer(invoice.customerId);
	if (!customer?.email) throw new Error("Customer email not found");

	// Start headless browser
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// You can host or use a local route that renders the invoice
	const url = `http://localhost:3000/invoice/preview?id=${invoiceId}`;
	await page.goto(url, { waitUntil: "networkidle0" });

	const pdfBuffer = await page.pdf({ format: "A4" });
	await browser.close();

	// Configure email transport (Gmail/SMTP, etc.)
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: '"Your App" <no-reply@yourapp.com>',
		to: customer.email,
		subject: `Invoice #${invoiceId}`,
		text: "Please find your invoice attached.",
		attachments: [
			{
				filename: `invoice-${invoiceId}.pdf`,
				content: pdfBuffer,
			},
		],
	};

	await transporter.sendMail(mailOptions);
}
