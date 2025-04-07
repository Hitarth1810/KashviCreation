"use client";

import { cn } from "@/lib/utils"; // Assumes you have a utility function for class names

interface SkeletonProps {
	className?: string;
	width?: string;
	height?: string;
	rounded?: string;
}

const Skeleton = ({
	className,
	width,
	height,
	rounded = "rounded",
}: SkeletonProps) => {
	return (
		<div
			className={cn("animate-pulse bg-gray-200", rounded, className)}
			style={{
				width: width,
				height: height,
			}}
		/>
	);
};

export default Skeleton;
