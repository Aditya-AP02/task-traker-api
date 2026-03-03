# Task Tracker - Full Stack Application

A simple and modern task tracking application built with Node.js, Express, MySQL, and React.

## Features

- **Backend API**: Robust RESTful API for managing tasks.
- **Modern UI**: Stylish "Glassmorphism" frontend with React and Vite.
- **Database Persistence**: MySQL integration for reliable data storage.
- **Environment Driven**: Secure configuration using environment variables.

## Tech Stack

- **Frontend**: React, Vite, Axios, Lucide-React.
- **Backend**: Node.js, Express, MySQL2, Dotenv, Cors.
- **Database**: MySQL.

## Getting Started

### Prerequisites

- Node.js installed.
- MySQL server running locally.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-tracker-api
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=task_tracker_db
   PORT=3000
   ```

4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the App

1. Start the backend:
   ```bash
   # From the root directory
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## License

This project is licensed under the ISC License.
