namespace hackathon_api.Services;

public class ConversationReader(INotificationService notificationService) : IConversationReader
{
    private readonly Dictionary<string, Conversation> _conversations = new();

    public IConversation? GetConversation(string id)
    {
        return _conversations.GetValueOrDefault(id);
    }

    public List<IConversation> GetConversations()
    {
        return _conversations.Values.ToList<IConversation>();
    }

    public async Task<string> LoadConversation(string id)
    {
        var newId = Guid.NewGuid().ToString();
        var conversation = new Conversation(newId, "customer", "agent", "human");
        var content = await File.ReadAllLinesAsync($"Data/{id}.txt");
        _conversations.Add(newId, conversation);
        notificationService.SendNewConversation(conversation);
        
        _ = Task.Run(() =>
        {
            foreach (var line in content)
            {
                conversation.AddLine(line);
                notificationService.SendNewMessage(newId, line);
                
                DateTime startTime = DateTime.Now;

                var toFlag = Random.Shared.NextDouble() < 0.1;
                if (toFlag)
                {
                    conversation.Flagged = true;
                    notificationService.FlagConversation(conversation);
                    break;
                }
                
                TimeSpan timePassed = startTime - DateTime.Now;
                var waitTime = (80 * line.Length) - timePassed.TotalMilliseconds;
                
                if (waitTime > 0) Thread.Sleep((int)waitTime);
            }

            conversation.Finish();
        });

        return newId;
    }
}