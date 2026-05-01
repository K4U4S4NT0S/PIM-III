# FOODSMART Full Project

Projeto com front-end premium + API C# ASP.NET Core.

## Rodar front-end
```bash
cd frontend
npm install
npm run dev
```

## Rodar API C#
```bash
cd backend/FoodSmart.Api
dotnet restore
dotnet run
```

A API sobe em `http://localhost:5077`.

## Integração com banco
A API está preparada para SQLite via Entity Framework Core. Em produção, use SQL Server ou PostgreSQL e coloque a connection string em variável de ambiente.
