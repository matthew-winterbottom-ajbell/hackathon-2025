import {useParams} from "react-router-dom";
import {getTranspiredTimeInMinutes} from "../helpers/time.ts";
import Button from "../components/Button.tsx";
import InformationRow from "../components/InformationRow.tsx";
import {useState, useEffect, useRef} from "react";
import {useConversationHub} from "../hooks/useConversationHub.tsx";
import type {ConversationType} from "../types/conversation.ts";

// Skeleton loader component
const SkeletonSentence = () => (
    <div className="animate-pulse flex space-x-4 mb-2">
        <div className="rounded bg-gray-300 h-4 w-full"></div>
    </div>
);

const Conversation = () => {
    const {id} = useParams();

    const [conversation, setConversation] = useState<ConversationType>();
    const [liveSentences, setLiveSentences] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const lastMessageTimeRef = useRef<number | null>(null);
    const loadingTimeoutRef = useRef<number | null>(null);
    const stopLoadingTimeoutRef = useRef<number | null>(null);

    // For ticking duration
    const [, setTick] = useState(0);

    // Fetch conversation data from API
    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:5044/api/v1/conversations/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch conversation");
                return res.json();
            })
            .then(data => setConversation({
                ...data,
                startTime: new Date(data.startTime),
            }))
            .catch(err => {
                console.error(err);
                setConversation(undefined);
            });
    }, [id]);

    // Skeleton loading logic
    useEffect(() => {
        setLoading(true);
        lastMessageTimeRef.current = Date.now();
        stopLoadingTimeoutRef.current = setTimeout(() => {
            setLoading(false);
        }, 10000);

        return () => {
            if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
            if (stopLoadingTimeoutRef.current) clearTimeout(stopLoadingTimeoutRef.current);
        };
    }, [id]);

    useConversationHub(id, (message: string) => {
        if (message) {
            setLiveSentences(prev => [...prev, message]);
            setLoading(false);

            if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
            if (stopLoadingTimeoutRef.current) clearTimeout(stopLoadingTimeoutRef.current);

            lastMessageTimeRef.current = Date.now();

            loadingTimeoutRef.current = setTimeout(() => {
                setLoading(true);
                stopLoadingTimeoutRef.current = setTimeout(() => {
                    setLoading(false);
                }, 10000);
            }, 1000);
        }
    });

    // Ticking effect for duration
    useEffect(() => {
        if (!conversation?.startTime) return;

        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);

    }, [conversation?.startTime]);

    if (!id) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600 text-lg font-semibold">Call could not be found</div>
            </div>
        )
    }

    if (!conversation) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600 text-lg font-semibold">Call not found</div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Agent call details</h1>
            <div className="flex flex-row space-x-5">
                <div
                    className={`bg-slate-100 p-8 rounded-2xl shadow-lg border self-start w-80 flex-shrink-0 relative ${
                        conversation.flagged ? "border-red-500" : "border-slate-100"
                    }`}
                >
                    {conversation.flagged && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center bg-red-500 text-white px-4 py-1 rounded-full shadow font-semibold text-sm z-10">
                            <span className="mr-2">⚠️</span> Flagged
                        </div>
                    )}
                    <div className="mb-4 flex flex-col gap-2">
                        <InformationRow keyString={"Call ID:"} value={conversation.id}/>
                        <InformationRow keyString="Customer:" value={conversation.customer}/>
                        <InformationRow keyString="Agent:" value={conversation.agent ?? ""}/>
                        <InformationRow
                            keyString="Duration:"
                            value={getTranspiredTimeInMinutes(conversation.startTime)}
                        />
                    </div>
                    {/* Add more details here if your Call type expands */}
                    <div className="flex flex-col gap-4 justify-center mt-8">
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
                <div>
                    <div
                        className="bg-slate-100 p-8 rounded-2xl shadow-lg border border-slate-100 overflow-y-auto max-h-[30rem]">
                        <div className="mb-4 flex flex-col gap-2">
                            {conversation.sentences?.map(sentence => (
                                    <div className="text-gray-700">{sentence}</div>
                                )
                            )}
                            {liveSentences.map(sentence => (
                                <div className="text-gray-700">{sentence}</div>
                            ))}
                            {loading && (
                                <>
                                    <SkeletonSentence />
                                    <SkeletonSentence />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation;

