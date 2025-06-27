namespace hackathon_api.Services;

public class Conversation : IConversation
{
    public string Id { get; }
    public string Customer { get; }
    public string Agent { get; }
    public DateTime StartTime { get; set; } = DateTime.Now;
    public string AgentType { get; }
    public bool Flagged { get; set; }

    private readonly List<string> _lines;
    public IReadOnlyList<string> Sentences { get; }
    
    private readonly List<IObserver<IReadOnlyList<string>>> _observers;

    public Conversation(string id, string customer, string agent, string agentType)
    {
        Id = id;
        Customer = customer;
        Agent = agent;
        AgentType = agentType;
        _lines = [];
        _observers = [];
        Sentences = _lines.AsReadOnly();
    }
    
    public IDisposable Subscribe(IObserver<IReadOnlyList<string>> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void AddLine(string line)
    {
        _lines.Add(line);
        foreach (var observer in _observers) observer.OnNext(_lines);
    }

    public void Finish()
    {
        foreach (var observer in _observers) observer.OnCompleted();
    }

    private class Unsubscriber(
        List<IObserver<IReadOnlyList<string>>> observers,
        IObserver<IReadOnlyList<string>>? observer) : IDisposable
    {
        public void Dispose()
        {
            if (observer != null && observers.Contains(observer)) observers.Remove(observer);
        }
    }
}