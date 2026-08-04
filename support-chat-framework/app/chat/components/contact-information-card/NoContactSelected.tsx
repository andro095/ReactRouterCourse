import { UserX } from "lucide-react"

export const NoContactSelected = () => {
    return (
        <div
            className="p-4 flex items-center justify-center h-full"
            role="status"
            aria-label="No contact selected"
        >
            <div className="text-center space-y-3">
                <div className="h-16 w-16 bg-muted mx-auto rounded-full flex items-center justify-center">
                    <UserX className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-sm text-muted-foreground">
                        Choose a chat from the sidebar to view contact details and messages.
                    </p>
                </div>
            </div>
        </div>
    )
}