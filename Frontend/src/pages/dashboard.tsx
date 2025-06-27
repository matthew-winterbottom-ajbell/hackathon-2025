import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import type {ConversationType, ConversationResponse} from "../types/conversation.ts";
import {getTranspiredTimeInMinutes} from "../helpers/time.ts";
import {useNewConversation} from "../hooks/useNewConversation.tsx";
import {useConversationFlagged} from "../hooks/useConversationFlagged.tsx";

const Dashboard = () => {
    const navigate = useNavigate();

    const [conversations, setConversations] = useState<ConversationType[]>([]);

    // Fetch current dashboard items on mount
    useEffect(() => {
        fetch("http://localhost:5044/api/v1/conversations")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch dashboard data");
                return res.json();
            })
            .then((data: ConversationResponse[]) => {
                setConversations(
                    data.map(item => ({
                        ...item,
                        startTime: new Date(item.startTime)
                    }))
                );
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useNewConversation((message: ConversationResponse) => {
        if (!message) return;

        setConversations(prev => {
            const conversation: ConversationType = {...message, startTime: new Date(message.startTime)};

            const existing = prev.find(c => c.id === conversation.id);

            if (existing) {
                return prev.map(conversation => conversation.id === message.id ? conversation : conversation);
            }

            return [...prev, conversation];
        });
    });

    useConversationFlagged((message: ConversationResponse) => {
        if (!message) {
            return;
        }

        setConversations(prev => {
            return prev.map(conversation => conversation.id === message.id ? {
                ...message,
                startTime: new Date(message.startTime)
            } : conversation);
        })
    });

    const onClick = (conversation: ConversationType) => () => {
        if (conversation.agentType === "bot") {
            navigate(`/chat/${conversation.id}`);
            return;
        }
        navigate(`/call/${conversation.id}`);
    };

    const renderCallCard = (conversation: ConversationType) => (
        <button
            type="button"
            onClick={onClick(conversation)}
            className={`hover: cursor-pointer flex flex-col w-auto h-50 space-y-2 border-2 rounded-2xl px-2 py-5 bg-gray-200 shadow-md transition-transform duration-200 transform hover:scale-105 ${
                conversation.flagged ? "border-red-500" : "border-white"
            }`}
            style={{overflow: 'hidden'}}
        >
            {conversation.flagged && (
                <div className="flex flex-col items-center mb-2">
                    <span className="text-red-600 font-bold mr-2">⚠️ Suspicious</span>
                    <span className="text-sm text-red-400">Click to review</span>
                </div>
            )}
            {conversation.agent && (
                <div className="font-semibold text-gray-700">Agent: {conversation.agent}</div>
            )}
            <div className=" text-gray-700">Caller: {conversation.customer}</div>
            <div className="text-gray-700">Duration: {getTranspiredTimeInMinutes(conversation.startTime)}</div>
        </button>
    );

    return (
        <div className="flex h-[80vh]">
            <div className="flex-1 flex flex-col border-r border-gray-300">
                <h1 className="text-xl mb-4 mt-8 text-center">Agent calls</h1>
                <div className="flex-1 flex flex-col items-center justify-start">
                    <div className="w-full flex justify-center">
                        <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]">
                            {conversations.filter(x => x.agentType === "human").map(renderCallCard)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <h1 className="text-xl mb-4 mt-8 text-center">Chatbot conversations</h1>
                <div className="flex-1 flex flex-col items-center justify-start">
                    <div className="w-full flex justify-center">
                        <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]">
                            {conversations.filter(x => x.agentType === "bot").map(renderCallCard)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;