export const ContactInformationSkeleton = () => {
    return (
        <div 
            className="p-4 animate-pulse space-y-4"
            role="status"
            aria-label="Loading contact information"
            aria-busy="true"
        >
            {/* Avatar & Basic Info Skeleton */}
            <div className="flex flex-col items-center pb-6 border-b border-border">
                <div className="h-20 w-20 rounded-full bg-muted mb-3" />
                <div className="h-5 w-32 rounded bg-muted mb-2" />
                <div className="h-4 w-24 rounded bg-muted mb-2" />
                <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                    <div className="h-3 w-12 rounded bg-muted" />
                </div>
            </div>

            {/* Contact Details Skeleton */}
            <div className="py-4 space-y-6">
                <div>
                    <div className="h-4 w-36 rounded bg-muted mb-3" />
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="h-3.5 w-14 rounded bg-muted" />
                            <div className="h-3.5 w-28 rounded bg-muted" />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-3.5 w-14 rounded bg-muted" />
                            <div className="h-3.5 w-24 rounded bg-muted" />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-3.5 w-20 rounded bg-muted" />
                            <div className="h-3.5 w-20 rounded bg-muted" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="h-4 w-32 rounded bg-muted mb-3" />
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="h-3.5 w-12 rounded bg-muted" />
                            <div className="h-3.5 w-20 rounded bg-muted" />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-3.5 w-24 rounded bg-muted" />
                            <div className="h-3.5 w-16 rounded bg-muted" />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-3.5 w-16 rounded bg-muted" />
                            <div className="h-3.5 w-16 rounded bg-muted" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Skeleton */}
            <div className="pt-4 border-t border-border">
                <div className="h-9 w-full rounded-md bg-muted" />
            </div>
        </div>
    )
}