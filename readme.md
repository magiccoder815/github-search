# Description

This web application is developed using Django 4.2.2 and Django REST Framework (DRF) for the Backend, with React.js for the Frontend. It leverages Redis for caching, Redux for state management, TypeScript for type safety, React Router for navigation, and Styled Components for styling.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Backend Unit Testing](#backend-unit-testing)

## Overview

This project offers scalable UI to work with data from a Django REST API. The frontend is developed using React and manages state with Redux, while TypeScript ensures type safety. Redis is used to store frequently accessed data, which speeds up responses and enhances performance. The styling is done with Styled Components, allowing for modular and reusable designs.

### Backend

- **Django 4.2.2** : Backend Framework
- **Django REST Framework** : Restful API Development
- **Redis** : Caching Data

### Frontend

- **React.js** : UI Building
- **TypeScript** : Type Safety
- **Redux Toolkit (Redux Slice)**: State Management
- **React Router** : Navigation
- **Infinite Scroll** : Infinite Scrolling for Displaying Results
- **Styled Components** : CSS-in-JS for Styling

## Project Structure

```
github-searcher/
│── backend/
│   │── backend/
│   │   │── config/
│   │   │── search/
│   │   │── .gitignore
│   │   │── db.sqlite3
│   │   │── manage.py
│   │   │── requirements.txt
│   │   │── .env
│── frontend/
│   │── public/
│   │── src/
│   │── .env
│   │── .gitignore
│   │── package-lock.json
│   │── package.json
│   │── README.md
│   │── tsconfig.json
│── readme.md
```

## Getting Started

### Requirements

- **Python 3.8 or later**
- **Django 4.2.2 and Django REST Framework**
- **React.js and TypeScript**
- **Node.js 16.20.0 or later**
- **Redis Server**

### Installation

1. **Clone the repository:**

   ```bash
   git clone 'gitlab URL'
   cd 'github-searcher'
   ```

2. **Backend Setup (Django):**

   - **Create a virtual environment and activate it:**
     ```bash
     cd backend/backend
     python3 -m venv venv
     venv\Scripts\activate  # Windows
     source venv/bin/activate  # macOS/Linux
     ```
   - **Install the Python dependencies:**
     ```bash
     pip install -r requirements.txt
     ```

3. **Set up the Frontend (React):**
   - **Navigate to the frontend directory:**
     ```bash
     cd frontend
     ```
   - **Install dependencies:**
     ```bash
     npm install
     ```

### Running the Application

1. **Start the Redis Server:**
   #### Windows
   ```bash
   redis-server
   ```
   #### Ubuntu
   ```bash
   sudo apt update
   sudo apt install redis-server
   sudo systemctl start redis
   ```
2. **Start Backend Server:**
   ```bash
   cd backend/backend
   python3 manage.py runserver
   ```
3. **Start Frontend Server:**
   ```bash
   cd frontend
   npm start
   ```

The application running:

- http://localhost:3000/ (React)
- http://localhost:8000/ (Django).

## Configuration

### Environment Variables

You can configure the settings in the `.env` file for both the frontend and the backend.

### Redis Configure

You can configure the settings in `settings.py`.

## API Documentation

- Swagger: http://localhost:8000/api/swagger/
- Redoc: http://localhost:8000/api/redoc/

### Sample Endpoints

- **Search Endpoint: POST /api/search/**
- **Clear Cache Endpoint: POST /api/clear-cache/**

## Backend Unit Testing

- **Activate Virtual Environment (if not already activated):**

  ```bash
  cd backend/backend
  venv\Scripts\activate  # Windows
  source venv/bin/activate  # macOS/Linux
  ```

- **Run Tests:**

  ```bash
  python3 manage.py test
  ```
