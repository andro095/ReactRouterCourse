import { MessageSquareDashed, MousePointerClick } from "lucide-react"

const NoChatSelectedPage = () => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            // Accessible keyboard interaction
        }
    }

    return (
        <div 
            className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-background"
            tabIndex={0}
            role="region"
            aria-label="No chat selected view"
            onKeyDown={handleKeyDown}
        >
            <div className="max-w-md w-full flex flex-col items-center p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-border">
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-25" />
                    <MessageSquareDashed className="h-10 w-10 text-primary stroke-[1.5]" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                    No Chat Selected
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
                    Choose a contact from the left sidebar to view message history and continue the conversation.
                </p>

                <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/70 text-xs font-medium text-muted-foreground border border-border/50 shadow-xs"
                    tabIndex={0}
                    aria-label="Instruction hint: Select a contact from the sidebar"
                >
                    <MousePointerClick className="h-3.5 w-3.5 text-primary" />
                    <span>Select a contact to start messaging</span>
                </div>
            </div>
        </div>
    )
}

export default NoChatSelectedPage