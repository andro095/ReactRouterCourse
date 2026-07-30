import { Loader2 } from "lucide-react"

type LoaderProps = {
    text?: string
}

export const Loader = ({ text = "Loading..." }: LoaderProps) => {
    return (
        <div
            tabIndex={0}
            role="status"
            aria-label={text}
            className="flex flex-col items-center justify-center min-h-[50vh] w-full gap-3 p-4 text-muted-foreground"
        >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {text && <span className="text-sm font-medium">{text}</span>}
        </div>
    )
}
