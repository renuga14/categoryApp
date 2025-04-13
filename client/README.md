##  Category Management Dashboard
    A full-stack e-commerce category management dashboard where users can sign up, log in, and view product categories in a clean, responsive UI.

## 🔥 Features

-  JWT-based Authentication
-  Sidebar Navigation for Category Selection
-  Dynamic Category Display with API Data
-  Protected API Call using Bearer Token
-  Clean, Responsive UI with Flexbox
-  State Management with React Hooks

## Purpose of the Project

This project was developed as part of a **Category Management Dashboard**. It demonstrates my ability to:
- Understand and build real-world applications using **React.js**
- Work with **REST APIs** and manage **authorization**
- Organize code in a **clean, reusable** and maintainable way
- Use **React Router**, **hooks**, and **conditional rendering**

## Install dependencies
npm install

## Start the development server
npm start

Open in browser: http://localhost:3000

## 🔗 Backend Setup
This project expects a backend running on http://localhost:5000 with the following endpoints:

POST /signup

POST /login

GET /categories (Requires Bearer Token)

Ensure localStorage.setItem("token", <JWT_TOKEN>) is properly set after login/signup.

## Dashboard (after login)
   Once logged in, users can:

   View a list of clothing categories

   See category image, name, and item count

   Experience dynamic UI updates via React Hooks

 

## Tech Stack
Frontend: React.js, CSS, JavaScript

Routing: React Router DOM

Authentication: JWT (JSON Web Token)

State Management: React Hooks (useState, useEffect)

