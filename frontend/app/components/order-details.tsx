/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Invoice {
	id: string;
	user: {
		name?: string;
		email: string;
		phone: number;
		image?: string;
	};
	products: {
		id: string;
		name: string;
	}[];
	status: string;
}

export function OrderDetails() {
	const [details, setDetails] = useState<Invoice | null>(null);
	const searchParams = useSearchParams();
	const selectedId = searchParams.get("id");

	useEffect(() => {
		if (!selectedId) return;
		const fetchData = async () => {
			const response = await axios.get(`/api/protected/admin/invoice?invoiceId=${selectedId}`);
			setDetails(response.data);
			console.log(response.data);
		};
		fetchData();
	}, [selectedId]);

	return (
		<div className='h-full border-l'>
			<div className='border-b bg-muted/40 p-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold'>Order Details</h2>
					<Badge variant='secondary'>{details?.status}</Badge>
				</div>
				<p className='text-sm text-muted-foreground'>Invoice #{details?.id}</p>
			</div>
			<div className='p-4'>
				<div className='flex items-center gap-4'>
					<Image
						src={details?.user.image || "/placeholder.svg"}
						alt={details?.user.name || "User"}
						width={64}
						height={64}
						className='rounded-full'
					/>
					<div>
						<h3 className='font-semibold'>{details?.user.name || "Unknown"}</h3>
						<div className='mt-1 space-y-1 text-sm text-muted-foreground'>
							<div className='flex items-center gap-2'>
								<Mail className='h-4 w-4' />
								{details?.user.email}
							</div>
							<div className='flex items-center gap-2'>
								<Phone className='h-4 w-4' />
								{details?.user.phone}
							</div>
						</div>
					</div>
				</div>
				<Separator className='my-4' />
				<div>
					<h4 className='font-semibold'>Order Items</h4>
					<div className='mt-4 space-y-4'>
						{details?.products.map((item) => (
							<Card key={item.id}>
								<CardContent className='flex items-center justify-between p-4'>
									<div>
										<p className='font-medium'>{item.name}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				<Separator className='my-4' />
			</div>
		</div>
	);
}
