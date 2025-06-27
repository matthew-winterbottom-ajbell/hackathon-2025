namespace hackathon_api.Services;

public interface INotificationService
{
    public void SendToGroup(string group, string message);
}