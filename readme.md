# Github Searcher

This project is a web application built using Django, Django REST Framework (DRF) as the backend, and React.js as the frontend. It also incorporates Redis for caching, Redux for state management, TypeScript, React Router for navigation, and Vanilla CSS for styling.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Redis Setup](#redis-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## Overview

This application provides a modern web interface to interact with data served by a Django REST API. The frontend is built with React, using Redux for state management and TypeScript for type safety. Redis is used to cache frequently accessed data, ensuring faster responses and improved application performance.

## Technologies

### Backend

- **Django**: The primary backend framework.
- **Django REST Framework**: To handle RESTful API development.
- **Redis**: For caching data to improve response times.

### Frontend

- **React.js**: For building a responsive user interface.
- **TypeScript**: Adds type safety to JavaScript.
- **Redux**: Manages global application state.
- **React Router**: Handles client-side routing.
- **Vanilla CSS**: Custom stylesheets for UI design.

## Features

- **Real-time Data Handling**: Redis caching for optimized API performance.
- **Infinite Scrolling**: New results are loaded automatically as the user scrolls.
- **Responsive Design**: Clean and responsive UI using Vanilla CSS.
- **API Documentation**: Available via Swagger for ease of testing and integration.
- **Efficient State Management**: Managed with Redux for a centralized application state.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Python 3.x**
- **Node.js and npm**
- **Redis Server**
- **Django and Django REST Framework**
- **React.js and TypeScript**

### Installation

1. **Clone the repository:**
   ```bash
   git clone 'github url'
   cd 'project root dir'
   ```
2. **Backend Setup (Django):**

- **Create a virtual environment and activate it:**

  ```bash
  python3 -m venv venv
  venv\Scripts\activate
  ```

- **Install the Python dependencies:**

  ```bash
  pip install -r requirements.txt
  ```

3. **Set up the Frontend (React):**

- **Navigate to the frontend directory:**
  ```bash
  cd client
  ```
- **Install dependencies:**
  ```bash
  npm install
  ```

### Running the Application

1. **Start the Redis Server:**

2. **Start the Django Server:**
   ```bash
   cd server
   cd backend
   python manage.py runserver
   ```
3. **Start the React Development Server:**
   ```bash
   cd client
   npm start
   ```
   The application should now be running at http://localhost:3000 (React frontend) and http://localhost:8000/ (Django backend).

## Configuration

### Environment Variables

You can configure the settings in the .env file for both the frontend and the backend.

### Redis Setup

Ensure that Redis is installed and running. The project uses Redis for caching API data. You can adjust settings in settings.py.

## API Documentation

### API documentation is generated with drf_yasg and can be viewed in the following formats:

- **Swagger: http://localhost:8000/api/swagger/**
- **Redoc: http://localhost:8000/api/redoc/**

### Sample Endpoints

- **Search Endpoint: POST /api/search/**
- **Clear Cache Endpoint: POST /api/clear-cache/**
