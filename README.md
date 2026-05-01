# FOODSMART — Projeto Full Stack

Projeto reestruturado com **frontend Vite** e **API C# ASP.NET Core** integrada ao **MySQL**.

## Estrutura

```txt
foodsmart-reestruturado/
├── backend/
│   └── FoodSmart.Api/
│       ├── Controllers/
│       ├── Data/
│       ├── Models/
│       ├── Program.cs
│       ├── appsettings.json
│       └── FoodSmart.Api.csproj
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   └── package.json
├── .env.example
├── .gitignore
├── foodsmart-full.sln
└── README.md
```

## 1. Configurar banco MySQL

Crie o banco no MySQL Workbench:

```sql
CREATE DATABASE foodsmart;
```

Depois ajuste a senha no arquivo:

```txt
backend/FoodSmart.Api/appsettings.json
```

```json
"DefaultConnection": "server=localhost;port=3306;database=foodsmart;user=root;password=SUA_SENHA;"
```

## 2. Rodar a API

```bash
cd backend/FoodSmart.Api
dotnet restore
dotnet run
```

API local:

```txt
http://localhost:5077/api
```

Teste:

```txt
http://localhost:5077/api/health
http://localhost:5077/api/products
```

## 3. Rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend local:

```txt
http://localhost:5173
```

## Observação

A estrutura foi limpa para remover arquivos desnecessários como `.git`, `bin`, `obj`, duplicações de projeto e pastas antigas soltas.
