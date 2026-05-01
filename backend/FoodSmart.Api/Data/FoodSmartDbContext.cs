using FoodSmart.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodSmart.Api.Data;

public class FoodSmartDbContext : DbContext
{
    public FoodSmartDbContext(DbContextOptions<FoodSmartDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("products");
            entity.Property(p => p.Name).HasMaxLength(120).IsRequired();
            entity.Property(p => p.Category).HasMaxLength(60).IsRequired();
            entity.Property(p => p.Description).HasMaxLength(500);
            entity.Property(p => p.Price).HasPrecision(10, 2);
            entity.Property(p => p.Emoji).HasMaxLength(20);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("orders");
            entity.Property(o => o.CustomerName).HasMaxLength(120).IsRequired();
            entity.Property(o => o.CustomerPhone).HasMaxLength(30).IsRequired();
            entity.Property(o => o.Total).HasPrecision(10, 2);
            entity.HasMany(o => o.Items)
                .WithOne(i => i.Order)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.ToTable("order_items");
            entity.Property(i => i.UnitPrice).HasPrecision(10, 2);
            entity.HasOne(i => i.Product)
                .WithMany()
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Category = "burgers", Name = "Classic Smart", Description = "Blend 180g, cheddar, alface, tomate, picles e molho especial.", Price = 29.00m, Emoji = "🍔", IsActive = true },
            new Product { Id = 2, Category = "burgers", Name = "Smash Fire", Description = "Duplo 2x130g, cheddar defumado, jalapeño e molho chipotle.", Price = 39.00m, Emoji = "🔥", IsActive = true },
            new Product { Id = 3, Category = "sides", Name = "Fries Smart", Description = "Batata crocante com tempero da casa.", Price = 16.00m, Emoji = "🍟", IsActive = true },
            new Product { Id = 4, Category = "drinks", Name = "Smart Shake", Description = "Milkshake artesanal 450ml.", Price = 22.00m, Emoji = "🥤", IsActive = true }
        );
    }
}
