using hackathon_api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddSingleton<INotificationService, NotificationService>();
builder.Services.AddSingleton<IConversationReader, ConversationReader>();

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
    return conversationReader.GetConversations().Select(c => new ConversationListing(
        c.Id,
        c.Customer,
        c.Agent,
        c.StartTime,
        c.AgentType,
        c.Flagged
    )).ToList();
});

app.MapGet("/api/v1/conversations/{id}", (string id, IConversationReader conversationReader) =>
{
    var conversation = conversationReader.GetConversation(id);
    if (conversation == null) return Results.NotFound();

    return Results.Ok(new ConversationResponse(
        conversation.Id,
        conversation.Customer,
        conversation.Agent,
        conversation.StartTime,
        conversation.AgentType,
        conversation.Flagged,
        conversation.Sentences.ToList())
    );
});

app.MapHub<ConversationHub>("/api/v1/conversations/{id}/live")
    .WithDisplayName("Conversion SignalR Hub")
    .WithOpenApi();

app.Run();

record DebugCreateRequest(string FileId);
record DebugCreateResponse(string Id);

record ConversationListing(string Id, string Customer, string Agent, DateTime StartTime, string AgentType, bool Flagged);
record ConversationResponse(string Id, string Customer, string Agent, DateTime StartTime, string AgentType, bool Flagged, List<string> Sentences) :
    ConversationListing(Id, Customer, Agent, StartTime, AgentType, Flagged);