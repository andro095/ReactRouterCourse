import { Copy, Download, ThumbsUp, ThumbsDown, Send, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Textarea } from "~/components/ui/textarea"
import type { Route } from "./+types/client-chat-page"
import { getClientMessages, sendMessage } from "~/fake/fake-data"
import { getSession } from "~/sessions.server"
import { formatDate } from "~/lib/date-formatter"
import { Form } from "react-router"

export async function loader({ request, params }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));

    const userName = session.get('name');

    const clientId = params.client_id;

    const messages = await getClientMessages(clientId);

    return { messages, userName };
}

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();

    const message = `${formData.get('message')}`;

    const newMessage = await sendMessage({
        sender: 'agent',
        clientId: params.client_id,
        content: message,
        createdAt: new Date()
    })

    return { newMessage };
}

const ClientChatPage = ({ loaderData }: Route.ComponentProps) => {
    const { messages, userName } = loaderData;

    const [input, setInput] = useState("")

    return (
        <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages?.length === 0 && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8 border border-dashed rounded-xl bg-muted/20 my-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                                <MessageSquare className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-base font-medium text-foreground">No messages yet</h3>
                            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                                Start the conversation by sending a message below.
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div key={index} className="w-full">
                            {message.sender === "client" ? (
                                // Agent message - left aligned
                                <div className="flex gap-2 max-w-[80%]">
                                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">NexTalk</span>
                                            <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
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
                                        <span className="text-sm font-medium mr-2">{userName}</span>
                                        <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
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
                <Form
                    method="post"
                    className="flex items-center gap-2"
                >
                    <Textarea
                        placeholder="Type a message as a customer"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        name="message"
                        className="min-h-[44px] h-[44px] resize-none py-3"
                    />
                    <Button
                        type="submit"
                        className="h-[44px] px-4 flex items-center gap-2"
                    >
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ClientChatPage