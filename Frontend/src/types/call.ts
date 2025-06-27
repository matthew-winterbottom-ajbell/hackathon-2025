import type { Sentence } from "./sentence.ts";

export interface Call {
    id: string,
    caller: string,
    agent?: string, // Optional, could be a bot or human, will we have a name for a bot?
    duration: string,
    sentences: Sentence[]
    agentType: "bot" | "human",
    flagged: boolean,
}