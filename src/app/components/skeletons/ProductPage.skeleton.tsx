"use client";
import Skeleton from "./skeleton";

const ProductSkeleton = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
			{/* Left Column - Images Skeleton */}
			<div className='space-y-4'>
				{/* Main Image Skeleton */}
				<div className='relative w-full h-[60vh] sm:h-[80vh] rounded-xl overflow-hidden bg-white flex items-center justify-center px-4'>
					<Skeleton width='100%' height='100%' rounded='rounded-xl' />
				</div>

				{/* Thumbnails Skeleton */}
				<div className='flex gap-2 overflow-x-auto sm:overflow-hidden sm:grid sm:grid-cols-4 px-2'>
					{[1, 2, 3, 4].map((idx) => (
						<Skeleton
							key={idx}
							className='w-24 h-24 flex-shrink-0'
							rounded='rounded-md'
						/>
					))}
				</div>
			</div>

			{/* Right Column - Product Details Skeleton */}
			<div className='space-y-6'>
				{/* Title Skeleton */}
				<Skeleton className='h-10 w-3/4' />

				{/* Reviews Summary Skeleton */}
				<div className='flex items-center space-x-4'>
					<Skeleton className='h-5 w-32' />
					<Skeleton className='h-5 w-24' />
				</div>

				{/* Description Skeleton */}
				<div className='space-y-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-5/6' />
					<Skeleton className='h-4 w-4/6' />
				</div>

				{/* Color Selection Skeleton */}
				<div>
					<Skeleton className='h-5 w-16 mb-2' />
					<div className='flex space-x-3'>
						{[1, 2, 3].map((idx) => (
							<Skeleton key={idx} className='w-8 h-8 rounded-full' />
						))}
					</div>
				</div>

				{/* Quantity Skeleton */}
				<div>
					<Skeleton className='h-5 w-20 mb-2' />
					<Skeleton className='h-12 w-32' rounded='rounded-lg' />
				</div>

				{/* Action Buttons Skeleton */}
				<div className='flex space-x-4 pt-6'>
					<Skeleton className='flex-1 h-14' rounded='rounded-md' />
					<Skeleton className='h-14 w-14' rounded='rounded-md' />
				</div>
			</div>
		</div>
	);
};

const SimilarProductsSkeleton = () => {
	return (
		<div className='mt-16 mb-16'>
			<Skeleton className='h-8 w-64 mb-8' />
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{[1, 2, 3, 4].map((idx) => (
					<div key={idx} className='bg-white shadow-lg overflow-hidden'>
						<Skeleton className='aspect-[3/4] w-full' />
						<div className='p-4 space-y-2'>
							<Skeleton className='h-5 w-3/4' />
							<Skeleton className='h-4 w-1/2' />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const ReviewsSkeleton = () => {
	return (
		<div className='mt-16'>
			<Skeleton className='h-8 w-64 mb-8' />

			{/* Review Form Skeleton */}
			<div className='bg-white p-6 rounded-lg shadow-sm mb-8 space-y-4'>
				<Skeleton className='h-6 w-36' />
				<Skeleton className='h-10 w-full' />
				<Skeleton className='h-6 w-24' />
				<Skeleton className='h-32 w-full' />
				<Skeleton className='h-10 w-32' />
			</div>

			{/* Reviews List Skeleton */}
			<div className='space-y-8'>
				{[1, 2, 3].map((idx) => (
					<div key={idx} className='bg-white p-6 rounded-lg shadow-sm'>
						<div className='flex items-start space-x-4'>
							<Skeleton className='w-12 h-12 rounded-full' />
							<div className='flex-1 space-y-2'>
								<div className='flex justify-between'>
									<Skeleton className='h-5 w-32' />
									<Skeleton className='h-4 w-24' />
								</div>
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-16 w-full' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const ProductPageSkeleton = () => {
    return (
        <>
            <ProductSkeleton />
            <SimilarProductsSkeleton />
            <ReviewsSkeleton />
        </>
    );
}

export default ProductPageSkeleton;