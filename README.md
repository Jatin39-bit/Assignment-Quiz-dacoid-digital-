# Quiz Website

A **Quiz Web Application** built using **React, Tailwind CSS, Node.js, Express, and MongoDB**. This app provides an engaging quiz experience with proper authentication, attempt history, instant feedback, and a global leaderboard.

## Features

1. **Authentication & Authorization**: Secure login and registration using JWT.
2. **Login & Registration with Validation**: Ensures valid user credentials.
3. **Multiple Attempts**: Users can take quizzes multiple times.
4. **Attempt History**: Stores past quiz attempts with details like:
   - Score
   - Total time consumed
   - Date of attempt
5. **Instant Feedback**: Users get immediate feedback after selecting an answer.
6. **Timer-Based Quiz**:
   - 20 questions per quiz
   - 10-minute time limit
7. **Data Storage**:
   - Quiz history is saved in **MongoDB Atlas** (cloud database).
8. **Global Leaderboard**: Displays the highest scorers, ranking users based on their best scores.
9. **Performance Percentage**: Once all questions are answered then performance percentage is shown as compared to other user.


## Installation & Running Locally

### Prerequisites

- **Node.js** installed
- **MongoDB Atlas** account (or a local MongoDB instance)
- **Git** installed

### Steps to Run

1. **Clone the repository:**

   ```sh
   git clone <repo-link>
   cd Assignment-Quiz-dacoid-digital
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Setup Environment Variables**

   - **Frontend**
     ```env
     VITE_API_URL=http://localhost:3001
     ```

   - **Backend**
     ```env
     JWT_SECRET=your_secret_key
     MONGO_URI=your_mongodb_uri
     PORT=3001
     ```

4. **Start the Backend Server:**

   ```sh
   cd Backend
   node server.js
   ```

5. **Start the Frontend:**

   ```sh
   cd Frontend
   npm run dev
   ```

6. **Open the app in the browser:**

   ```sh
   http://localhost:5173
   ```

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB 
- **Authentication:** JWT (JSON Web Token)



