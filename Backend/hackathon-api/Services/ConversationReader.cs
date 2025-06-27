namespace hackathon_api.Services;

public class ConversationReader() : IConversationReader
{
    private readonly Dictionary<string, Conversation> _conversations = new();

    public IConversation? GetConversation(string id)
    {
        return _conversations.GetValueOrDefault(id);
    }

    public async Task<string> LoadConversation(string id)
    {
        var conversation = new Conversation();
        var content = await File.ReadAllLinesAsync($"Data/{id}.txt");
        var newId = Guid.NewGuid().ToString();
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