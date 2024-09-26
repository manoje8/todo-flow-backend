# Todo Flow Backend

This is the **backend API** for the Todo Flow application. It provides RESTful endpoints to manage todos, including creating, updating, deleting, and fetching todos. The API is built using **Node.js**, **Express**, and **MongoDB** for storing todos.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing todos.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Jsonwebtoken**: JSON Web Token library for secure authentication.
- **Cors**: To allow cross-origin requests from the frontend.
- **nodemailer**: Library for sending email messages.
- **bcrypt**: Secure password hashing library.

## API Endpoints

The backend exposes the following REST API endpoints:

**User Management**

1. **Create User:** `(POST /auth/register)` - Creates a new user account.
2. **User Login:** `(POST /auth/login)` - Authenticates a user with email and password.
3. **Forgot Password:** `(POST /auth/forgot-password)` - Initiates password reset by sending an OTP (One-Time Password) to the user's registered email.
4. **Reset Password:** `(POST /auth/reset-password)` - Validates the OTP and email, then updates the user's password in the database using a secure hashing algorithm.

**Todo** 
1. `(POST /api/todos)` - Create a New Todo
2. `(GET /api/todos)` - Get all Todos
3. `(PUT /api/todos/:id)` - Update a Todo
4. `(DELETE /api/todos/:id)` - Delete a Todo

### Installation and Setup

**Prerequisites:**

- Node.js
- npm (Node Package Manager)

**Instructions:**

1. Clone the repository:

```
git clone https://github.com/manoje8/repo-name.git
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev  (OR)
npm start
```

The server will start on port `8000` by default. You can access the application routes in your browser.