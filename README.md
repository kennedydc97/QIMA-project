# Product Management Application

## Overview

This is a product management application built with Spring Boot and Angular. It provides functionality to manage products, including creating, reading, updating, and deleting products. The application features user authentication and authorization using Spring Security and JWT tokens. It supports role-based access control to restrict certain actions to admin users only.

## Technologies Used

- **Backend:** Spring Boot, Spring Security, JWT, H2 Database
- **Frontend:** Angular, Angular Material
- **Others:** Maven, Java, TypeScript

## Features

- User authentication and authorization
- Role-based access control
- Product management (CRUD operations)
- Angular Material for a responsive UI
- Sample data loaded on application startup

## Prerequisites

- JDK 11 or later
- Node.js and npm
- Angular CLI
- Maven


## Data Initialization
The application loads initial data including users, roles, categories, and products through the DataLoader class. This helps to get started with some pre-defined data.

## Usage
Login:
Admin: admin/admin
User: user/user
Product Management:
Admin can add, edit, and delete products.
User can view products.


## TODO List
- Change the H2 Database to MySQL:
- Update the application to use MySQL for production environments.

- Running Only in Development Mode:
- Ensure the application is optimized for development. Consider adding profiles for development and production.

- Error Handling:
- Add comprehensive error handling for all server endpoints to improve robustness.

- Dockerize the Application:
- Create Docker configurations to launch the backend and frontend together with a single command.

- Improve Layout:
- Enhance the UI/UX design of the application to make it more user-friendly and visually appealing.

- Develop Unit Tests:
- Implement unit tests for both the backend and frontend to ensure code quality and reliability.

- Use Lombok:
- Integrate Lombok into the backend to reduce boilerplate code and improve code readability.

