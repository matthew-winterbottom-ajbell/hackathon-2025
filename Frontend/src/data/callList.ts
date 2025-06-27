import type {Conversation} from "../types/conversation.ts";

export const conversations: Conversation[] = [
    {
        id: "1",
        customer: "John Doe",
        agent: "Jane Smith",
        agentType: "human",
        startTime: getRandomPastTime(),
        flagged: false,
        sentences: [
            { from: "human", text: "Hi, I’d like to understand how to diversify my portfolio." },
            { from: "bot", text: "Sure, diversification means spreading your investments across different assets to reduce risk." },
            { from: "human", text: "Got it. Can I do that automatically on your platform?" },
            { from: "bot", text: "Yes, we offer automated portfolio rebalancing based on your risk profile." },
            { from: "human", text: "What is a risk profile?" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
            { from: "bot", text: "A risk profile represents your personal appetite for risk (losing money)" },
        ]
    },
    {
        id: "2",
        customer: "Alice Johnson",
        agent: "Bob Brown",
        agentType: "human",
        startTime: getRandomPastTime(),
        flagged: true,
        sentences: [
            { from: "human", text: "I need to move a large amount of money quickly. Can you bypass the verification?" },
            { from: "bot", text: "I'm sorry, but all large transfers require identity verification for your security." },
            { from: "human", text: "No one will know. Just do it." },
            { from: "bot", text: "I’m unable to proceed without proper authorization. This call may be reviewed." }
        ]
    },
    {
        id: "3",
        customer: "Charlie White",
        agent: "Diana Green",
        agentType: "human",
        startTime: getRandomPastTime(),
        flagged: false,
        sentences: [
            { from: "human", text: "Can I invest in green energy funds through your platform?" },
            { from: "bot", text: "Yes, we offer several ESG and green energy ETFs. Would you like a list?" },
            { from: "human", text: "Yes, please send it to my email." }
        ]
    },
    {
        id: "4",
        customer: "Eve Black",
        agent: "Frank Blue",
        agentType: "human",
        startTime: getRandomPastTime(),
        flagged: false,
        sentences: [
            { from: "human", text: "I’m thinking of retiring early. Can I withdraw from my ISA without penalties?" },
            { from: "bot", text: "You can withdraw from a Stocks & Shares ISA anytime, but tax implications may apply depending on your situation." },
            { from: "human", text: "Thanks, that helps." }
        ]
    },
    {
        id: "5",
        customer: "Grace Yellow",
        agent: "Hank Purple",
        agentType: "human",
        startTime: getRandomPastTime(),
        flagged: true,
        sentences: [
            { from: "human", text: "I need to create multiple accounts under different names. Can you help?" },
            { from: "bot", text: "That request violates our terms of service. I cannot assist with that." },
            { from: "human", text: "It’s for a business reason. No one will find out." },
            { from: "bot", text: "I'm required to report suspicious activity. This call will be flagged." }
        ]
    }
];

// Utility function to get a Date object between 3 and 5 minutes ago
function getRandomPastTime() {
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * (5 - 3 + 1)) + 3; // 3 to 5 minutes
    const secondsAgo = Math.floor(Math.random() * 60); // 0 to 59 seconds
    const millisecondsAgo = Math.floor(Math.random() * 1000); // 0 to 999 ms

    return new Date(now.getTime() - (minutesAgo * 60 * 1000 + secondsAgo * 1000 + millisecondsAgo));
}

