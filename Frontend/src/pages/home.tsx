import { calls } from "../data/callList.ts";
import { useNavigate } from "react-router-dom";
import type { Call } from "../types/call.ts";

const Home = () =>{

    const navigate = useNavigate();

    const renderCallCard = (call: Call) => {

        return (
            <button
                type="button"
                onClick={() => navigate(`/call/${call.id}`)}
                className="flex flex-col w-auto h-auto space-y-2 border-4 border-white rounded-2xl px-3 py-10 bg-black shadow-md transition-transform duration-500 transform hover:scale-105"
                style={{ overflow: 'hidden' }}
            >
                <div className="font-semibold text-white">Argent: {call.agent}</div>
                <div className="text-gray-200">Caller: {call.caller}</div>
                <div className="text-gray-400">Duration: {call.duration}</div>
            </button>
        )
    }

    return (
        <div
            className="px-10 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto max-h-full"
        >
            {calls.map(renderCallCard)}
        </div>
    )
}

export default Home;