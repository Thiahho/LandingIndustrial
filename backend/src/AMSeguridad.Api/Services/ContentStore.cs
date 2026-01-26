using System.Text.Json;
using AMSeguridad.Api.DTOs;

namespace AMSeguridad.Api.Services;

public interface IContentStore
{
    Task<LandingContentDto> GetAsync(CancellationToken cancellationToken);
    Task<LandingContentDto> SaveAsync(LandingContentDto content, CancellationToken cancellationToken);
    Task<LandingContentDto> UpsertNewsAsync(NewsItemDto news, CancellationToken cancellationToken);
    Task<LandingContentDto> DeleteNewsAsync(int id, CancellationToken cancellationToken);
    Task<LandingContentDto> UpsertResourceAsync(ResourceItemDto resource, CancellationToken cancellationToken);
    Task<LandingContentDto> DeleteResourceAsync(int id, CancellationToken cancellationToken);
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
            var initial = CreateEmptyContent();
            File.WriteAllText(_filePath, JsonSerializer.Serialize(initial, JsonOptions));
        }
    }

    public async Task<LandingContentDto> GetAsync(CancellationToken cancellationToken)
    {
        await _mutex.WaitAsync(cancellationToken);
        try
        {
            await using var stream = File.OpenRead(_filePath);
            var content = await JsonSerializer.DeserializeAsync<LandingContentDto>(stream, JsonOptions, cancellationToken);
            return content ?? CreateEmptyContent();
        }
        finally
        {
            _mutex.Release();
        }
    }

    public async Task<LandingContentDto> SaveAsync(LandingContentDto content, CancellationToken cancellationToken)
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

    public async Task<LandingContentDto> UpsertNewsAsync(NewsItemDto news, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var existingIndex = content.News.FindIndex(item => item.Id == news.Id);
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

    public async Task<LandingContentDto> DeleteNewsAsync(int id, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var updatedContent = content with
        {
            News = content.News.Where(item => item.Id != id).ToList()
        };

        return await SaveAsync(updatedContent, cancellationToken);
    }

    public async Task<LandingContentDto> UpsertResourceAsync(ResourceItemDto resource, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var resources = content.Contact.Resources.ToList();
        var existingIndex = resources.FindIndex(item => item.Id == resource.Id);

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

    public async Task<LandingContentDto> DeleteResourceAsync(int id, CancellationToken cancellationToken)
    {
        var content = await GetAsync(cancellationToken);
        var updatedContent = content with
        {
            Contact = content.Contact with
            {
                Resources = content.Contact.Resources.Where(item => item.Id != id).ToList()
            }
        };

        return await SaveAsync(updatedContent, cancellationToken);
    }

    private static LandingContentDto CreateEmptyContent()
    {
        return new LandingContentDto(
            new HeroDto(
                string.Empty,
                string.Empty,
                string.Empty,
                string.Empty,
                string.Empty,
                string.Empty,
                string.Empty,
                []
            ),
            new GuidanceDto(
                string.Empty,
                string.Empty,
                string.Empty,
                []
            ),
            [],
            [],
            [],
            [],
            [],
            [],
            new ContactDto(
                string.Empty,
                string.Empty,
                string.Empty,
                string.Empty,
                string.Empty,
                [],
                []
            ),
            new JobsDto(
                string.Empty,
                string.Empty,
                string.Empty,
                []
            )
        );
    }
}
