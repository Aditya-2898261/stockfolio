# Stockfolio 📈

A full-stack stock trading platform where users can sign up, buy and sell stocks, and manage their portfolio — built with React, Node.js, Express, and MongoDB.

---

## 🚀 Live Demo
> Coming soon after deployment

---

## ✨ Features

- **Authentication** — Secure signup and login using Passport.js with session-based auth
- **Watchlist** — Browse stocks with live price change indicators (green/red %)
- **Buy Stocks** — Purchase stocks via a clean modal popup with balance validation
- **Sell Stocks** — Sell holdings with quantity validation and real-time balance update
- **Portfolio** — View all holdings with current value and total investment
- **Balance Tracking** — User wallet balance updates on every buy/sell
- **Protected Routes** — Unauthorized users are redirected to login
- **Form Validation** — Joi validation on backend, HTML5 validation on frontend
- **Error Handling** — Custom ExpressError class with global error middleware
- **Landing Page** — Public marketing page with Get Started and Login CTAs

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Tailwind CSS
- Fetch API

**Backend:**
- Node.js
- Express.js
- Passport.js (passport-local, passport-local-mongoose)
- Express Session
- Joi (validation)

**Database:**
- MongoDB
- Mongoose

---

## 📁 Project Structure

```
stockfolio/
├── backend/
│   ├── controllers/
│   │   ├── stock.js
│   │   └── user.js
│   ├── models/
│   │   ├── holding.js
│   │   ├── stock.js
│   │   └── user.js
│   ├── routes/
│   │   ├── stock.js
│   │   └── user.js
│   ├── utils/
│   │   ├── ExpressError.js
│   │   ├── schema.js
│   │   └── wrapAsync.js
│   ├── middleware.js
│   ├── app.js
│   └── init.js
├── frontend/
│   └── src/
│       ├── components/
│       │   └── Navbar.jsx
│       └── pages/
│           ├── Landing.jsx
│           ├── Login.jsx
│           ├── Signup.jsx
│           ├── StockList.jsx
│           └── Portfolio.jsx
└── .gitignore
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### 1. Clone the repository
```bash
git clone https://github.com/Aditya-2898261/stockfolio.git
cd stock-trading-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGO_URL=mongodb://127.0.0.1:27017/zerodha
PORT=3000
SESSION_SECRET=your_secret_key_here
```

Seed the database with stocks:
```bash
node init.js
```

Start the backend server:
```bash
node app.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` in your browser.

---

## 🗄️ Database Design

| Model | Fields |
|-------|--------|
| User | username, email, password (hashed), balance |
| Stock | name, symbol, price, prevPrice |
| Holding | user (ref), stock (ref), quantity |

**Relationships:**
- User → Holdings: One-to-Squillions (userId stored in Holding)
- Stock → Holdings: One-to-Squillions (stockId stored in Holding)
- Cascading deletes via Mongoose pre middleware

---

## 🔐 Security Features

- Passwords hashed using passport-local-mongoose (pbkdf2)
- Session secret stored in `.env`
- HTTP-only cookies
- isLoggedIn middleware protecting all sensitive routes
- Joi schema validation on signup

---

## 📸 Screenshots
> Add screenshots here after deployment

---

## 👨‍💻 Author

**Aditya**
- GitHub: [@Aditya-2898261](https://github.com/Aditya-2898261)
