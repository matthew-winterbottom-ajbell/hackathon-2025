namespace hackathon_api.Services;

public interface IConversation : IObservable<IReadOnlyList<string>>
{
    /// <summary>
    /// Retrieves the up-to-date transcript of an ongoing conversation
    /// </summary>
    /// <returns></returns>
    public IReadOnlyList<string> Lines { get; }
    
    /// <summary>
    /// Adds a new line to the conversation
    /// </summary>
    /// <param name="line"></param>
    /// <returns></returns>
    public void AddLine(string line);

    /// <summary>
    /// Marks the conversation as complete
    /// </summary>
    public void Finish();
}