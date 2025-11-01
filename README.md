# ExpenseTrackerBackend_VinayakJoshi

A comprehensive backend system for managing expenses with user authentication using Firebase and database storage using MongoDB.

## Features

- **User Authentication**: Firebase-based email/password authentication
- **Expense Management**: Create, read, update, and delete expenses
- **Category Management**: Organize expenses by categories
- **Reports**: Monthly summaries and category-wise expense filtering
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling middleware
- **Pagination**: Paginated expense listings

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Validation**: express-validator
- **Environment**: dotenv

## Project Structure

\`\`\`

ExpenseTrackerBackend/\
├── src/\
│   ├── server.js          
│   ├── firebase/\
│   │   └── firebase-config.js 
│   ├── models/\
│   │   ├── User.js            
│   │   └── Expense.js         \
│   ├── controllers/\
│   │   ├── authController.js  \
│   │   ├── expenseController.js \
│   │   └── reportController.js  \
│   ├── middleware/\
│   │   ├── authenticate.js    \
│   │   ├── validation.js     \
│   │   └── errorHandler.js    \
│   └── routes/\
│       ├── auth.js            \
│       ├── expenses.js        \
│       └── reports.js         \
├── package.json\
├── .env.example\
├── postman_collection.json\
└── README.md\

\`\`\`

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- Firebase Project with Authentication enabled

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ExpenseTrackerBackend_YourName.git
   cd ExpenseTrackerBackend_YourName
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Firebase and MongoDB credentials:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   PORT=5000
   NODE_ENV=development
   ```

4. **Configure Firebase**
   - Go to Firebase Console
   - Create a new project or use existing one
   - Enable Authentication (Email/Password)
   - Generate a private key JSON file
   - Add credentials to `.env`

5. **Configure MongoDB**
   - Create a MongoDB database (local or MongoDB Atlas)
   - Add connection string to `.env`

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user with email and password
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "uid": "firebase-uid"
  }
  ```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Login with email and password, receive Firebase token
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "firebase-id-token",
    "uid": "firebase-uid"
  }
  ```

#### Logout User
- **Endpoint**: `POST /api/auth/logout`
- **Description**: Logout the authenticated user
- **Authentication**: Required (Bearer token)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

### Expense Management

#### Get All Expenses
- **Endpoint**: `GET /api/expenses`
- **Description**: Fetch all expenses for logged-in user with pagination
- **Authentication**: Required
- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `sortBy` (default: "-date")
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "expense-id",
        "title": "Lunch",
        "amount": 250,
        "category": "Food",
        "date": "2025-10-12T00:00:00Z",
        "description": "Lunch with colleagues"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "pages": 5
    }
  }
  ```

#### Get Expense by ID
- **Endpoint**: `GET /api/expenses/:id`
- **Description**: Fetch a single expense by ID
- **Authentication**: Required
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "expense-id",
      "title": "Lunch",
      "amount": 250,
      "category": "Food",
      "date": "2025-10-12T00:00:00Z"
    }
  }
  ```

#### Create Expense
- **Endpoint**: `POST /api/expenses`
- **Description**: Add a new expense
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "title": "Lunch",
    "amount": 250,
    "category": "Food",
    "date": "2025-10-12",
    "description": "Lunch with colleagues"
  }
  ```
- **Response**:
  ``` json
  {
    "success": true,
    "message": "Expense added successfully",
    "id": "expense-id"
  }
  ```

#### Update Expense
- **Endpoint**: `PUT /api/expenses/:id`
- **Description**: Update an existing expense
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "title": "Dinner",
    "amount": 350,
    "category": "Food",
    "date": "2025-10-12"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Expense updated successfully"
  }
  ```

#### Delete Expense
- **Endpoint**: `DELETE /api/expenses/:id`
- **Description**: Delete an expense
- **Authentication**: Required
- **Response**:
  ```json
  {
    "success": true,
    "message": "Expense deleted successfully"
  }
  ```

### Reports

#### Monthly Report
- **Endpoint**: `GET /api/reports/monthly`
- **Description**: Get total and category-wise expense summary for a month
- **Authentication**: Required
- **Query Parameters**:
  - `month` (1-12, required)
  - `year` (required)
- **Response**:
  ```json
  {
    "success": true,
    "month": 10,
    "year": 2025,
    "total": 2500,
    "categories": {
      "Food": 1000,
      "Travel": 1500
    },
    "expenseCount": 8
  }
  ```

#### Category Report
- **Endpoint**: `GET /api/reports/category`
- **Description**: Get expenses filtered by category
- **Authentication**: Required
- **Query Parameters**:
  - `category` (required)
  - `sortBy` (default: "-date")
- **Response**:
  ```json
  {
    "success": true,
    "category": "Food",
    "total": 1000,
    "count": 5,
    "data": [
      {
        "_id": "expense-id",
        "title": "Lunch",
        "amount": 250,
        "date": "2025-10-12T00:00:00Z"
      }
    ]
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Expense not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Testing with Postman

1. Import the `postman_collection.json` file into Postman
2. Register a new user via the Register endpoint
3. Copy the `uid` from the response
4. Login to get a Firebase token
5. Use the token in the Authorization header for other requests:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```
6. Test all CRUD operations and report endpoints

## Categories Supported

- Food
- Travel
- Entertainment
- Utilities
- Healthcare
- Shopping
- Other

## Example Usage

### Register and Create Expense
```bash
# Step 1: Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Step 2: Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Step 3: Create Expense (use token from login)
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Lunch",
    "amount": 250,
    "category": "Food",
    "date": "2025-10-12"
  }'
```

# Other Stuff
✅ **Middleware for Authentication Validation** - `authenticate.js` verifies Firebase tokens\
✅ **Input Validation** - `validation.js` uses express-validator for all endpoints\
✅ **Custom Error Handling** - `errorHandler.js` centralized error management\
✅ **Clean & Modular Structure** - Separated into controllers, routes, models, middleware\
✅ **Meaningful Variable Names** - Clear naming conventions throughout\
✅ **Optional Filtering/Sorting** - Expenses endpoints support pagination and sorting\
✅ **Aggregation-based Reports** - Monthly reports with category-wise breakdown\

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check network access in MongoDB Atlas if using cloud

### Firebase Initialization Error
- Verify Firebase credentials in `.env` file
- Ensure private key is properly formatted with `\n` for line breaks
- Check that Firebase project has Authentication enabled

### Token Verification Error
- Ensure token is passed correctly in Authorization header
- Token should be in format: `Bearer YOUR_TOKEN`
- Tokens may expire - login again to get a new token


## License

MIT License - Feel free to use this project for educational purposes.

## Support

For issues or questions, please open an issue on the GitHub repository.