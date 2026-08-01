import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, Download, ThumbsUp, ThumbsDown, Send, Loader2 } from "lucide-react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getClientMessages, sendMessage } from "@/fake/fake-data"
import { useQueryClient } from "@tanstack/react-query"
import type { Message } from "../interfaces/chat-interface"

const ChatPage = () => {
    const { clientId } = useParams();
    const queryClient = useQueryClient();

    const [input, setInput] = useState("")

    const { data: messages = [], isLoading } = useQuery({
        queryKey: ['messages', clientId],
        queryFn: () => getClientMessages(clientId ?? ''),
    });

    const { mutate: sendMessageMutation } = useMutation({
        mutationFn: sendMessage,
        onSuccess: (newMessage) => {
            queryClient.setQueryData(['messages', clientId], (prevMessages: Message[]) => [...prevMessages, newMessage]);
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessageMutation({
            content: input,
            clientId: clientId ?? '',
            createdAt: new Date(),
            sender: 'agent'
        });
        setInput("");
    }

    if (isLoading) {
        return (
            <div
                tabIndex={0}
                role="status"
                aria-label="Loading chat messages"
                className="flex-1 flex flex-col items-center justify-center p-6 space-y-6 min-h-[400px]"
            >
                <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
                    <span className="text-sm font-medium">Loading conversation...</span>
                </div>
                <div className="w-full max-w-lg space-y-6 opacity-75">
                    <div className="flex gap-3 max-w-[80%]">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-16 w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-2/3 rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
                {
                    messages.length === 0 && (
                        <div className="mt-10 flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                                    <svg
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                                <p className="text-sm text-gray-500 mb-4">Start the conversation by typing a message below</p>
                                <div className="flex items-center justify-center space-x-2 opacity-50">
                                    <svg
                                        className="h-4 w-4 animate-pulse"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                        />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-500">Scroll to bottom</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className="w-full">
                            {message.sender === "client" ? (
                                // Agent message - left aligned
                                <div className="flex gap-2 max-w-[80%]">
                                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">NexTalk</span>
                                            <span className="text-sm text-muted-foreground">{message.createdAt.toLocaleString()}</span>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <ThumbsUp className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <ThumbsDown className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // User message - right aligned
                                <div className="flex flex-col items-end">
                                    <div className="text-right mb-1">
                                        <span className="text-sm font-medium mr-2">G5</span>
                                        <span className="text-sm text-muted-foreground">{message.createdAt.toLocaleString()}</span>
                                    </div>
                                    <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 border-t">
                <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <Textarea
                        placeholder="Type a message as a customer"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[44px] h-[44px] resize-none py-3"
                    />
                    <Button
                        type="submit"
                        className="h-[44px] px-4 flex items-center gap-2"
                    >
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChatPage
