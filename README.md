# Task Management API Documentation

## Base URL: `localhost:3000`

---

## Create a New Task

- **URL:** `/`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:**
  - `userId` (String, required): The ID of the user to whom the task belongs.
  - `title` (String, required): The title of the task.
  - `description` (String): A description of the task.
  - `status` (String): The status of the task (e.g., "In Progress", "Completed").
  - `dueDate` (String, required): The due date of the task in the format "day-mon-year" (e.g., "24-Mar-2024").
  - `category` (String): The category of the task.
- **Example Request:**
  ```json
  {
      "userId": "65dc7d22432a2fcbe007a0bc",
      "title": "Finish the task",
      "description": "Dude, just finish the task already",
      "status": "In Progress",
      "dueDate": "24-Mar-2024",
      "category": "Burning Alive"
  }
