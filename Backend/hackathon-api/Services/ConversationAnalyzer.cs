namespace hackathon_api.Services;

public class ConversationAnalyzer : IConversationAnalyzer
{
    public async Task<bool> IsSuspicious(IConversation conversation)
    {
        // Placeholder for analyzing using the GenAI API
        return Random.Shared.NextDouble() < 0.1;
    }
}