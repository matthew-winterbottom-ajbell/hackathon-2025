import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import type {ConversationResponse} from "../types/conversation.ts";

export function useConversationFlagged(onFlagged: (message: ConversationResponse) => void) {
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5044/api/v1/dashboard")
            .withAutomaticReconnect()
            .build();

        connectionRef.current = connection;

        connection.on("FlaggedConversation", (message) => {
            onFlagged(message);
        });

        connection
            .start()
            .catch(err => console.error("SignalR DashboardHub Connection Error: ", err));

        return () => {
            connection.stop();
        };
    }, [onFlagged]);
}

