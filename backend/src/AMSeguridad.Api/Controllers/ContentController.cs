using AMSeguridad.Api.DTOs;
using AMSeguridad.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AMSeguridad.Api.Controllers;

[ApiController]
[Route("api/content")]
public sealed class ContentController : ControllerBase
{
    private readonly ILandingContentService _service;

    public ContentController(ILandingContentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<LandingContentDto>> Get(CancellationToken cancellationToken)
    {
        var content = await _service.GetAsync(cancellationToken);
        return Ok(content);
    }

    [HttpPut]
    public async Task<ActionResult<LandingContentDto>> Update([FromBody] LandingContentDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            return BadRequest(new { message = "Error de validación", errors });
        }

        var actor = Request.Headers["X-User"].ToString();
        if (string.IsNullOrWhiteSpace(actor))
        {
            actor = "panel";
        }
        var content = await _service.UpdateAsync(dto, actor, cancellationToken);
        return Ok(content);
    }

    private string GetActor() => string.IsNullOrWhiteSpace(Request.Headers["X-User"].ToString()) ? "panel" : Request.Headers["X-User"].ToString();

    [HttpPut("hero")]
    public async Task<ActionResult<HeroDto>> UpdateHero([FromBody] HeroUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateHeroAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("guidance")]
    public async Task<ActionResult<GuidanceDto>> UpdateGuidance([FromBody] GuidanceUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateGuidanceAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("services")]
    public async Task<ActionResult<List<ServiceItemDto>>> UpdateServices([FromBody] ServicesUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateServicesAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("solutions")]
    public async Task<ActionResult<List<SolutionItemDto>>> UpdateSolutions([FromBody] SolutionsUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateSolutionsAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("technology")]
    public async Task<ActionResult<List<TechnologyItemDto>>> UpdateTechnology([FromBody] TechnologyUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateTechnologyAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("products")]
    public async Task<ActionResult<List<ProductItemDto>>> UpdateProducts([FromBody] ProductsUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateProductsAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("company")]
    public async Task<ActionResult<List<CompanyMetricDto>>> UpdateCompany([FromBody] CompanyUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateCompanyAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("news")]
    public async Task<ActionResult<List<NewsItemDto>>> UpdateNews([FromBody] NewsUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateNewsAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("contact")]
    public async Task<ActionResult<ContactDto>> UpdateContact([FromBody] ContactUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateContactAsync(dto, GetActor(), ct);
        return Ok(result);
    }

    [HttpPut("jobs")]
    public async Task<ActionResult<JobsDto>> UpdateJobs([FromBody] JobsUpdateDto dto, CancellationToken ct)
    {
        var result = await _service.UpdateJobsAsync(dto, GetActor(), ct);
        return Ok(result);
    }
}
