# PIM-III
PIM_III_Projeto Integrado Multidisciplinar_UNIP

<h1 align="center">🍔 FOODSMART</h1>

<p align="center">
  Sistema Web para Hamburgueria • PIM III - UNIP
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-orange"/>
  <img src="https://img.shields.io/badge/C%23-.NET%208-blue"/>
  <img src="https://img.shields.io/badge/Backend-ASP.NET%20Core-blueviolet"/>
  <img src="https://img.shields.io/badge/Frontend-JavaScript-yellow"/>
  <img src="https://img.shields.io/badge/HTML-5-orange"/>
  <img src="https://img.shields.io/badge/CSS-3-blue"/>
  <img src="https://img.shields.io/badge/Database-MySQL-blue"/>
  <img src="https://img.shields.io/badge/API-REST-green"/>
  <img src="https://img.shields.io/badge/ORM-Entity%20Framework-purple"/>
</p>

---

## 🚀 Sobre o Projeto

O *FOODSMART* é um sistema web desenvolvido como parte do *PIM III (Projeto Integrado Multidisciplinar)* da UNIP.

A proposta é simular uma *hamburgueria digital completa, permitindo que usuários visualizem produtos, adicionem ao carrinho e realizem pedidos, enquanto o sistema gerencia dados via **API em C#* e banco de dados.
---

## 👥 Integrantes

- 👨‍💻 **Kauã Santos da Silva**
- 👨‍💻 **Igor**
- 👨‍💻 **Vitor**

---

## 🚀 Tecnologias Utilizadas

- ⚙️ Backend: C# / .NET 8 (ASP.NET Core API)
- 🎨 Frontend: HTML, CSS, JavaScript
- 🗄️ Banco de Dados: MySQL
- 🔗 Integração: API REST

---

## 📁 Estrutura do Projeto

```bash
foodsmart/
├── backend/     # API em .NET
├── frontend/    # Interface web
└── README.md

```
---

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

- [.NET SDK 8](https://dotnet.microsoft.com/)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- MySQL Workbench (opcional)
- VS Code (recomendado)

---

## 🗄️ Configuração do Banco de Dados

1. Abra o MySQL Workbench
2. Execute:

```sql
CREATE DATABASE foodsmart;
USE foodsmart;
Crie as tabelas:
CREATE TABLE orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CustomerName VARCHAR(100),
    CustomerPhone VARCHAR(20),
    Total DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10,2),
    Category VARCHAR(50),
    Emoji VARCHAR(10),
    IsActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE order_items (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT,
    ProductId INT,
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    FOREIGN KEY (OrderId) REFERENCES orders(Id),
    FOREIGN KEY (ProductId) REFERENCES products(Id)
);

```
---

## 🔧 Executando o Backend
 - cd backend/FoodSmart.Api
 - dotnet run

---

## A API estará disponível em:
- http://localhost:5077

---

## 🎨 Executando o Frontend
- cd frontend
- npm install
- npm run dev

Acesse:

http://localhost:5173

---

🔗 Integração

O frontend consome a API via:

http://localhost:5077/api

---

## 🧪 Teste do Sistema
- Inicie o backend
- Inicie o frontend
- Adicione produtos
- Finalize um pedido

Consulte:
http://localhost:5077/api/orders

----

## 📌 Funcionalidades

- Cadastro de pedidos
- Listagem de pedidos
- Integração com banco MySQL
- Interface interativa
- API REST

---

## 🎯 Objetivo do Projeto

Desenvolver um sistema web completo integrando:

- Backend
- Banco de dados
- Interface web
- Comunicação via API

---
