# BMI Health Tracker — EXP1-6

A full-stack BMI (Body Mass Index) Health Tracker built with React, Vite, Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
EXP1-6/
├── backend/
│   ├── node_modules/
│   ├── data.json
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── {components,pages,router}/
│   │   ├── components/
│   │   │   ├── BMICard.jsx
│   │   │   ├── BMICard.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── StatsWidget.jsx
│   │   │   └── StatsWidget.css
│   │   ├── pages/
│   │   │   ├── Home.jsx / Home.css
│   │   │   ├── Calculator.jsx / Calculator.css
│   │   │   ├── History.jsx / History.css
│   │   │   └── About.jsx / About.css
│   │   ├── router/
│   │   │   └── AppRouter.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas URI)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bmitracker
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000  
Backend runs at: http://localhost:5000

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Stats overview, recent entries, BMI reference chart |
| Calculator | `/calculator` | Calculate BMI, view advice, save to MongoDB |
| History | `/history` | Browse, filter, search, and delete all records |
| About | `/about` | Tech stack, BMI health guide, API endpoints |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bmi` | Get all records |
| POST | `/api/bmi` | Create new record |
| GET | `/api/bmi/:id` | Get single record |
| PUT | `/api/bmi/:id` | Update a record |
| DELETE | `/api/bmi/:id` | Delete a record |
| GET | `/api/stats` | Get stats and category counts |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router DOM, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Styling**: Pure CSS with CSS Variables
