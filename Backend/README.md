# Quiz App Backend

A full-stack quiz application backend with role-based access (Admin/User), quiz creation (with optional AI assistance), tagging, user quiz-taking, scoring, and a chatbot for post-quiz discussion.

---

## 🚀 Features

- **Role-based access:** Admin and User roles with JWT authentication
- **Admin:** Create, update, delete, and tag quizzes; generate quizzes with AI Assist (OpenAI)
- **User:** View and attempt quizzes (once per quiz), see score after submission
- **Chatbot:** Post-quiz discussion powered by OpenAI
- **Validation:** All major endpoints validated
- **Rate limiting & logging:** Protects API and logs requests
- **API Docs:** Swagger UI at `/api-docs`

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + Role-based
- **AI/LLM:** OpenAI API
- **Docs:** Swagger UI

---

## ⚙️ Setup Instructions

1. **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd Quiz-App/Backend
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the `Backend` folder based on `.env.example`:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key
    PORT=5000
    ```

4. **Run the server**
    ```bash
    npm start
    ```
    or for development:
    ```bash
    npx nodemon server.js
    ```

5. **Access API documentation**
    - Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) in your browser.

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
- `POST /api/ai/generate-quiz` — Generate quiz with AI (Admin)
- `POST /api/chatbot/ask` — Chatbot question (User, after quiz)

---

## 🔑 AI Keys Note

- You need an OpenAI API key for AI Assist and chatbot features.
- Get your key from [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
- Add it to your `.env` as `OPENAI_API_KEY`.

---

## 📝 .env.example

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

---

## 🧑‍💻 Author & Contact

- Assignment by [eubrics.com](https://eubrics.com)
- For questions: maxim@eubrics.com

---

## 📹 Submission

- Push your code to GitHub and share the repo link.
- (Bonus) Deploy and share the live URL and credentials.
- If not hosted, send a screen recording (e.g., Loom) showing the app in action.