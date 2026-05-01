# 🍔 FOODSMART - PIM III

Sistema Web para gerenciamento de pedidos de uma hamburgueria.  
Projeto desenvolvido para o **Projeto Integrado Multidisciplinar III - UNIP**.

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


foodsmart/
├── backend/ → API em .NET
├── frontend/ → Interface web
├── README.md


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

##🧪 Teste do Sistema
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

##🎯 Objetivo do Projeto

Desenvolver um sistema web completo integrando:

- Backend
- Banco de dados
- Interface web
- Comunicação via API

---
