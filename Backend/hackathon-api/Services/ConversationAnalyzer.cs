using System.Net.Http.Headers;
using System.Text.Json;

namespace hackathon_api.Services;

public class ConversationAnalyzer : IConversationAnalyzer
{
    private const string GenAIEndpoint = "https://genaiplatform.ajbpoc.co.uk";
    private HttpClient client = new HttpClient();

    public ConversationAnalyzer(IConfiguration configuration)
    {
        client.DefaultRequestHeaders.Add("Authorization", configuration["GenAI:ApiKey"]);
    }
    
    public async Task<bool> IsSuspicious(IConversation conversation)
    {
        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower };
        var content = string.Join('\n', conversation.Sentences);
        var data = new ChatCompletionRequest(
            Model: "gpt-4.1-mini",
            Messages: new List<ChatMessage>
            {
                new ChatMessage(
                    Role: "user",
                    Content: new List<Content>
                    {
                        new Content(Type: "text", Text: "You are a real-time fraud detection analyst. You review live customer service transcripts and flag potentially suspicious behavior.\\n\\nAt each step, analyze a small segment (1–2 lines) of the conversation. Evaluate whether anything suspicious is happening in that moment — such as:\\n- evasive answers,\\n- refusal to follow standard process,\\n- request to hide or change documentation,\\n- attempts to bribe or manipulate,\\n- signs of social engineering.\\n\\nRespond only with this JSON structure:\\n{\\n  \\\"suspicious\\\": true or false,\\n  \\\"reason\\\": \\\"<brief explanation, or 'None' if not suspicious>\\\"\\n}\\n\\nTranscript:\\n" + content)
                    }
                )
            }
        );
        var body = JsonSerializer.Serialize(data, jsonOptions);

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri($"{GenAIEndpoint}/v1/chat/completions"),
            Content = new StringContent(body, System.Text.Encoding.UTF8, "application/json"),
        };
        
        var response = await client.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"GenAI API request failed: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
        }
        
        var responseBody = await response.Content.ReadAsStringAsync();
        var results = JsonSerializer.Deserialize<GenAIResponse>(responseBody, jsonOptions);
        var rating = JsonSerializer.Deserialize<ConversationRating>(results?.Choices.FirstOrDefault()?.Message.Content, jsonOptions);

        return rating?.Suspicious ?? false;
    }
}

record ChatCompletionRequest(
    string Model,
    List<ChatMessage> Messages,
    int MaxTokens = 200,
    double Temperature = 0.1,
    bool Stream = false,
    bool RedactPii = false
);

record ChatMessage(
    string Role,
    List<Content> Content
);

record Content(
    string Type,
    string Text
);

record GenAIResponse(
    List<ResponseChoice> Choices
);

record ResponseChoice(
    string FinishReason,
    int Index,
    ResponseChatMessage Message
);

record ResponseChatMessage(
    string Role,
    string Content
);

record ConversationRating(bool Suspicious, string Reason);