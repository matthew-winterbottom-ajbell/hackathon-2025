using Microsoft.AspNetCore.SignalR;

namespace hackathon_api.Services;

public class NotificationService(IHubContext<ConversationHub> hubContext) : INotificationService
{
    public void SendToGroup(string group, string message)
    {
        hubContext.Clients.Group(group).SendAsync("ReceiveMessage", message);
    }
}