import type {BotChat} from "../types/chat.ts";

export const calls: BotChat[] = [{
        id: "chat_001",
        person: "Alex Johnson",
        duration: "00:04:32",
        flagged: false,
        agentType: "bot",
        sentences: [
            { from: "human", text: "Hi, I'm new to investing. Can you help me get started?" },
            { from: "bot", text: "Absolutely, Alex! Are you investing for retirement, a big purchase, or just to grow your wealth?" },
            { from: "human", text: "Mostly to grow my wealth. I’ve heard about stocks and ETFs—what’s the difference?" },
            { from: "bot", text: "Stocks are shares of individual companies. ETFs are baskets of investments, offering more diversification." },
            { from: "human", text: "Is it risky to start with stocks?" },
            { from: "bot", text: "Stocks can be volatile. ETFs are often preferred by beginners for their stability." }
        ]
    },
    {
        id: "chat_002",
        person: "Priya Desai",
        duration: "00:03:15",
        flagged: false,
        agentType: "bot",
        sentences: [
            { from: "human", text: "What kind of fees should I expect when using this platform?" },
            { from: "bot", text: "We charge a 0.25% annual management fee and no commission on trades." },
            { from: "human", text: "Are there any hidden charges?" },
            { from: "bot", text: "No hidden charges. We’re fully transparent. You can view a full breakdown in your account settings." }
        ]
    },
    {
        id: "chat_003",
        person: "Mark Evans",
        duration: "00:02:47",
        flagged: true,
        agentType: "bot",
        sentences: [
            { from: "human", text: "Why did my portfolio drop so much this week? This is ridiculous." },
            { from: "bot", text: "I understand your concern, Mark. Market fluctuations can be stressful. Would you like to review your portfolio’s risk level?" },
            { from: "human", text: "No, I want to know why no one warned me!" },
            { from: "bot", text: "We send alerts for major changes, but markets can shift quickly. I can connect you with a human advisor if you'd like." }
        ]
    },
    {
        id: "chat_004",
        person: "Liam Chen",
        duration: "00:05:01",
        flagged: false,
        agentType: "bot",
        sentences: [
            { from: "human", text: "Do you support crypto investments?" },
            { from: "bot", text: "Yes, we offer a curated list of cryptocurrencies like Bitcoin and Ethereum." },
            { from: "human", text: "Is it safe to invest in crypto here?" },
            { from: "bot", text: "We use secure wallets and follow regulatory guidelines, but crypto is inherently volatile." },
            { from: "human", text: "Can I set limits to avoid big losses?" },
            { from: "bot", text: "Absolutely. You can set stop-loss orders and portfolio risk thresholds." }
        ]
    },
    {
        id: "chat_005",
        person: "Susan Blake",
        duration: "00:03:58",
        flagged: false,
        agentType: "bot",
        sentences: [
            { from: "human", text: "I’m retiring soon. How do I withdraw my funds?" },
            { from: "bot", text: "You can schedule withdrawals monthly or as a lump sum. Would you like help setting that up?" },
            { from: "human", text: "Yes, please. Also, are there tax implications?" },
            { from: "bot", text: "Withdrawals may be taxable depending on your account type. We recommend speaking with a tax advisor." }
        ]
    }
];