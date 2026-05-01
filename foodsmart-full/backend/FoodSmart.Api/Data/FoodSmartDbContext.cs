using FoodSmart.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodSmart.Api.Data;

public class FoodSmartDbContext(DbContextOptions<FoodSmartDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Category = "burgers", Name = "Classic Smart", Description = "Blend 180g, cheddar, alface, tomate, picles e molho especial.", Price = 29, Emoji = "🍔" },
            new Product { Id = 2, Category = "burgers", Name = "Smash Fire", Description = "Duplo 2x130g, cheddar defumado, jalapeño e molho chipotle.", Price = 39, Emoji = "🔥" },
            new Product { Id = 3, Category = "sides", Name = "Fries Smart", Description = "Batata crocante com tempero da casa.", Price = 16, Emoji = "🍟" },
            new Product { Id = 4, Category = "drinks", Name = "Smart Shake", Description = "Milkshake artesanal 450ml.", Price = 22, Emoji = "🧃" }
        );
    }
}
