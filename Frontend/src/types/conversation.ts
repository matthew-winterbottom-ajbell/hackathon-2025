import type {Sentence} from "./sentence.ts";

export interface Conversation {
    id: string,
    customer: string;
    agent?: string; // optional, could be a bot or human, will we have a name for a bot?
    startTime: Date;
    sentences: Sentence[];
    agentType: "bot" | "human";
    flagged: boolean;
}