# 🎓 Campus Connect – Smart Student Engagement Portal
### Final Year Main Project | Full Setup Guide (A to Z)

---

## 📌 What is this project?
Campus Connect is a **web-based student portal** where:
- Students can see **events, notifications, exam schedules, results**
- Students can access **study notes and video links**
- Students can scroll an **Instagram-style campus feed**
- Faculty/Admin can **post events and announcements** via Admin Panel

---

## 🗂️ Project Structure
```
campus-connect/
├── frontend/
│   ├── index.html        ← Login Page
│   ├── dashboard.html    ← Student Dashboard
│   ├── events.html       ← Events & Exam Schedule
│   ├── notes.html        ← Study Resources
│   ├── feed.html         ← Campus Feed (Instagram-style)
│   ├── admin.html        ← Faculty/Admin Panel
│   └── style.css         ← All styles
│
├── backend/
│   ├── server.js         ← Express.js API server
│   ├── students.json     ← Student mock data
│   ├── events.json       ← Events mock data
│   ├── notes.json        ← Study resources mock data
│   └── package.json      ← Node.js config
│
└── README.md             ← This file
```

---

## 🛠️ STEP-BY-STEP SETUP GUIDE

---

### ✅ STEP 1 – Install Required Tools

**Install VS Code** (Code editor)
- Go to: https://code.visualstudio.com/
- Download and install for your OS (Windows/Mac/Linux)

**Install Node.js** (Backend runtime)
- Go to: https://nodejs.org/
- Download the **LTS version** (Long Term Support)
- After install, verify by opening Terminal/CMD and typing:
```bash
node -v       # Should print something like v20.x.x
npm -v        # Should print something like 10.x.x
```

**Install Git** (Version control)
- Go to: https://git-scm.com/
- Download and install
- Verify:
```bash
git --version
```

---

### ✅ STEP 2 – Open Project in VS Code

1. Extract/copy the `campus-connect` folder to your Desktop
2. Open **VS Code**
3. Click **File → Open Folder**
4. Select the `campus-connect` folder
5. You should see all files in the left panel

---

### ✅ STEP 3 – Open the Frontend (No Server Needed!)

The frontend works **directly in your browser** without any server!

**Method A – Simple (just double-click)**
1. Go to `frontend/` folder
2. Double-click `index.html`
3. It opens in your browser!

**Method B – VS Code Live Server (Recommended)**
1. In VS Code, go to **Extensions** (left panel icon)
2. Search "Live Server" → Install it
3. Right-click `index.html` → Click **"Open with Live Server"**
4. Browser opens at `http://127.0.0.1:5500/`

**Login credentials for testing:**
- Student: `student@campus.edu` / `1234`
- Admin: `admin@campus.edu` / `admin123`

---

### ✅ STEP 4 – Set Up the Backend

Open the **Terminal in VS Code** (Press `Ctrl + `` ` `` or go to Terminal → New Terminal)

```bash
# Navigate to the backend folder
cd backend

# Install all dependencies (express, cors)
npm install

# Start the server
npm start
```

You should see:
```
  ✅ Campus Connect Server Started!
  🌐 Open: http://localhost:3000
  🔗 API:  http://localhost:3000/api/events
```

**Test the API in your browser:**
- Open: `http://localhost:3000/api/students`
- Open: `http://localhost:3000/api/events`
- Open: `http://localhost:3000/api/notes`

---

### ✅ STEP 5 – Test API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/login` | Login with credentials |
| GET | `/api/events` | Get all events |
| GET | `/api/events?type=technical` | Filter by type |
| POST | `/api/events` | Add new event |
| DELETE | `/api/events/:id` | Delete event |
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes?year=4` | Filter by year |
| POST | `/api/notes` | Add resource |
| GET | `/api/announcements` | Get announcements |
| POST | `/api/announcements` | Post announcement |
| GET | `/api/health` | Check server health |

**Use Postman or Thunder Client (VS Code extension) to test POST/DELETE routes.**

---

### ✅ STEP 6 – Using nodemon (Auto Restart)

Instead of restarting the server every time you change `server.js`:

```bash
# Install nodemon globally
npm install -g nodemon

