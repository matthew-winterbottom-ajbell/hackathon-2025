namespace hackathon_api.Services;

public class ConversationReader() : IConversationReader
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
        var conversation = new Conversation(newId);
        var content = await File.ReadAllLinesAsync($"Data/{id}.txt");
        _conversations.Add(newId, conversation);
        
        _ = Task.Run(() =>
        {
            foreach (var line in content)
            {
                conversation.AddLine(line);
                Thread.Sleep(80 * line.Length);
            }

            conversation.Finish();
        });

        return newId;
    }
}