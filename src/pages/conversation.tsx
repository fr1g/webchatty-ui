

export function Conversation({ targetChat }: { targetChat: null | string }) {

    if (targetChat) return <div>
        <div>Conversation: {targetChat} </div>
    </div>
    return <div className="w-full h-full">
        <p className="text-center my-auto">
            Select a chat...
        </p>
    </div>
}