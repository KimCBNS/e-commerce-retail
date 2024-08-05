# E-commerce Back End

## Overview

This project involves building the back end for an e-commerce site. Utilizing Express.js for the API, Sequelize as the ORM, and PostgreSQL for the database, this project allows for the management of products, categories, and tags. The project meets the latest technological standards, enabling the company to compete effectively in the e-commerce industry.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Associations](#associations)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)
- [Contact Me](#contact)

## Installation

1. **Clone the Repository:**

   git clone <repository-url>
   cd e-commerce-backend
  

2. **Install Dependencies:**

   npm install

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add the following:

   DB_NAME=your_database_name
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_HOST=localhost


4. **Create the Database:**

   Use the `schema.sql` file to create the database using PostgreSQL shell commands.

5. **Seed the Database:**

   npm run seed
   
6. **Start the Server:**

   npm start

## Usage

Once the server is running, you can use Insomnia or any other API client to test the API endpoints.

## API Routes

The following routes are available in the application:

- **Categories:**
  - GET `/api/categories` - Get all categories
  - GET `/api/categories/:id` - Get a single category by ID
  - POST `/api/categories` - Create a new category
  - PUT `/api/categories/:id` - Update a category by ID
  - DELETE `/api/categories/:id` - Delete a category by ID

- **Products:**
  - GET `/api/products` - Get all products
  - GET `/api/products/:id` - Get a single product by ID
  - POST `/api/products` - Create a new product
  - PUT `/api/products/:id` - Update a product by ID
  - DELETE `/api/products/:id` - Delete a product by ID

- **Tags:**
  - GET `/api/tags` - Get all tags
  - GET `/api/tags/:id` - Get a single tag by ID
  - POST `/api/tags` - Create a new tag
  - PUT `/api/tags/:id` - Update a tag by ID
  - DELETE `/api/tags/:id` - Delete a tag by ID

## Database Models

The database contains the following models:

- **Category**
  - `id` (Integer, primary key, auto increment, not null)
  - `category_name` (String, not null)

- **Product**
  - `id` (Integer, primary key, auto increment, not null)
  - `product_name` (String, not null)
  - `price` (Decimal, not null, validates as decimal)
  - `stock` (Integer, default 10, validates as integer, min 10)
  - `category_id` (Integer, references Category model's id, not null)

- **Tag**
  - `id` (Integer, primary key, auto increment, not null)
  - `tag_name` (String)

- **ProductTag**
  - `id` (Integer, primary key, auto increment, not null)
  - `product_id` (Integer, references Product model's id)
  - `tag_id` (Integer, references Tag model's id)

## Associations

The following associations have been established between the models:

- **Product** belongs to **Category**
- **Category** has many **Products**
- **Product** belongs to many **Tags** through **ProductTag**
- **Tag** belongs to many **Products** through **ProductTag**

## Walkthrough Video

A walkthrough video demonstrating the functionality of the application can be found: https://drive.google.com/file/d/1PS-_1t-3tLK6R1o57dZJDJ22eOdM5ARu/view.

The video demonstrates:
- Connecting to the database
- Seeding the database
- Starting the application server
- Testing API GET routes for categories, products, and tags
- Testing API POST, PUT, and DELETE routes for categories, products, and tags

## License

This project is licensed under the MIT License.

## Contact
The code can be found here: https://github.com/KimCBNS/e-commerce-retail
And you can reach out to contact me: desveaux.kim@gmail.com

---

