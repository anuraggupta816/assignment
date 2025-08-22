# 📌 Project Setup Guide

Portfolio Management Dashboard is a full-stack web application that helps users efficiently manage and track their investment portfolio. It provides an intuitive interface for monitoring assets, analyzing performance, and managing subscriptions with real-time backend integration.

## 🏗 Architecture Overview

The **Portfolio Management Dashboard** follows a client-server architecture:

- **Frontend (React + TypeScript):** Provides the user interface, handles routing, and communicates with the backend via REST APIs.
- **Backend (Node.js + Express + TypeScript):** Handles business logic, authentication, and API requests. It exposes secure endpoints for the frontend.
- **Database (MySQL):** Stores user information, portfolio data, transactions, and other business entities. The backend communicates with the database using Sequelize ORM.
- **Communication:** The frontend interacts with the backend over HTTP (using Axios/Fetch), while authentication and authorization are managed using JWT tokens pr cookies.

GitHub Repository:  
https://github.com/anuraggupta816/assignment

## 🔧 Clone the Repository

git clone https://github.com/anuraggupta816/assignment

# 1. Backend Setup

cd assignment
cd backend

# Create Env put these details in env

nano .env

# DB_NAME=portfolio_db

# DB_USER=root

# DB_PASSWORD=yourpassword

# DB_HOST=127.0.0.1

# DB_PORT=3306

# NODE_ENV=development

# PORT=4000

# Installing Backend Dependencies

npm install

# Run Backend

npm run dev

# Login Credentials

Email: anurag@yopmail.com
Password: Admin@123

# 2. Front Setup

cd frontend

# Create Env put these details in env

nano .env

# Create Env put these details in env

# VITE_API_BASE_URL=http://localhost:4000/portfolio

# VITE_APP_NAME=MyPortfolioApp

# Installing Front Dependencies

npm install
npm run dev

# Hit Curl

curl http://localhost:4000/api/health



## 🐳 Running with Docker
This project supports containerized deployment using **Docker** and **Docker Compose**.  
If you prefer not to install Node.js and MySQL locally, you can run everything inside containers.

