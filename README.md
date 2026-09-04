Social Media Backend API

A complete RESTful Social Media Backend API built with Node.js, Express.js, MongoDB, Mongoose, and TypeScript.

This project demonstrates how a real backend application works from API routes and authentication to database operations, authorization, admin management, logging, migration, and testing.

Technologies Used
Node.js – JavaScript runtime for the backend
Express.js – Web framework for building REST APIs
TypeScript – Provides type safety and better code maintainability
MongoDB – NoSQL database
Mongoose – ODM for MongoDB
JWT – Authentication and protected routes
bcrypt – Secure password hashing
Postman – API testing
MongoDB Compass – Database inspection
Features
User Management
User Registration
User Login
Delete User
Password Hashing with bcrypt
JWT Authentication
Protected Routes
User Roles: user and admin
Post Management
Create Post
Get All Posts
Get Single Post
Update Post
Delete Post
User-based Post Ownership
Likes
Like a Post
Unlike a Post
One Like Per User on the Same Post
Multiple Users Can Like the Same Post
Automatic Like Count
Comments
Add Comments
Multiple Comments on One Post
Store Comment User and Creation Time
Delete Comments
Shares
Share Posts
Multiple Users Can Share the Same Post
Share Information Stored in Database
Authentication Flow

The project uses JWT (JSON Web Token) to authenticate users and protect private routes.

User Registration
        ↓
Password Hashed with bcrypt
        ↓
User Saved in MongoDB
        ↓
User Login
        ↓
Password Verification
        ↓
JWT Token Generated
        ↓
Token Sent in Authorization Header
        ↓
Authentication Middleware
        ↓
Protected Controller

During login, the server verifies the user's email and password. After successful authentication, a JWT is generated containing the user's ID, email, and role.

Authorization and RBAC

The project implements Role-Based Access Control (RBAC).

There are two roles:

Role	Permissions
User	Normal social media operations
Admin	User, post, and comment management

Admin requests follow this flow:

Client Request
      ↓
JWT Authentication
      ↓
Authorization Middleware
      ↓
Check User Role
      ↓
Admin Controller
      ↓
Database
      ↓
Response

Only users with the admin role can access admin management operations.

Admin Operations
Get All Users
Get All Posts
Delete Any User
Delete Any Post
Delete Comments
Database Models

The project contains five main models:

Model	Purpose
User	Stores user information, password, role, address, and account details
Post	Stores posts, title, description, image, location, likes, and comments
Like	Handles post like functionality
Comment	Handles comments on posts
Share	Handles post sharing functionality

MongoDB stores the application data, while Mongoose is used to define schemas and perform database operations.

Project Architecture

The complete request flow of the application is:

Client / Postman
       ↓
     Route
       ↓
 Authentication Middleware
       ↓
 Authorization Middleware
       ↓
   Controller
       ↓
     Model
       ↓
    MongoDB
       ↓
    Response

For normal user routes, authorization is applied where required. Admin routes use both authentication and admin-role authorization.

Project Structure
Social Media Project
│
├── controllers/
│   ├── user.ts
│   ├── post.ts
│   ├── like.ts
│   ├── comment.ts
│   └── share.ts
│
├── models/
│   ├── user.ts
│   ├── post.ts
│   ├── like.ts
│   ├── comment.ts
│   ├── share.ts
│   └── seedadmin.ts
│
├── routes/
│   ├── user.ts
│   ├── post.ts
│   ├── like.ts
│   ├── comment.ts
│   ├── share.ts
│   └── admin.ts
│
├── middleware/
│   ├── authmiddleware.ts
│   └── authorization.ts
│
├── migration/
│   └── addrole.js
│
├── logger/
│   └── log.ts
│
├── logs/
│   └── app.log
│
├── app.ts
├── package.json
├── tsconfig.json
└── .gitignore
API Route Areas

The application is divided into separate route files for better organization.

Route	Purpose
User Routes	Registration, login, and user operations
Post Routes	Create, read, update, and delete posts
Like Routes	Like and unlike posts
Comment Routes	Add and delete comments
Share Routes	Share posts
/admin Routes	Admin-only management operations

The project uses standard REST HTTP methods:

Method	Purpose
POST	Create data
GET	Read data
PATCH	Update data
DELETE	Delete data
Password Security

User passwords are never stored directly in plain text.

During registration:

Plain Password
      ↓
bcrypt Hash
      ↓
Hashed Password Stored in MongoDB

During login, bcrypt compares the entered password with the stored hash.

Logging System

A custom logging system is included to track important application activities.

Logged events include:

User Registration
User Login
Post Operations
Like / Unlike Operations
Comment Operations
Admin Actions

Logs are written with timestamps and stored in:

logs/app.log

This makes it easier to understand what operations are happening inside the application.

Database Seeding

The project includes a seed file for creating initial application users and administrators.

The seed system supports:

Creating users
Creating multiple admins
Hashing passwords with bcrypt
Preventing duplicate records
Updating an existing matching user to admin when required

This provides ready-to-use database records for development and testing.

Database Migration

A migration script was created to safely add the new role field to existing users.

Migration flow:

Existing Users
      ↓
Check for role field
      ↓
Role Missing?
      ↓
Set role = "user"

This allows existing database records to work correctly after introducing role-based authorization.

TypeScript

The backend has been converted to TypeScript.

TypeScript is used to improve:

Type safety
Code maintainability
Error detection
Development experience
Controller and request/response typing

The project can be checked with:

npx tsc --noEmit
Running the Project
Install Dependencies
npm install
Start MongoDB

Make sure MongoDB is running locally.

The project database connection is:

mongodb://localhost:27017/SocialMedia
Start the Server
npm run dev

The API runs on:

http://localhost:3000
Testing

All major APIs have been tested using Postman.

Testing includes:

User Registration
User Login
JWT Authentication
Protected Routes
Post CRUD
Like / Unlike
Comments
Shares
Admin Operations
Authorization Checks

Database records were also verified using MongoDB Compass.

Security

The project includes:

bcrypt password hashing
JWT authentication
Protected routes
Role-based authorization
Admin-only routes
Input validation
Duplicate like prevention
Complete Project Flow
User
 ↓
Register / Login
 ↓
JWT Token
 ↓
Authenticated Request
 ↓
Authentication Middleware
 ↓
Authorization Check
 ↓
Controller
 ↓
Mongoose Model
 ↓
MongoDB
 ↓
API Response
 ↓
Logging
Project Status
Completed

The project currently includes:

RESTful Backend API
Node.js and Express.js
TypeScript
MongoDB and Mongoose
5 Database Models
5 Controllers
User Authentication
JWT
bcrypt Password Hashing
Authentication Middleware
Authorization Middleware
Role-Based Access Control
Admin Management
Post CRUD
Like / Unlike System
Comment System
Share System
Logging System
Database Seeding
Database Migration
Postman Testing
MongoDB Compass Verification

Project development is completed. Only the final viva remains.

Project Purpose

The purpose of this project is to demonstrate practical backend development and REST API design using Node.js, Express.js, MongoDB, Mongoose, and TypeScript.

It covers the complete backend lifecycle, including:

Routes → Middleware → Controllers → Models → MongoDB → Authentication → Authorization → Logging → Testing

This project provides a complete foundation for a real-world social media backend system.
