using Microsoft.AspNetCore.Mvc;

namespace FoodSmart.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { status = "online", project = "FOODSMART" });
    }
}
