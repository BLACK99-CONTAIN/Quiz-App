# Quiz App

A full-stack quiz application with user authentication, admin features, AI-powered quiz generation, and a chatbot for quiz discussion.

---

## 🚀 Features

- **User & Admin roles** with JWT authentication
- **Admin:** Create, update, delete, and tag quizzes; generate quizzes with Gemini AI
- **User:** View and attempt quizzes, see scores, chat with AI after quiz
- **AI Quiz Generation:** Generate quizzes using Google Gemini API
- **Chatbot:** Post-quiz discussion powered by Gemini AI
- **Validation & Security:** Input validation, rate limiting, and logging
- **API Docs:** Swagger UI at `/api-docs`

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Material UI
- **Backend:** Node.js + Express + Mongoose
- **Database:** MongoDB
- **Auth:** JWT + Role-based
- **AI/LLM:** Google Gemini API

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Quiz-App
```

### 2. Install dependencies

```bash
cd Backend
npm install
cd ../Frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `Backend` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

### 4. Run the servers

**Backend:**
```bash
cd Backend
npm start
```
or for development:
```bash
npx nodemon server.js
```

**Frontend:**
```bash
cd ../Frontend
npm run dev
```

---

## 📚 API Endpoints

See [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for full interactive documentation.

**Main endpoints:**
- `POST /api/auth/register` — Register (Admin/User)
- `POST /api/auth/login` — Login
- `GET /api/quizzes` — List all quizzes
- `GET /api/quizzes/:id` — Get quiz by ID
- `POST /api/quizzes` — Create quiz (Admin)
- `PUT /api/quizzes/:id` — Update quiz (Admin)
- `DELETE /api/quizzes/:id` — Delete quiz (Admin)
- `POST /api/attempts` — Submit quiz attempt (User)
- `GET /api/attempts` — Get user's attempts
- `POST /api/ai/generate-quiz`— Generate quiz with AI (Admin)
- `POST /api/chatbot/ask` — Chatbot question (User, after quiz)

---

## 🔑 AI Keys Note

- You need a Google Gemini API key for AI features.
- Get your key from [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Add it to your `.env` as `GEMINI_API_KEY`.

---

## 🧑‍💻 Author & Contact

- Assignment by [eubrics.com](https://eubrics.com)
- For questions: maxim@eubrics.com

---

## 📹 Submission

- Push your code to GitHub and share the repo link.
- (Bonus) Deploy and share the live URL and credentials.
- If not hosted, send a screen recording (e.g., Loom) showing the app in action.