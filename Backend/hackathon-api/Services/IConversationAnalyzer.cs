namespace hackathon_api.Services;

public interface IConversationAnalyzer
{
    public Task<bool> IsSuspicious(IConversation conversation);
}