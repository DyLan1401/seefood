function SkeletonBlock({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
    );
}

// Skeleton cho ProductCard
export function ProductCardSkeleton() {
    return (
        <div className="w-full max-w-60 h-80 border-2 border-neutral-200 rounded-3xl p-4 flex flex-col gap-3 bg-white mx-auto">
            <SkeletonBlock className="w-full aspect-4/3 rounded-2xl" />
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-4 w-1/2" />
            <SkeletonBlock className="h-9 w-full mt-auto" />
        </div>
    );
}

// Skeleton cho CategoryCard
export function CategoryCardSkeleton() {
    return (
        <div className="w-full max-w-60 border-2 border-neutral-200 rounded-3xl p-4 flex flex-col gap-3 bg-white mx-auto">
            <SkeletonBlock className="w-full aspect-square rounded-2xl" />
            <SkeletonBlock className="h-4 w-2/3 mx-auto" />
        </div>
    );
}

// Skeleton cho trang ProductDetail
export function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkeletonBlock className="w-full aspect-square rounded-3xl" />
                <div className="flex flex-col gap-4">
                    <SkeletonBlock className="h-8 w-3/4" />
                    <SkeletonBlock className="h-6 w-1/3" />
                    <SkeletonBlock className="h-4 w-full" />
                    <SkeletonBlock className="h-4 w-full" />
                    <SkeletonBlock className="h-4 w-2/3" />
                    <SkeletonBlock className="h-12 w-full mt-4" />
                </div>
            </div>
        </div>
    );
}

// Skeleton cho Admin table
export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
    return (
        <tr>
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <SkeletonBlock className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
}