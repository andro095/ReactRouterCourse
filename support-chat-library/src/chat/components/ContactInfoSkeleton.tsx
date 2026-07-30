import { Skeleton } from "@/components/ui/skeleton"

export const ContactInfoSkeleton = () => {
    return (
        <div 
            className="p-4 animate-pulse space-y-4"
            role="status"
            aria-label="Loading contact details"
        >
            {/* Header / Avatar */}
            <div className="flex flex-col items-center pb-6 border-b border-border/40">
                <Skeleton className="h-20 w-20 rounded-full mb-3" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex items-center gap-1.5 mt-1">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-3 w-12" />
                </div>
            </div>

            {/* Contact Information & Account Details */}
            <div className="py-2 space-y-5">
                {/* Contact Info */}
                <div>
                    <Skeleton className="h-4 w-36 mb-3" />
                    <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-3.5 w-12" />
                            <Skeleton className="h-3.5 w-28" />
                        </div>
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-3.5 w-14" />
                            <Skeleton className="h-3.5 w-24" />
                        </div>
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-3.5 w-20" />
                            <Skeleton className="h-3.5 w-16" />
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div>
                    <Skeleton className="h-4 w-28 mb-3" />
                    <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-3.5 w-10" />
                            <Skeleton className="h-3.5 w-16" />
                        </div>
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-3.5 w-24" />
                            <Skeleton className="h-3.5 w-16" />
                        </div>
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-3.5 w-16" />
                            <Skeleton className="h-3.5 w-14" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Action Button Skeleton */}
            <div className="pt-4 border-t border-border/40">
                <Skeleton className="h-9 w-full rounded-md" />
            </div>
        </div>
    )
}