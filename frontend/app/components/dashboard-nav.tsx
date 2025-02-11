"use client";
import { Home, Package, Settings, ShoppingBag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

const navItems = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: Home,
	},
	{
		title: "Orders",
		href: "/dashboard/orders",
		icon: ShoppingBag,
	},
	{
		title: "Products",
		href: "/dashboard/products",
		icon: Package,
	},
	{
		title: "Customers",
		href: "/dashboard/customers",
		icon: Users,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: Settings,
	},
];

export function DashboardNav() {
	const pathname = usePathname();

	return (
		<div className='flex w-64 flex-col border-r bg-muted/40'>
			<div className='flex h-14 items-center border-b px-4'>
				<Link href='/dashboard' className='flex items-center gap-2'>
					<Image
						src='/logo.svg'
						alt='Logo'
						width={32}
						height={32}
						className='rounded bg-primary p-1'
					/>
					<span className='font-semibold'>Saree Admin</span>
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
