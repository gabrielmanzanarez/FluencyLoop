# FluencyLoop

FluencyLoop is a modern, cross-platform mobile application built with **Ionic Framework** and **Angular**, paired with a **Node.js (Express)** backend and a **Neon DB (PostgreSQL)** database.

## Features Implemented So Far

### Frontend (Ionic + Angular Standalone Components)
- **Splash Screen (`tab1`):** A custom, animated splash screen that serves as the entry point of the app. It checks for an active session and seamlessly redirects users to the main application or the login screen.
- **Authentication Flow:** 
  - Minimalist and dark-themed **Login** and **Signup** pages.
  - Form validation and direct connection to the backend API via an Angular `AuthService`.
  - Automatic session detection: Authenticated users are prevented from accessing login/signup and are redirected to the app.
- **Main App Layout (Tabs):**
  - Integrated a persistent bottom tab navigation for the main application.
  - **Profile Tab (`tab3`):** A dedicated profile view displaying user information and an auto-generated avatar (via UI Avatars). Includes a fully functional "Logout" mechanism that resets the app state and clears the local session.
- **Session Management:** LocalStorage-based session persistence to keep users logged in even after refreshing or closing the app.

### Backend (Node.js + Express)
- **Server:** A lightweight Express.js REST API.
- **Database Connection:** Integrated with a serverless PostgreSQL database (Neon DB) using the `pg` library.
- **Robust Error Handling:** Added safeguards against idle connection terminations (a common behavior in serverless databases) to prevent unexpected server crashes.
- **API Endpoints:**
  - `POST /api/signup`: Registers a new user in the database.
  - `POST /api/login`: Authenticates user credentials against the database records.

## Tech Stack
- **Frontend:** Ionic 9, Angular (Standalone Components), SCSS.
- **Backend:** Node.js, Express.js, CORS.
- **Database:** PostgreSQL (Neon DB).

## Setup & Execution

### Running the Frontend
1. Navigate to the root directory.
2. Install dependencies: `npm install`
3. Start the Ionic development server: `ionic serve`

### Running the Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Ensure you have a `.env` file with your `DATABASE_URL`.
4. Start the server: `node server.js` (Server runs on `http://localhost:3000`)
