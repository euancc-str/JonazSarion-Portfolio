# Jonaz Sarion - Full Stack Portfolio



## 1. Project Overview

This is a personal portfolio web application built to showcase my skills, projects, and educational background as a BSIT student. It features a fully functional "Rate My Work" system where visitors can leave star ratings, and an Admin Dashboard where I can moderate (approve/hide) those ratings. The app uses Google & GitHub OAuth2 for secure user authentication.



## 2. List of APIs Used

The application uses a RESTful API architecture connecting a Spring Boot Backend with a React Frontend.



### **User & Authentication**

* **`GET /api/user-info`**: Retrieves the currently logged-in user's details (Name, Email, Photo) from the OAuth2 session.

* **`GET /oauth2/authorization/{provider}`**: Initiates the login process for Google or GitHub.

* **`POST /logout`**: Invalidates the session and redirects the user to the profile page.



### **Rating System (The Transaction Feature)**

* **`POST /rating`**: Allows a logged-in user to submit a new star rating (1-5).

* **`GET /allRating`**: (Admin Only) Fetches the complete list of all user ratings for the dashboard.

* **`GET /displayed/{status}`**: Fetches only the "Approved" ratings to display on the public Home page testimonials.

* **`PUT /rating/{id}`**: (Admin Only) Toggles a rating's status between "Hidden" (0) and "Live" (1).



### **Communication**

* **`POST /api/send-email`**: Handles the "Contact Me" form submission.



## 3. Transaction Feature Description

The core transaction feature is the **Rating & Moderation System**:

1.  **Submission:** A user logs in via OAuth2. When they click a star rating, a `POST` request is sent. The backend creates a new `UserRating` record in the MySQL database with a default status of `0` (Hidden).

2.  **Moderation (Admin):** The admin logs in and views the Dashboard. They can click "Approve," which sends a `PUT` request to update the status to `1` (Live).

3.  **Public View:** The Home page automatically fetches only ratings with `status = 1` to display in the "What People Say" section.



## 4. How to Run the Project



### **Prerequisites**

* Java JDK 17+

* Node.js & npm

* MySQL Database (named `web_project`)



### **Step 1: Backend (Spring Boot)**

1.  Open the `backend` folder in IntelliJ IDEA.

2.  Update `application.properties` with your MySQL credentials and OAuth2 Client IDs.

3.  Run the application (Main class).

4.  Server will start on: `http://localhost:8080`



### **Step 2: Frontend (React + Vite)**

1.  Open the `frontend` folder in VS Code.

2.  Open the terminal and run:

    ```bash

    npm install

    npm run dev

    ```

3.  Access the website at: `http://localhost:5173`