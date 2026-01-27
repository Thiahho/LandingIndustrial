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
}
