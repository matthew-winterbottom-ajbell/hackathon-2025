namespace hackathon_api.Services;

public class ConversationReader(INotificationService notificationService, IConversationAnalyzer conversationAnalyzer) : IConversationReader
{
    private readonly List<string> customers = ["Tom Jones", "Alice Smith", "Bob Brown"];
    private readonly List<string> agents = ["Bill Gates", "Steve Jobs", "Zuckerberg"];
    
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
        var custRand = Random.Shared.Next(0, customers.Count);
        var agentRand = Random.Shared.Next(0, agents.Count);
        
        var isHuman = Random.Shared.Next(0, 2) == 1;
        
        var newId = Guid.NewGuid().ToString();
        var conversation = new Conversation(newId, customers[custRand], isHuman ? agents[agentRand] : "AJBot",
            isHuman ? "human" : "bot");
        var content = await File.ReadAllLinesAsync($"Data/{id}.txt");
        _conversations.Add(newId, conversation);
        notificationService.SendNewConversation(conversation);
        
        _ = Task.Run(async () =>
        {
            foreach (var line in content)
            {
                conversation.AddLine(line);
                notificationService.SendNewMessage(newId, line);
                
                var startTime = DateTime.Now;

                var toFlag = await conversationAnalyzer.IsSuspicious(conversation);
                if (toFlag)
                {
                    conversation.Flagged = true;
                    notificationService.FlagConversation(conversation);
                }
                
                Thread.Sleep(2000);
            }

            conversation.Finish();
        });

        return newId;
    }
}