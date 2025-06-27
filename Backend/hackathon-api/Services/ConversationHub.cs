using Microsoft.AspNetCore.SignalR;

namespace hackathon_api.Services;

public class ConversationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var id = Context.GetHttpContext()?.Request.Path.Value?.Split('/')[^2];
        if (id != null)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, id);
        }
        
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var id = Context.GetHttpContext()?.Request.Path.Value?.Split('/').Last();
        if (id != null)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, id);
        }
    }
}