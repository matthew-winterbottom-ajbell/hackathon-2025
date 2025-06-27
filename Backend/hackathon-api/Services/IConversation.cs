namespace hackathon_api.Services;

public interface IConversation : IObservable<IReadOnlyList<string>>
{
    public string Id { get; }
    
    public string Customer { get; }
    
    public string Agent { get;  }
    
    /// <summary>
    /// Current duration of the conversation in seconds
    /// </summary>
    public DateTime StartTime { get; set; }
    
    public string AgentType { get; }
    
    public bool Flagged { get; set; }
    
    /// <summary>
    /// Retrieves the up-to-date transcript of an ongoing conversation
    /// </summary>
    /// <returns></returns>
    public IReadOnlyList<string> Sentences { get; }
    
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