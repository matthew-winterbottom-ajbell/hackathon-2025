import { useParams } from "react-router-dom";
import { calls } from "../data/callList.ts";

const Call = () => {
    const { id } = useParams();

    if (!id) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600 text-lg font-semibold">Call could not be found</div>
            </div>
        )
    }

    const call = calls.find(call => call.id === id);

    if (!call) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600 text-lg font-semibold">Call not found</div>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Call Details</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="mb-4 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="font-semibold text-slate-600">Call ID:</span>
                        <span className="text-slate-900">{call.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-slate-600">Caller:</span>
                        <span className="text-slate-900">{call.caller}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-slate-600">Agent:</span>
                        <span className="text-slate-900">{call.agent}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-slate-600">Duration:</span>
                        <span className="text-slate-900">{call.duration}</span>
                    </div>
                </div>
                {/* Add more details here if your Call type expands */}
                <div className="mt-6 text-center">
                    <button className=" text-white font-semibold px-6 py-2 rounded-lg shadow transition border-2 hover:ring-1 hover:ring-white hover:border-0 hover:bg-white ">
                        Return to Dashboard
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button className=" text-white font-semibold px-6 py-2 rounded-lg shadow transition border-2 hover:ring-1 hover:ring-white hover:border-0 hover:bg-white ">
                        End call
                    </button>
                    <button className=" text-white font-semibold px-6 py-2 rounded-lg shadow transition border-2 hover:ring-1 hover:ring-white hover:border-0 hover:bg-white ">
                        Listen-in on call
                    </button>
                    <button className=" text-white font-semibold px-6 py-2 rounded-lg shadow transition border-2 hover:ring-1 hover:ring-white hover:border-0 hover:bg-white ">
                        Take over call
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Call;