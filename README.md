## Video Progress Tracker
* A full-stack application to **track user video-watching progress** in real-time using React, Express.js, and MongoDB.

---

## Features
-  Tracks and updates watched seconds of a video.
-  Persists progress using a MongoDB backend.
-  Resumes playback from the last watched position.
-  Shows visually which parts of the video have been watched.
-  Auto-syncs data every 5 seconds.

---

##  Tech Stack

### Frontend:
- ReactJS
- Material-UI (MUI)
- React Player
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS & dotenv

---

##  Project Structure

video-progress-tracker/
├── client/ # React frontend
│ ├── src/
│ │ ├── App.js
│ │ └── components/
│ │ └── VideoPlayer.js
├── server/ # Express backend
│ ├── controllers/
│ │ └── progressControllers.js
│ ├── models/
│ │ └── Progress.js
│ ├── routes/
│ │ └── progressRoutes.js
│ ├── server.js
│ └── .env

---

## Demo Video

https://www.youtube.com/watch?v=2WzkHApaUEo&t

---

