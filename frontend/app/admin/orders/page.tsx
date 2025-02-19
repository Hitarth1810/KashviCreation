"use client"
import { OrderList } from "@/app/components/order-list";
import { OrderDetails } from "@/app/components/order-details";
import { useState } from "react";


export default function OrdersPage() {
	const [updateDetails, setUpdateDetails] = useState<boolean>(false)
	return (
		<div className='flex h-screen'>
			<div className='flex-1 overflow-auto border-r'>
				<div className='border-b bg-muted/40 p-4'>
					<h1 className='text-2xl font-semibold'>Orders</h1>
				</div>
				<OrderList
					updateDetails={updateDetails}
				/>
			</div>
			<div className='w-[400px]'>
				<OrderDetails
					setUpdate={setUpdateDetails}
				/>
			</div>
		</div>
	);
}
