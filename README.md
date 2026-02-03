# DevStash - Developer Snippet Manager

A modern, full-stack code snippet management platform built with React, TypeScript, Node.js, and MongoDB.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Editor**: Monaco Editor

## Prerequisites
- Node.js (v16+)
- MongoDB (running locally or cloud URI)

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install  # Installs concurrently in root
    npm run install-all # Installs server and client dependencies
    ```

2.  **Environment Variables**
    - The server comes with a default `.env` file in `server/.env`.
    - Modify `MONGO_URI` if your MongoDB is not at `mongodb://localhost:27017/devstash`.

3.  **Run Application**
    ```bash
    npm run dev
    ```
    - Client: http://localhost:5173
    - Server: http://localhost:5000

## Features
- User Authentication (Sign up/Login)
- Create, Edit, Delete Code Snippets
- Syntax Highlighting for multiple languages
- Dark/Light Mode
- Tagging and Search
- Favorites
