# Student Management System

This repository contains the Student Management System, which is split into a React frontend and a PHP backend.

## How to Start the Frontend Server

The frontend is built using React and Vite. To start the frontend development server, follow these steps:

1. Open a terminal or command prompt.
2. Navigate to the `frontend` directory:
   ```bash
   cd c:\xampp\htdocs\student_management_system\frontend
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Once the server starts, it will give you a local URL. Open your web browser and go exactly to the base URL provided (usually `http://localhost:5173/`).
   
   > **Note:** Do not include any file paths like `/src/pages/...` at the end of the URL, as that will display raw code instead of rendering the application.

## How to Start the Backend Server

You can start the backend either by using XAMPP or by using PHP's built-in command-line server.

### Option 1: Using PHP Command Line (Recommended for Development)

1. Open a new terminal or command prompt.
2. Navigate to the `backend` directory:
   ```bash
   cd c:\xampp\htdocs\student_management_system\backend
   ```
3. Start the PHP built-in server:
   ```bash
   php -S localhost:8000
   ```
4. The backend API will now be accessible at `http://localhost:8000/`.

### Option 2: Using XAMPP

1. Open the **XAMPP Control Panel**.
2. Start the **Apache** service and **MySQL** service.
3. The backend API will be accessible at `http://localhost/student_management_system/backend/`.

## Project Structure

- `/frontend` - Contains the React user interface.
- `/backend` - Contains the PHP backend scripts and API endpoints.
