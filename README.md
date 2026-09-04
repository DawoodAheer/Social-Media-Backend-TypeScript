Social Media Backend API

A RESTful Social Media Backend built with Node.js, Express.js, TypeScript, MongoDB, and Mongoose. It provides authentication, posts, likes, comments, shares, admin controls, logging, database seeding, and migration support.

Tech Stack

Node.js + Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

bcrypt Password Hashing

Postman for API Testing

MongoDB Compass for Database Checking

Git & GitHub

Features

User & Authentication

User registration and login

Password hashing with bcrypt

JWT-based authentication

JWT contains id, email, and role

Token expiry: 50 minutes

Protected routes through authentication middleware

Posts

Create, read, update and delete posts

Post fields include title, description, image and location

Authenticated user's ID is taken from req.userId

Likes

Like and unlike posts

Duplicate likes from the same user are prevented

Multiple users can like the same post

Like count is maintained

Comments

Add multiple comments to a post

Delete comments

Store comment author, text and creation time

Comment count is maintained

Shares

Share posts through a dedicated Share controller and router

Admin & RBAC

The project has two roles:

user
admin

Admin routes are protected by both authentication and authorization middleware.

DELETE /admin/userdeleted/:userId
DELETE /admin/postdeleted/:postId
DELETE /admin/commentdeleted/:postId/:commentId
GET    /admin/getuser
GET    /admin/getpost

Only users with role: "admin" can access these routes.

Project Structure

Social Media Project/
├── controllers/
│   ├── user
│   ├── post
│   ├── like
│   ├── comment
│   └── share
├── models/
├── routes/
│   ├── user
│   ├── post
│   ├── like
│   ├── comment
│   ├── share
│   └── admin
├── middleware/
│   ├── authmiddleware
│   └── authorization
├── migration/
│   └── addrole.js
├── logger/
│   └── log.js
├── logs/
│   └── app.log
├── app.ts
├── tsconfig.json
└── package.json

Main Models

User

name, email, password, adress, role, createdAt

Post

user, title, description, image, location,
like[], totallike, comment[], totalComment

Like, Comment, Share are handled separately for their respective social activities.

How the Project Works

Client / Postman
       ↓
   Express Routes
       ↓
Authentication Middleware
       ↓
Authorization Middleware (Admin routes)
       ↓
    Controller
       ↓
 Mongoose / MongoDB
       ↓
 JSON Response

For login, the flow is:

Email + Password
       ↓
Find User
       ↓
bcrypt.compare()
       ↓
Create JWT
       ↓
Send Token
       ↓
Use Bearer Token on Protected APIs

Middleware

Authentication Middleware: verifies the Bearer JWT and stores the authenticated user's ID in req.userId.

Authorization Middleware: finds the authenticated user and allows the request only when role === "admin".

Logging

Important actions are recorded with timestamps in:

logs/app.log

Logging covers registration, login, posts, comments, likes/unlikes, shares and admin actions.

Seed & Migration

The project includes database seeding for initial users/admins and a migration script for older users:

migration/addrole.js

The migration assigns role: "user" to existing users that do not yet have a role.

Run the Project

Install dependencies:

npm install

Run in development mode:

nodemon app.ts

The API runs on:

http://localhost:3000

The MongoDB database is:

SocialMedia

Testing

All API endpoints have been tested with Postman. Database records can be checked in MongoDB Compass.

Current Status

The Social Media Backend project is completed with:

5 models

5 controllers

Separate routers

JWT authentication

Authentication and authorization middleware

Admin/RBAC system

CRUD operations for posts

Like, unlike, comment and share functionality

Logging system

Data seeding

Database migration

TypeScript conversion

Postman API testing

Author

Dawood Aheer
