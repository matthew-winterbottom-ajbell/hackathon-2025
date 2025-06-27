import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import type {ConversationResponse} from "../types/conversation.ts";

export function useNewConversation(onMessage: (message: ConversationResponse) => void) {
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5044/api/v1/dashboard")
            .withAutomaticReconnect()
            .build();

        connectionRef.current = connection;

        connection.on("NewConversation", (message) => {
            onMessage(message);
        });

        connection
            .start()
            .catch(err => console.error("SignalR DashboardHub Connection Error: ", err));

        return () => {
            connection.stop();
        };
    }, [onMessage]);
}

