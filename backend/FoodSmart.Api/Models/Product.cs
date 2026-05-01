namespace FoodSmart.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Emoji { get; set; } = "🍔";
    public bool IsActive { get; set; } = true;
}
