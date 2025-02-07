# E-commerce Express Application with TypeScript

## Live server link : https://express-ts-ecommerce-assignment.vercel.app

## Description

This is an Express application developed using TypeScript, integrating MongoDB with Mongoose for effective data management. The application allows for managing products and orders, ensuring data integrity through validation using Joi. It includes endpoints for creating, retrieving, updating, and deleting products and orders.

## Features

- Product Management
  - Create a new product
  - Retrieve a list of all products
  - Retrieve a specific product by ID
  - Update product information
  - Delete a product
  - Search products by a search term
- Order Management
  - Create a new order
  - Retrieve all orders
  - Retrieve orders by user email
- Inventory Management Logic
  - Check available quantity in inventory when creating an order
  - Return error if ordered quantity exceeds available quantity
  - Update inventory quantity and inStock status based on ordered quantity

## Prerequisites

- Node.js (version 14 or later)
- MongoDB (local instance or MongoDB Atlas)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/e-commerce-express-app.git
cd e-commerce-express-app
```

2. Install dependencies:

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.iixzvov.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
```

Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials and database name.

### Running the Application Locally

1. For development, start the application using:

```bash
npm run start:dev
```

2. To build the application, use:

```bash
tsc
npm run build
```

3. For production, start the application using:

```bash
npm run start:prod
```

The application will be running at `http://localhost:5000`.

## API Endpoints

### Product Management

- **Create a New Product**

  - **Endpoint**: `/api/products`
  - **Method**: POST
  - **Sample Request Body**:

    ```json
    {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
    ```

- **Retrieve a List of All Products**

  - **Endpoint**: `/api/products`
  - **Method**: GET

- **Retrieve a Specific Product by ID**

  - **Endpoint**: `/api/products/:productId`
  - **Method**: GET

- **Update Product Information**

  - **Endpoint**: `/api/products/:productId`
  - **Method**: PUT
  - **Sample Request Body**: Same as creating a new product

- **Delete a Product**

  - **Endpoint**: `/api/products/:productId`
  - **Method**: DELETE

- **Search a Product**

  - **Endpoint**: `/api/products?searchTerm=iphone`
  - **Method**: GET

### Order Management

- **Create a New Order**

  - **Endpoint**: `/api/orders`
  - **Method**: POST
  - **Sample Request Body**:

    ```json
    {
      "email": "level2@programming-hero.com",
      "productId": "5fd67e890b60c903cd8544a3",
      "price": 999,
      "quantity": 1
    }
    ```

- **Retrieve All Orders**

  - **Endpoint**: `/api/orders`
  - **Method**: GET

- **Retrieve Orders by User Email**

  - **Endpoint**: `/api/orders?email=level2@programming-hero.com`
  - **Method**: GET

## Validation and Error Handling

- Uses Joi for validation of incoming data for product and order creation and updating operations.
- Handles validation errors gracefully and provides meaningful error messages in the API responses.
- Custom error handling for scenarios like product not found, insufficient inventory, etc.

## Coding Tools and Libraries

- Express
- TypeScript
- Mongoose
- Joi
- ESLint (for linting and coding style enforcement)
