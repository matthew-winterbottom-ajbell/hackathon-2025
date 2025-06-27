using Microsoft.AspNetCore.SignalR;

namespace hackathon_api.Services;

public class FlagHub : Hub
{
    public async Task NotifyFlagging(Conversation conversation)
    {
        await Clients.All.SendAsync("ReceiveMessage", new ConversationListing(
            conversation.Id,
            conversation.Customer,
            conversation.Agent,
            conversation.StartTime,
            conversation.AgentType,
            conversation.Flagged
        ));
    }
}