using System.Text.Json;
using AMSeguridad.Api.Models;

namespace AMSeguridad.Api.Services;

public interface IContentStore
{
    Task<LandingContent> GetAsync(CancellationToken cancellationToken);
    Task<LandingContent> SaveAsync(LandingContent content, CancellationToken cancellationToken);
    Task<LandingContent> UpsertNewsAsync(NewsItem news, CancellationToken cancellationToken);
    Task<LandingContent> DeleteNewsAsync(string id, CancellationToken cancellationToken);
    Task<LandingContent> UpsertResourceAsync(ResourceItem resource, CancellationToken cancellationToken);
    Task<LandingContent> DeleteResourceAsync(string id, CancellationToken cancellationToken);
}

public sealed class JsonContentStore : IContentStore
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true
    };

    private readonly string _filePath;
    private readonly SemaphoreSlim _mutex = new(1, 1);

    public JsonContentStore(IWebHostEnvironment environment, ILogger<JsonContentStore> logger)
    {
        var repoRoot = Path.GetFullPath(Path.Combine(environment.ContentRootPath, "..", "..", ".."));
        var dataDirectory = Path.Combine(repoRoot, "backend", "data");
        Directory.CreateDirectory(dataDirectory);
        _filePath = Path.Combine(dataDirectory, "content.json");

        if (!File.Exists(_filePath))
        {
            logger.LogWarning("No se encontró {FilePath}. Se creará con un contenido inicial vacío.", _filePath);
            var initial = new LandingContent();
            File.WriteAllText(_filePath, JsonSerializer.Serialize(initial, JsonOptions));
        }
    }

    public async Task<LandingContent> GetAsync(CancellationToken cancellationToken)
    {
        await _mutex.WaitAsync(cancellationToken);
        try
        {
            await using var stream = File.OpenRead(_filePath);
            var content = await JsonSerializer.DeserializeAsync<LandingContent>(stream, JsonOptions, cancellationToken);
            return content ?? new LandingContent();
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<LandingContent> SaveAsync(LandingContent content, CancellationToken cancellationToken)
    {
        await _mutex.WaitAsync(cancellationToken);
        try
        {
            await using var stream = File.Create(_filePath);
            await JsonSerializer.SerializeAsync(stream, content, JsonOptions, cancellationToken);
            return content;
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<LandingContent> UpsertNewsAsync(NewsItem news, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var existingIndex = content.News.FindIndex(item => item.Id.Equals(news.Id, StringComparison.OrdinalIgnoreCase));
        var updatedNews = content.News.ToList();

        if (existingIndex >= 0)
        {
            updatedNews[existingIndex] = news;
        }
        else
        {
            updatedNews.Insert(0, news);
        }

        var updatedContent = content with
        {
            News = updatedNews
        };

        return await SaveAsync(updatedContent, cancellationToken);
    }

    public async Task<LandingContent> DeleteNewsAsync(string id, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var updatedContent = content with
        {
            News = content.News.Where(item => !item.Id.Equals(id, StringComparison.OrdinalIgnoreCase)).ToList()
        };

        return await SaveAsync(updatedContent, cancellationToken);
    }

    public async Task<LandingContent> UpsertResourceAsync(ResourceItem resource, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var resources = content.Contact.Resources.ToList();
        var existingIndex = resources.FindIndex(item => item.Id.Equals(resource.Id, StringComparison.OrdinalIgnoreCase));

        if (existingIndex >= 0)
        {
            resources[existingIndex] = resource;
        }
        else
        {
            resources.Insert(0, resource);
        }

        var updatedContent = content with
        {
            Contact = content.Contact with
            {
                Resources = resources
            }
        };

        return await SaveAsync(updatedContent, cancellationToken);
    }

    public async Task<LandingContent> DeleteResourceAsync(string id, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var updatedContent = content with
        {
            Contact = content.Contact with
            {
                Resources = content.Contact.Resources.Where(item => !item.Id.Equals(id, StringComparison.OrdinalIgnoreCase)).ToList()
            }
        };

        return await SaveAsync(updatedContent, cancellationToken);
    }
}
