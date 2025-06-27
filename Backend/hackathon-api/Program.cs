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
    return conversationReader.GetConversations().Select(c => new ConversationListing(c.Id)).ToList();
});

app.MapGet("/api/v1/conversations/{id}", (string id, IConversationReader conversationReader) =>
{
    var conversation = conversationReader.GetConversation(id);
    return conversation != null
        ? Results.Ok(new ConversationResponse(string.Join('\n', conversation.Lines)))
        : Results.NotFound();
});

app.MapHub<ConversationHub>("/api/v1/conversations/{id}/live")
    .WithDisplayName("Conversion SignalR Hub")
    .WithOpenApi();

app.Run();

record ConversationListing(string Id);

record DebugCreateRequest(string FileId);
record DebugCreateResponse(string Id);
record ConversationResponse(string Content);