# Then run with:
npm run dev
```

---

## 🌐 HOSTING – Deploy for FREE

---

### 🔵 Host Frontend on GitHub Pages

**Step 1 – Create a GitHub account**
- Go to: https://github.com/ → Sign up

**Step 2 – Create a repository**
1. Click `+` → New Repository
2. Name it: `campus-connect`
3. Set to **Public**
4. Click **Create Repository**

**Step 3 – Push your code**
Open Terminal in VS Code in the `campus-connect` folder:
```bash
git init
git add .
git commit -m "Initial commit – Campus Connect"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/campus-connect.git
git push -u origin main
```

**Step 4 – Enable GitHub Pages**
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select `main` branch → `/frontend` folder
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/campus-connect/`

---

### 🟠 Host Backend on Render (Free)

**Step 1 – Create Render account**
- Go to: https://render.com/ → Sign up with GitHub

**Step 2 – Create New Web Service**
1. Click **New** → **Web Service**
2. Connect your GitHub repo
3. Set settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Click **Create Web Service**
5. Your backend will be live at: `https://campus-connect-xyz.onrender.com`

**Step 3 – Update frontend API URLs**
In your HTML files, change API calls from:
```javascript
fetch('http://localhost:3000/api/events')
```
To:
```javascript
fetch('https://your-render-url.onrender.com/api/events')
```

---

## 🖥️ Pages Overview

| Page | File | Who Uses It |
|------|------|-------------|
| Login | `index.html` | Everyone |
| Dashboard | `dashboard.html` | Students |
| Events | `events.html` | Students |
| Study Resources | `notes.html` | Students |
| Campus Feed | `feed.html` | Students |
| Admin Panel | `admin.html` | Faculty/Admin |

---

## 🧩 How to Customize

**Change college name:**
Search for `Campus Connect` in all files and replace with your college name.

**Add your own events:**
Edit `backend/events.json` — add a new object following the same format.

**Add study notes:**
Edit `backend/notes.json` — add your real Google Drive PDF links.

**Change color theme:**
Edit `frontend/style.css` → Change the `:root` variables:
```css
:root {
  --primary: #4f46e5;   /* Change to your college color */
  --secondary: #06b6d4;
  --accent: #f59e0b;
}
```

---

## 📊 For Your Project Report

**Problem Statement:**
Students lack a centralized platform for events, resources, and campus updates, leading to missed opportunities and poor engagement.

**Solution:**
Campus Connect – a web portal integrating event management, study resources, and social feed in one place.

**Tech Stack:**
- Frontend: HTML5, CSS3, Bootstrap, JavaScript (Vanilla)
- Backend: Node.js, Express.js
- Data Storage: JSON files (mock database)
- Hosting: GitHub Pages (frontend), Render (backend)
- Design: CSS Variables, Font Awesome, Google Fonts

**Architecture:**
```
Browser (HTML/CSS/JS)
        ↓ HTTP Requests
Express.js Server (Node.js)
        ↓ Read/Write
JSON Files (students.json, events.json, notes.json)
```

---

## 🚀 Future Scope

1. **Real Database** – Replace JSON with MongoDB Atlas (free tier)
2. **Push Notifications** – Using Firebase Cloud Messaging
3. **Mobile App** – React Native or Flutter version
4. **AI Recommendations** – Suggest events/notes based on student history
5. **Real Authentication** – JWT tokens + bcrypt password hashing
6. **Email Alerts** – Nodemailer for exam/event reminders

---

## ❓ Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| `npm not found` | Install Node.js from nodejs.org |
| Port 3000 already in use | Change `PORT = 3001` in server.js |
| CORS error in browser | Already handled — cors middleware is added |
| Files not updating | Hard refresh browser: `Ctrl+Shift+R` |
| Live Server not working | Right-click index.html → Open with Live Server |

---

**Made with ❤️ for Final Year Project**
