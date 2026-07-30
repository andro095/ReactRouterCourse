import { UserX, MousePointerClick } from "lucide-react"

export const NoContactSelected = () => {
    return (
        <div 
            className="flex h-full flex-col items-center justify-center p-6 text-center"
            role="status"
            aria-label="No customer selected alert"
        >
            <div className="relative flex flex-col items-center max-w-xs w-full p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-lg space-y-4 transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
                    <UserX className="h-6 w-6" aria-hidden="true" />
                </div>

                <div className="space-y-1.5">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                        No Customer Selected
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Please select a customer from the sidebar to view their account details and conversation history.
                    </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border/40">
                    <MousePointerClick className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span>Select from sidebar</span>
                </div>
            </div>
        </div>
    )
}