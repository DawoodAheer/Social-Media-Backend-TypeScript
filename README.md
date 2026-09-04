Social Media Backend API

A complete Social Media Backend API built with Node.js, Express.js, TypeScript, MongoDB, and Mongoose. The project provides authentication, posts, likes, comments, shares, admin management, role-based access control, logging, database seeding, migration, and API testing.

Tech Stack

Node.js – Backend runtime

Express.js – REST API and routing

TypeScript – Type-safe backend development

MongoDB – Database

Mongoose – MongoDB ODM

JWT – Authentication

bcrypt – Password hashing

Postman – API testing

MongoDB Compass – Database verification

Git & GitHub – Version control and project hosting

Main Features

1. User Authentication

User registration and login

Passwords stored using bcrypt hashing

JWT token generated after successful login

JWT contains user ID, email, and role

Token expiry is set to 50 minutes

Protected APIs require a Bearer token

2. Posts

Create a new post

Get posts

Update posts

Delete posts

Post supports title, description, image, and location

Authenticated user's ID is stored with the post

3. Likes

Like a post

Unlike a post

One user cannot like the same post twice

Multiple users can like the same post

Total like count is maintained

4. Comments

Add multiple comments to a post

Store comment author, text, and creation time

Delete comments

Total comment count is maintained

5. Shares

Share posts using a dedicated Share Controller and Share Router

Multiple shares can be recorded

Admin & Role-Based Access Control

The project supports two roles:

user

admin

Admin APIs are protected by both Authentication Middleware and Authorization Middleware.

Admin Routes

DELETE /admin/userdeleted/:userId — Delete a user

DELETE /admin/postdeleted/:postId — Delete a post

DELETE /admin/commentdeleted/:postId/:commentId — Delete a comment

GET /admin/getuser — Get users

GET /admin/getpost — Get posts

Only a logged-in user whose role is admin can access these routes.

Authentication Flow

Register
   ↓
Password hashed with bcrypt
   ↓
User saved in MongoDB

Login
   ↓
Email + Password
   ↓
User found in MongoDB
   ↓
bcrypt.compare()
   ↓
JWT generated
   ↓
Bearer Token used for protected APIs

Request Flow

Client / Postman
       ↓
Express Router
       ↓
Authentication Middleware
       ↓
Authorization Middleware (Admin)
       ↓
Controller
       ↓
Mongoose
       ↓
MongoDB
       ↓
JSON Response

Middleware

Authentication Middleware

Reads the Authorization: Bearer <token> header

Verifies the JWT

Extracts the authenticated user's ID

Stores it in req.userId

Allows access to protected routes

Authorization Middleware

Finds the authenticated user using req.userId

Checks the user's role

Allows the request only when role === "admin"

Returns an error when a normal user tries to access admin APIs

Project Structure

Social Media Project/
│
├── controllers/
│   ├── userController.ts
│   ├── postController.ts
│   ├── likeController.ts
│   ├── commentController.ts
│   └── shareController.ts
│
├── models/
│   ├── User
│   ├── Post
│   ├── Like
│   ├── Comment
│   ├── Share
│   └── seedadmin.js
│
├── routes/
│   ├── user
│   ├── post
│   ├── like
│   ├── comment
│   ├── share
│   └── admin
│
├── middleware/
│   ├── authmiddleware
│   └── authorization
│
├── migration/
│   └── addrole.js
│
├── logger/
│   └── log.js
│
├── logs/
│   └── app.log
│
├── app.ts
├── tsconfig.json
└── package.json

Database Models

Model

Purpose

User

Stores user information, password, role, address and creation date

Post

Stores post details, author, likes, comments and counts

Like

Handles post like information

Comment

Handles comment information

Share

Handles post share information

User Fields

name, email, password, adress, role, createdAt

Post Fields

user, title, description, image, location, like[], totallike, comment[], totalComment

Logging System

The project contains a custom logger that records important application activities with timestamps.

Logged activities include:

User registration

User login

Post operations

Comments

Likes and unlikes

Shares

Admin actions

Logs are stored in:

logs/app.log

Database Seeding & Migration

Data Seeding

The seed file creates initial users and admins for testing. The seed logic can also check existing email records and assign the correct role instead of creating unnecessary duplicates.

Migration

The migration script updates older users who do not have a role:

migration/addrole.js

It assigns:

role = "user"

to users where the role does not already exist.

How to Run

1. Install Dependencies

npm install

2. Start the Server

nodemon app.ts

3. API Server

http://localhost:3000

4. MongoDB Database

SocialMedia

Testing

All major API endpoints are tested using Postman.

Database records are verified using MongoDB Compass.

Authentication and admin authorization are tested with valid and invalid JWT tokens.

CRUD operations, likes, comments, shares, and admin actions are verified through API responses.

Complete Project Flow

User
 │
 ├── Register
 │      ↓
 │   bcrypt password hashing
 │      ↓
 │   MongoDB
 │
 ├── Login
 │      ↓
 │   JWT Token
 │      ↓
 │   Protected APIs
 │
 ├── Posts
 │      ├── Create
 │      ├── Read
 │      ├── Update
 │      └── Delete
 │
 ├── Like / Unlike
 │
 ├── Comment / Delete Comment
 │
 └── Share

Admin
 │
 └── JWT Authentication
        ↓
    Authorization Check
        ↓
    Admin Management APIs

Project Status

The project is completed and includes:

5 Models

5 Controllers

5 Main Routers + Admin Router

JWT Authentication

Authentication & Authorization Middleware

Role-Based Access Control

Post CRUD

Likes, Unlikes, Comments & Shares

Logging System

Data Seeding

Database Migration

TypeScript Integration

Postman API Testing

MongoDB Compass Verification

Author

Dawood Aheer
