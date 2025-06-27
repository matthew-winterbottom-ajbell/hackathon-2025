using Microsoft.AspNetCore.SignalR;

namespace hackathon_api.Services;

public class NotificationService(
    IHubContext<ConversationHub> conversationHub,
    IHubContext<DashboardHub> dashboardHub) : INotificationService
{
    public void SendNewMessage(string group, string message)
    {
        conversationHub.Clients.Group(group).SendAsync("ReceiveMessage", message);
    }

    public void SendNewConversation(IConversation conversation)
    {
        dashboardHub.Clients.All.SendAsync("NewConversation", new ConversationListing(conversation));
    }

    public void FlagConversation(IConversation conversation)
    {
        dashboardHub.Clients.All.SendAsync("FlaggedConversation", new ConversationListing(conversation));
    }
}