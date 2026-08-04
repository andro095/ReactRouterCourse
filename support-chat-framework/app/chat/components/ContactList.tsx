import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Client } from "../interfaces/chat.interface";

interface Props {
    clients: Client[];
}

export const ContactList = ({ clients }: Props) => {




    return (
        <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-4 p-4">
                <div className="space-y-1">
                    <h3 className="px-2 text-sm font-semibold">Contacts</h3>
                    <div className="space-y-1">
                        {clients.map((client) => (
                            <NavLink
                                key={client.id}
                                to={`/chat/client/${client.id}`}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${isActive
                                        ? "bg-secondary text-foreground font-medium shadow-2xs"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }`
                                }
                                aria-label="Chat with John Doe"
                            >
                                <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex-shrink-0 flex items-center justify-center font-semibold text-xs">
                                    {client.name.split('')[0]}
                                </div>
                                <span className="truncate">{client.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="pt-4 border-t mt-4">
                    <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
                    <Button variant="ghost" className="w-full justify-start">
                        <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                            TM
                        </div>
                        Thomas Miller
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                            SB
                        </div>
                        Sarah Brown
                    </Button>
                </div>
            </div>
        </ScrollArea>
    );
};