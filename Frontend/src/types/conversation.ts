export interface ConversationType {
    id: string,
    customer: string;
    agent?: string; // optional, could be a bot or human, will we have a name for a bot?
    startTime: Date;
    sentences?: string[];
    agentType: "bot" | "human";
    flagged: boolean;
}

export interface ConversationResponse {
    id: string,
    customer: string;
    agent?: string; // optional, could be a bot or human, will we have a name for a bot?
    startTime: string;
    sentences?: string[];
    agentType: "bot" | "human";
    flagged: boolean;
}