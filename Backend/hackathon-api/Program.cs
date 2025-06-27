using hackathon_api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddSingleton<INotificationService, NotificationService>();
builder.Services.AddSingleton<IConversationReader, ConversationReader>();
builder.Services.AddTransient<IConversationAnalyzer, ConversationAnalyzer>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapPost("/api/v1/conversations/debugcreate", async (DebugCreateRequest request, IConversationReader conversationReader) =>
{
    var newId = await conversationReader.LoadConversation(request.FileId);
    return new DebugCreateResponse(newId);
});

app.MapGet("/api/v1/conversations", (IConversationReader conversationReader) =>
{
    return conversationReader.GetConversations().Select(c => new ConversationListing(c)).ToList();
});

app.MapGet("/api/v1/conversations/{id}", (string id, IConversationReader conversationReader) =>
{
    var conversation = conversationReader.GetConversation(id);
    if (conversation == null) return Results.NotFound();

    return Results.Ok(new ConversationResponse(conversation));
});

app.MapHub<ConversationHub>("/api/v1/conversations/{id}/live");
app.MapHub<DashboardHub>("/api/v1/dashboard");

app.Run();

record DebugCreateRequest(string FileId);
record DebugCreateResponse(string Id);

record ConversationListing(string Id, string Customer, string Agent, DateTime StartTime, string AgentType, bool Flagged)
{
    public ConversationListing(IConversation c) : this(c.Id, c.Customer, c.Agent, c.StartTime, c.AgentType, c.Flagged) {}
}
record ConversationResponse(string Id, string Customer, string Agent, DateTime StartTime, string AgentType, bool Flagged, List<string> Sentences) :
    ConversationListing(Id, Customer, Agent, StartTime, AgentType, Flagged)
{
    public ConversationResponse(IConversation c) : this(c.Id, c.Customer, c.Agent, c.StartTime, c.AgentType, c.Flagged, c.Sentences.ToList()) {}
}