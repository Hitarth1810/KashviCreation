"use client";
import { Home, Package, Settings, ShoppingBag, Users, ReceiptText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

const navItems = [
	{
		title: "Dashboard",
		href: "/admin",
		icon: Home,
	},
	{
		title: "Orders",
		href: "/admin/orders",
		icon: ShoppingBag,
	},
	{
		title: "Products",
		href: "/admin/products",
		icon: Package,
	},
	{
		title: "Customers",
		href: "/admin/customers",
		icon: Users,
	},
	{
		title: "Invoices",
		href: "/admin/invoices",
		icon: ReceiptText
	},
	{
		title: "Settings",
		href: "/admin/settings",
		icon: Settings,
	},
];

export function DashboardNav({ closeSidebar }: { closeSidebar: () => void }){
	const pathname = usePathname();

	return (
		<div className='flex w-64 flex-col border-r bg-muted/40'>
			<div className='flex h-14 items-center border-b px-4'>
				<Link href='/dashboard' className='flex items-center gap-2'>
					<span className='font-semibold'>Kashvi Creation Admin Panel</span>
				</Link>
			</div>
			<nav className='flex-1 space-y-1 p-4'>
				{navItems.map((item) => (
					<Button
						key={item.href}
						asChild
						variant={pathname === item.href ? "secondary" : "ghost"}
						className={cn(
							"w-full justify-start gap-2",
							pathname === item.href && "bg-secondary"
						)}
						onClick={closeSidebar} // Close sidebar when link is clicked
					>
						<Link href={item.href}>
							<item.icon className='h-4 w-4' />
							{item.title}
						</Link>
					</Button>
				))}
			</nav>
		</div>
	);
}
