
export const NoChatSelectedPage = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <h1 className="mb-2 text-4xl font-bold">No chat selected</h1>
            <p className="text-muted-foreground mb-6 text-lg">
                Please select a chat to start messaging
            </p>

        </div>
    );
};

export default NoChatSelectedPage;