namespace hackathon_api.Services;

public interface IConversationReader
{
    /// <summary>
    /// Retrieves a conversation for the given ID
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public IConversation? GetConversation(string id);

    /// <summary>
    /// Starts loading a conversation
    /// </summary>
    /// <param name="id"></param>
    public Task<string> LoadConversation(string id);
}