# NoteTracker 📝

NoteTracker is a modern and responsive full-stack note-taking application where users can create, edit, delete, and manage personal notes with authentication support.

Built using React.js, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB.

---

## 🚀 Live Demo

Frontend:  
https://note-tracker-snowy.vercel.app/

Backend API:  
https://notetracker-2.onrender.com/api

---

# ✨ Features

- 🔐 User Authentication (Register/Login)
- 📝 Create Notes
- ✏️ Edit Notes
- 🗑️ Delete Notes
- 👤 Update User Profile
- ❌ Delete Account
- 🌙 Dark / Light Mode
- 📄 Pagination
- ⚡ Loading Skeleton UI
- 🔒 Protected Routes
- 📱 Fully Responsive Design
- 💬 Toast Notifications

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# 📂 Folder Structure

```bash
src
│
├── api
│   ├── authApi.js
│   ├── noteApi.js
│   └── axios.js
│
├── components
│   ├── notes
│   ├── user
│   ├── Navbar.jsx
│   ├── PaginationComp.jsx
│   ├── ProtectedRoute.jsx
│   └── ThemeToggle.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Note.jsx
│   └── PageNotFound.jsx
│
├── routes
│   └── router.jsx
│
├── utils
│   ├── storage.js
│   └── validators.js
│
├── App.jsx
└── main.jsx
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/ajaykumar1298/noteTracker.git
```

## 2️⃣ Move Into Project Folder

```bash
cd NoteTracker
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Start Development Server

```bash
npm run dev
```

---


# 🔑 Authentication Flow

- User registers/login
- User data stored in sessionStorage
- Protected routes prevent unauthorized access
- Auto redirect for logged-in users

---


# 📦 API Endpoints

## Auth Routes

```bash
POST    /auth/register
POST    /auth/login
PATCH   /auth/update-user
DELETE  /auth/remove-user
```

## Note Routes

```bash
GET     /note/all-notes
POST    /note/add
PATCH   /note/update/:id
DELETE  /note/remove/:id
```

---

# 🧠 Future Improvements

- Search Notes
- Filter Notes
- Pin Notes
- Favorite Notes


---

# 👨‍💻 Author

Ajay Kumar

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
