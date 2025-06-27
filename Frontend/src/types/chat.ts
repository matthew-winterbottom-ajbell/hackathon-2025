import type {Sentence} from "./sentence.ts";

export interface BotChat {
    id: string,
    person: string;
    agent?: string; // optional, could be a bot or human, will we have a name for a bot?
    duration: string;
    sentences: Sentence[];
    agentType: "bot" | "human";
    flagged: boolean;
}