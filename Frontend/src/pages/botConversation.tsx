import { useParams } from "react-router-dom";
import {botConversations} from "../data/botChatList.ts";
import {getTranspiredTimeInMinutes} from "../helpers/time.ts";
import Button from "../components/Button.tsx";
import InformationRow from "../components/InformationRow.tsx";

const BotConversation = () => {
    const { id } = useParams();

    console.log("BotConversation", id);

    if (!id) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600 text-lg font-semibold">Call could not be found</div>
            </div>
        )
    }

    const conversation = botConversations.find(c => c.id === id);

    if (!conversation) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600 text-lg font-semibold">Call not found</div>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Bot chat details</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="mb-4 flex flex-col gap-2">
                    <InformationRow keyString={"Call ID:"} value={conversation.id} />
                    <InformationRow keyString="Customer:" value={conversation.customer} />
                    <InformationRow keyString="Duration:" value={getTranspiredTimeInMinutes(conversation.startTime)} />
                </div>
                {/* Add more details here if your Call type expands */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button>
                        End call
                    </Button>
                    <Button>
                        Listen-in on call
                    </Button>
                    <Button>
                        Take over call
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BotConversation;