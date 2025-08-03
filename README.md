# 🚀 Sequelize Setup Guide – Node.js + MySQL

## 📘 Reference Guide: Setting Up Backend with Sequelize ORM

This guide walks you through setting up a backend using **Node.js**, **MySQL**, and **Sequelize ORM**, including migrations, models, seeders, and database management using `sequelize-cli`.

---

## 📦 Installation

Install the required packages:

```bash
npm install sequelize mysql2
npm install --save-dev sequelize-cli


---

## ⚙️ Step-by-Step Setup Guide

### 1️⃣ Initialize Sequelize Project Structure

```bash
npx sequelize init
```

This creates the following folder structure:

```
config/config.json       # DB config (we'll convert this to JS)
models/                  # Sequelize models
migrations/              # Migration files
seeders/                 # Seeder files
```

---

### 2️⃣ Setup `.env` File

Create a `.env` file in your root directory:

```env
DB_NAME=your_db_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
PORT=8000
```

---

### 3️⃣ Convert `config/config.json` to `config/config.js`

Replace `config/config.json` with:

```js
// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
```

> ✅ Also update `models/index.js` to use `require('../config/config.js')[env]` instead of `.json`.

---

### 4️⃣ Create the Database

```bash
npx sequelize db:create
```

---

### 5️⃣ Generate Models (with Migrations)

```bash
npx sequelize model:generate --name ModelName --attributes column1:type,column2:type
```

Example:

```bash
npx sequelize model:generate --name Flight --attributes flightNumber:string,airplaneId:integer
```

---

### 6️⃣ Run Migrations

```bash
npx sequelize db:migrate
```

To undo last or all:

```bash
npx sequelize db:migrate:undo        # Undo last migration
npx sequelize db:migrate:undo:all    # Undo all migrations
```

---

### 7️⃣ Generate Migration Manually (Optional)

```bash
npx sequelize migration:generate --name migration_name
```

---

### 8️⃣ Create Seeders

```bash
npx sequelize seed:generate --name seed_name
```

Run Seeders:

```bash
npx sequelize db:seed:all
```

Undo Seeders:

```bash
npx sequelize db:seed:undo
npx sequelize db:seed:undo:all
```

---

### 9️⃣ Drop the Database (Optional)

```bash
npx sequelize db:drop
```

---

## 🧪 Test DB Connection in Code

You can test the DB connection in your `src/index.js` or main file:

```js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
  }
}

testConnection();
```

---

## 📁 Recommended Project Structure

```
project-root/
├── config/
│   └── config.js
├── migrations/
├── models/
│   └── index.js
├── seeders/
├── src/
│   └── index.js (Express app entry point)
├── .env
├── package.json
└── README.md
```

---

## 🔗 Useful Resources

* [Sequelize Official Docs](https://sequelize.org/)
* [Sequelize CLI Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
* [MySQL Documentation](https://dev.mysql.com/doc/)

```

---

Let me know if you’d like me to add **sample models**, **REST routes**, or **service-controller structure** to the same README.
```
