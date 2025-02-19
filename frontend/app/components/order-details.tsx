"use client";

import Image from "next/image";
import { Phone, Mail, CircleUserRound } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

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
		quantity: number;
	}[];
	status: string;
}

export function OrderDetails({ setUpdate }: { setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [details, setDetails] = useState<Invoice | null>(null);
	const [loading, setLoading] = useState(true);
	const [updateDetails, setUpdateDetails] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const selectedId = searchParams.get("id");

	useEffect(() => {
		if (!selectedId) return;
		const fetchData = async () => {
			const response = await axios.get(
				`/api/protected/admin/order?orderId=${selectedId}`
			);
			setDetails(response.data);
			console.log(response.data);
			setLoading(false);
			setUpdate(false)
			setUpdateDetails(false)
		};
		fetchData();
	}, [selectedId, updateDetails]);

	if (!selectedId)
		return (
			<div className='flex h-full items-center justify-center p-8 text-center text-muted-foreground'>
				Select a order to view its details
			</div>
		);

	if (loading) {
		return (
			<div className='flex h-full items-center justify-center p-8 text-center'>
				Loading order details...
			</div>
		);
	}
	const handleOnConfirm: React.MouseEventHandler<HTMLButtonElement> = async (
		e
	) => {
		e.preventDefault();
		await axios.put(`/api/protected/admin/order`, {
			orderId: selectedId,
			status: "confirmed",
		});
		setUpdate(true);

		setUpdateDetails(true)
	};

	const handleOnComplete: React.MouseEventHandler<HTMLButtonElement> = async (
		e
	) => {
		e.preventDefault();
		await axios.put(`/api/protected/admin/order`, {
			orderId: selectedId,
			status: "complete",
		});
		setUpdate(true);

		setUpdateDetails(true);
	};

	const handleOnCancel: React.MouseEventHandler<HTMLButtonElement> = async (
		e
	) => {
		e.preventDefault();
		 await axios.put(`/api/protected/admin/order`, {
			orderId: selectedId,
			status: "cancelled",
		});
		setUpdate(true);

		setUpdateDetails(true);
	};

	return (
		<div className='h-full border-l'>
			<div className='border-b bg-muted/40 p-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold'>Order Details</h2>
					<Badge variant='secondary'>{details?.status}</Badge>
				</div>
				<p className='text-sm text-muted-foreground'>Order #{details?.id}</p>
			</div>
			<div className='p-4'>
				<div className='flex items-center gap-4'>
					{details?.user?.image ? (
						<>
							<Image
								src={details?.user.image}
								alt={details?.user.name || "User"}
								width={64}
								height={64}
								className='rounded-full'
							/>
						</>
					) : (
						<>
							<CircleUserRound height={64} width={64} strokeWidth={"1px"} color="black"/>
						</>
					)}

					<div>
						<h3 className='font-semibold'>{details?.user?.name || "Unknown"}</h3>
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
										<p className='text-sm text-muted-foreground'>
											Product ID: {item.id}
										</p>
										<p className='font-medium'>{item.name}</p>
									</div>
									<Badge variant='secondary'>{item.quantity}</Badge>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				<Separator className='my-4' />
				<div className='flex flex-col gap-1'>
					{details?.status.toLocaleLowerCase() === "pending" ? (
						<>
							<Button
								size='default'
								variant='outline'
								onClick={handleOnConfirm}
							>
								CONFIRM
							</Button>
							<Button size='lg' variant='default' onClick={handleOnComplete}>
								COMPLETE
							</Button>
							<Button
								size='default'
								variant='destructive'
								onClick={handleOnCancel}
							>
								CANCEL
							</Button>
						</>
					) : details?.status.toLocaleLowerCase() === "confirmed" ? (
						<>
							<Button size='lg' variant='default' onClick={handleOnComplete}>
								COMPLETE
							</Button>
							<Button
								size='default'
								variant='destructive'
								onClick={handleOnCancel}
							>
								CANCEL
							</Button>
						</>
					) : details?.status.toLocaleLowerCase() === "complete" ? (
						<Label>Order Completed</Label>
					) : (
						<Label>Order Cancelled</Label>
					)}
				</div>
			</div>
		</div>
	);
}
