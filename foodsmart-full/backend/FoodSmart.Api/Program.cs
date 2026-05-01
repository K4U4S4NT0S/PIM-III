using FoodSmart.Api.Data;
using FoodSmart.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<FoodSmartDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=foodsmart.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontEnd", policy => policy
        .WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("FrontEnd");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FoodSmartDbContext>();
    db.Database.EnsureCreated();
}

app.MapGet("/api/health", () => Results.Ok(new { status = "online", project = "FOODSMART" }));

app.MapGet("/api/products", async (FoodSmartDbContext db) =>
    await db.Products.Where(p => p.IsActive).OrderBy(p => p.Category).ThenBy(p => p.Name).ToListAsync());

app.MapPost("/api/products", async (FoodSmartDbContext db, Product product) =>
{
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/api/products/{product.Id}", product);
});

app.MapPut("/api/products/{id:int}", async (int id, Product input, FoodSmartDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();
    product.Category = input.Category;
    product.Name = input.Name;
    product.Description = input.Description;
    product.Price = input.Price;
    product.Emoji = input.Emoji;
    product.IsActive = input.IsActive;
    await db.SaveChangesAsync();
    return Results.Ok(product);
});

app.MapDelete("/api/products/{id:int}", async (int id, FoodSmartDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();
    product.IsActive = false;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapPost("/api/orders", async (FoodSmartDbContext db, Order order) =>
{
    order.Total = order.Items.Sum(i => i.UnitPrice * i.Quantity);
    db.Orders.Add(order);
    await db.SaveChangesAsync();
    return Results.Created($"/api/orders/{order.Id}", order);
});

app.Run("http://localhost:5077");
