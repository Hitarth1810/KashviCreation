import { OrderList } from "@/app/components/order-list";
import { OrderDetails } from "@/app/components/order-details";

export default function OrdersPage() {
	return (
		<div className='flex h-screen'>
			<div className='flex-1 overflow-auto border-r'>
				<div className='border-b bg-muted/40 p-4'>
					<h1 className='text-2xl font-semibold'>Orders</h1>
				</div>
				<OrderList />
			</div>
			<div className='w-[400px]'>
				<OrderDetails />
			</div>
		</div>
	);
}
