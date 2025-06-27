namespace hackathon_api.Services;

public class Conversation : IConversation
{
    private readonly List<string> _lines;
    public IReadOnlyList<string> Lines { get; }
    
    private readonly List<IObserver<IReadOnlyList<string>>> _observers;

    public Conversation()
    {
        _lines = [];
        _observers = [];
        Lines = _lines.AsReadOnly();
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