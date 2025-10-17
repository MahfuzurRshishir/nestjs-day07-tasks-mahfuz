# 💰 Expense Management API (NestJS + MongoDB)

A backend API built using **NestJS** and **MongoDB (Mongoose)** to manage personal or team expenses.  
This project allows users to **create, list, and filter expenses**, manage **categories**, and generate **monthly expense summaries** — all with clean architecture, modular structure, and consistent response formatting.

---

## 🚀 Features

- 🧾 **Category Management** – Create and list categories (with soft delete support)
- 💸 **Expense Management** – Add and view expenses with pagination and filters
- 📅 **Monthly Reports** – View total and category-wise monthly summaries
- 🧰 **Validation & DTOs** – Ensures clean and validated input data
- ⚙️ **Mongoose + MongoDB** – Schema-based NoSQL data modeling
- 🛡️ **Helmet Middleware** – Security best practices enabled
- ✅ **Response Payload Format** – Unified success/error structure

---

## 🧠 Tech Stack

| Technology | Description |
|-------------|--------------|
| **NestJS** | Node.js framework for scalable backend apps |
| **MongoDB** | NoSQL database for storing expenses & categories |
| **Mongoose** | ODM for MongoDB |
| **TypeScript** | Type-safe development |
| **Helmet** | Security middleware |
| **Class-Validator / Transformer** | Input validation |

---
```

## 📂 Folder Structure

📦src
 ┣ 📂common
 ┃ ┗ 📂dto
 ┃ ┃ ┗ 📜pagination.dto.ts
 ┣ 📂config
 ┃ ┗ 📜configuration.ts
 ┣ 📂interfaces
 ┃ ┗ 📂core
 ┃ ┃ ┗ 📜response-payload.interface.ts
 ┣ 📂pages
 ┃ ┣ 📂category
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜create-category.dto.ts
 ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┗ 📜category.interface.ts
 ┃ ┃ ┣ 📂schema
 ┃ ┃ ┃ ┗ 📜category.schema.ts
 ┃ ┃ ┣ 📜category.controller.ts
 ┃ ┃ ┣ 📜category.module.ts
 ┃ ┃ ┗ 📜category.service.ts
 ┃ ┣ 📂expense
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜create-expense.dto.ts
 ┃ ┃ ┣ 📂interface
 ┃ ┃ ┃ ┗ 📜expense.interface.ts
 ┃ ┃ ┣ 📂schema
 ┃ ┃ ┃ ┗ 📜expense.schema.ts
 ┃ ┃ ┣ 📜expense.controller.ts
 ┃ ┃ ┣ 📜expense.module.ts
 ┃ ┃ ┗ 📜expense.service.ts
 ┃ ┗ 📂report
 ┃ ┃ ┣ 📜report.controller.ts
 ┃ ┃ ┣ 📜report.module.ts
 ┃ ┃ ┗ 📜report.service.ts
 ┣ 📂postmant
 ┃ ┗ 📜SoftLab-day7-nestExpenseMngt.postman_collection.json
 ┣ 📜.DS_Store
 ┣ 📜app.controller.spec.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts

 ```

# ▶️ Running the Project
## Install dependencies
```
pnpm install
```

## Start the development server
```
pnpm start:dev
```
## App runs at:
```
http://localhost:3000/api
```

# 📡 API Endpoints
## 🏷️ Category APIs
## 1️⃣ Create Category

POST /api/categories
```
Body:

{
  "name": "Food",
  "slug": "food"
}
```


✅ Successful Response:
```
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "671092bdfa97c856c9e3427d",
    "name": "Food",
    "slug": "food"
  }
}
```


❌ Unsuccessful Response:
```
{
  "success": false,
  "message": "Category already exists"
}
```
# #2️⃣ Get Categories

GET /api/categories

✅ Successful Response:
```
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    { "_id": "671092bdfa97c856c9e3427d", "name": "Food", "slug": "food" },
    { "_id": "671092c4fa97c856c9e3427e", "name": "Travel", "slug": "travel" }
  ]
}
```

# 💸 Expense APIs
## 3️⃣ Add Expense

POST /api/expenses

Body:
```
{
  "title": "Lunch at KFC",
  "amount": 15.5,
  "categoryId": "671092bdfa97c856c9e3427d",
  "date": "2025-10-10",
  "note": "With colleagues"
}
```


✅ Successful Response:
```
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "_id": "671093a4fa97c856c9e3427f",
    "title": "Lunch at KFC",
    "amount": 15.5,
    "categoryId": {
      "_id": "671092bdfa97c856c9e3427d",
      "name": "Food",
      "slug": "food"
    },
    "date": "2025-10-10T00:00:00.000Z",
    "note": "With colleagues"
  }
}
```

❌ Unsuccessful Response:
```
{
  "success": false,
  "message": "Invalid category ID"
}
```

## 4️⃣ Get Expenses (Optional Filters)

GET /api/expenses?month=2025-10&categoryId=671092bdfa97c856c9e3427d&page=1&limit=10

✅ Successful Response:
```
{
  "success": true,
  "message": "Expenses fetched",
  "count": 1,
  "data": [
    {
      "_id": "671093a4fa97c856c9e3427f",
      "title": "Lunch at KFC",
      "amount": 15.5,
      "categoryId": { "name": "Food", "slug": "food" },
      "date": "2025-10-10T00:00:00.000Z",
      "note": "With colleagues"
    }
  ]
}
```


❌ Invalid Query Example:
```
{
  "statusCode": 400,
  "message": "Invalid month format"
}
```
## 5️⃣ Monthly Summary Report

GET /api/reports/summary?month=2025-10

✅ Successful Response:
```
{
  "success": true,
  "message": "Report generated successfully",
  "data": {
    "month": "2025-10",
    "totalAmount": 450.75,
    "categoryTotals": [
      { "category": "Food", "total": 200.5 },
      { "category": "Travel", "total": 150.25 },
      { "category": "Shopping", "total": 100.0 }
    ]
  }
}
```

# 📦 Response Format:

## All responses follow a consistent structure via ResponsePayload interface:
```
export interface ResponsePayload {
  success: boolean;
  message: string;
  data?: any;
  count?: number;
}
```
# 🧪 Postman Collection

## Import the included Postman collection (ExpenseManagementAPI.postman_collection.json) to test all endpoints quickly.

# 🛠️ Developer Notes

- ### Pagination supported for all list endpoints via PaginationDto

- ### Soft Delete implemented for Category and Expense

- ### Indexing applied in Mongoose schemas for optimized queries

- ### ValidationPipe globally enabled

- ### Helmet middleware used for security

# 👨‍💻 Author

## Mahfuzur Shishir (22-47074-1)
## Full - Stack Developer | Learning NestJS + MongoDB
## 📧 Email: mohammadshishir7@gmail.com




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
