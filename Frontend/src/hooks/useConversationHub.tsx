import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export function useConversationHub(conversationId: string | undefined, onMessage: (message: any) => void) {
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        if (!conversationId) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5044/api/v1/conversations/${conversationId}/live`)
            .withAutomaticReconnect()
            .build();

        connectionRef.current = connection;

        connection.on("ReceiveMessage", (message) => {
            onMessage(message);
        });

        connection
            .start()
            .catch(err => console.error("SignalR Connection Error: ", err));

        return () => {
            connection.stop();
        };
    }, [conversationId, onMessage]);
}

