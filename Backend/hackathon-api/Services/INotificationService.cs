namespace hackathon_api.Services;

public interface INotificationService
{
    public void SendNewMessage(string group, string message);
    
    public void SendNewConversation(IConversation conversation);
    
    public void FlagConversation(IConversation conversation);
}