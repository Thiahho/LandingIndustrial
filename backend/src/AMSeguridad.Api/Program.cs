using AMSeguridad.Api.Models;
using AMSeguridad.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddSingleton<IContentStore, JsonContentStore>();

var app = builder.Build();

app.UseCors();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapGet("/api/content", async (IContentStore store, CancellationToken cancellationToken) =>
{
    var content = await store.GetAsync(cancellationToken);
    return Results.Ok(content);
});

app.MapPut("/api/content", async (LandingContent content, IContentStore store, CancellationToken cancellationToken) =>
{
    var saved = await store.SaveAsync(content, cancellationToken);
    return Results.Ok(saved);
});

app.MapPost("/api/news", async (NewsItem news, IContentStore store, CancellationToken cancellationToken) =>
{
    var id = string.IsNullOrWhiteSpace(news.Id) ? Guid.NewGuid().ToString("N") : news.Id;
    var upserted = news with { Id = id };
    var content = await store.UpsertNewsAsync(upserted, cancellationToken);
    return Results.Ok(content.News);
});

app.MapPut("/api/news/{id}", async (string id, NewsItem news, IContentStore store, CancellationToken cancellationToken) =>
{
    var upserted = news with { Id = id };
    var content = await store.UpsertNewsAsync(upserted, cancellationToken);
    return Results.Ok(content.News);
});

app.MapDelete("/api/news/{id}", async (string id, IContentStore store, CancellationToken cancellationToken) =>
{
    var content = await store.DeleteNewsAsync(id, cancellationToken);
    return Results.Ok(content.News);
});

app.MapPost("/api/resources", async (ResourceItem resource, IContentStore store, CancellationToken cancellationToken) =>
{
    var id = string.IsNullOrWhiteSpace(resource.Id) ? Guid.NewGuid().ToString("N") : resource.Id;
    var upserted = resource with { Id = id };
    var content = await store.UpsertResourceAsync(upserted, cancellationToken);
    return Results.Ok(content.Contact.Resources);
});

app.MapPut("/api/resources/{id}", async (string id, ResourceItem resource, IContentStore store, CancellationToken cancellationToken) =>
{
    var upserted = resource with { Id = id };
    var content = await store.UpsertResourceAsync(upserted, cancellationToken);
    return Results.Ok(content.Contact.Resources);
});

app.MapDelete("/api/resources/{id}", async (string id, IContentStore store, CancellationToken cancellationToken) =>
{
    var content = await store.DeleteResourceAsync(id, cancellationToken);
    return Results.Ok(content.Contact.Resources);
});

app.Run();
