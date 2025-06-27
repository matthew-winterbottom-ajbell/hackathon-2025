import {conversations} from "../data/callList.ts";
import {useNavigate} from "react-router-dom";
import type {Conversation} from "../types/conversation.ts";
import {botConversations} from "../data/botChatList.ts";
import {getTranspiredTimeInMinutes} from "../helpers/time.ts";

const Home = () => {

    const navigate = useNavigate();

    const onClick = (conversation: Conversation) => () => {
        if (conversation.agentType === "bot") {
            navigate(`/chat/${conversation.id}`);
            return;
        }

        navigate(`/call/${conversation.id}`);
    }

    const renderCallCard = (conversation: Conversation) => {
        return (
            <button
                type="button"
                onClick={onClick(conversation)}
                className="hover: cursor-pointer flex flex-col w-auto h-50 space-y-2 border-2 border-white rounded-2xl px-2 py-10 bg-gray-200 shadow-md transition-transform duration-200 transform hover:scale-105"
                style={{overflow: 'hidden'}}
            >
                {conversation.agent && (
                    <div className="font-semibold text-gray-700">Agent: {conversation.agent}</div>
                )}
                <div className=" text-gray-700">Caller: {conversation.customer}</div>
                <div className="text-gray-700">Duration: {getTranspiredTimeInMinutes(conversation.startTime)}</div>
            </button>
        )
    }

    return (
        <div className="flex h-[80vh]">
            <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-300">
                <h1 className="text-xl mb-4">Agent calls</h1>
                <div className="w-full flex justify-center">
                    <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]">
                        {conversations.map(renderCallCard)}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-xl mb-4">Chatbot conversations</h1>
                <div className="w-full flex justify-center">
                    <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]">
                        {botConversations.map(renderCallCard)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;