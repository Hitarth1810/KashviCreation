"use client";
import {Package, ShoppingBag, Users, ReceiptText,MessageSquare} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { title } from "process";

const navItems = [
	
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
		icon: ReceiptText,
	},
	{
		title:"Contact",
		href: "/admin/contact",
		icon: MessageSquare,
	},
	
];

export function DashboardNav({ closeSidebar }: { closeSidebar: () => void }) {
	const pathname = usePathname();

	return (
		<div className="flex w-64 flex-col border-r bg-muted/40 h-screen">
			<div className="flex h-14 items-center border-b px-4">
				<Link href="/dashboard" className="flex items-center gap-2">
					<span className="font-semibold">Kashvi Creation Admin Panel</span>
				</Link>
			</div>
			<nav className="flex-1 space-y-1 p-4">
				{navItems.map((item) => (
					<Button
						key={item.href}
						asChild
						variant={pathname === item.href ? "secondary" : "ghost"}
						className={cn(
							"w-full justify-start gap-2",
							pathname === item.href && "bg-secondary"
						)}
						onClick={closeSidebar}
					>
						<Link href={item.href}>
							<item.icon className="h-4 w-4" />
							{item.title}
						</Link>
					</Button>
				))}
			</nav>

			{/* Go to Store Button - Styled and moved to the bottom */}
			<div className="mt-auto p-4">
				<Button
					asChild
					variant="secondary"
					className="w-full flex justify-center py-2 px-4 rounded-lg border bg-primary text-white hover:bg-primary/90 transition"
				>
					<Link href="/" className="flex items-center gap-2">
						<span className="font-medium">Go to Store</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
