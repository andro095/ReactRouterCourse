import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { NavLink, useParams } from "react-router"
import { getClients } from "@/fake/fake-data"
import { cn } from "@/lib/utils"

export const ContactList = () => {
    const { clientId } = useParams();

    console.log(clientId);

    const { data: clients, isLoading } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients,
        staleTime: 1000 * 60 * 5
    })

    return (
        <ScrollArea className="h-[calc(100vh-64px)]">
            <div className="space-y-4 p-4">
                <div className="space-y-1">
                    <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contacts</h3>
                    <div className="space-y-1 pt-1">
                        {isLoading && (
                            <div className="py-4 text-center text-xs text-muted-foreground animate-pulse">Loading contacts...</div>
                        )}
                        {clients?.map((client) => (
                            <NavLink
                                key={client.id}
                                to={`/chat/${client.id}`}
                                className={({ isActive }) =>
                                    cn(
                                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        isActive
                                            ? "bg-primary/10 text-primary shadow-xs dark:bg-primary/20 font-semibold"
                                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={cn(
                                                "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200",
                                                isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-200",
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-foreground"
                                            )}
                                        >
                                            {client.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-1 flex-col overflow-hidden">
                                            <span className="truncate text-sm">{client.name}</span>
                                        </div>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="pt-4 border-t mt-4">
                    <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Recent</h3>
                    <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-muted-foreground hover:text-foreground">
                        <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                            TM
                        </div>
                        <span className="truncate text-sm font-medium">Thomas Miller</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-muted-foreground hover:text-foreground mt-1">
                        <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                            SB
                        </div>
                        <span className="truncate text-sm font-medium">Sarah Brown</span>
                    </Button>
                </div>
            </div>
        </ScrollArea>
    )
}