# DevMatch (Developer Tinder)

DevMatch is a full-stack web application designed as a "Tinder for Developers". It allows developers to create profiles, browse other developers on a feed, and send or receive connection requests to build their network.

## 🚀 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** & **daisyUI** for styling
- **Redux Toolkit** for state management
- **React Router DOM** for routing
- **Axios** for API requests

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JSON Web Tokens (JWT)** for authentication
- **Bcrypt** for secure password hashing
- **Cookie Parser** & **CORS** for secure cross-origin requests

---

## 🛠️ Features
- **User Authentication:** Secure Signup, Login, and Logout using JWT stored in HTTP-only cookies.
- **Profile Management:** Users can view and edit their profile details and change their password.
- **Developer Feed:** View a feed of other developers to connect with.
- **Connection Requests:**
  - Send "Interested" or "Ignored" requests to other developers.
  - Review incoming requests and mark them as "Accepted" or "Rejected".
- **Network Viewing:** See your accepted connections and pending requests.

---

## 💻 Running the Project Locally

### Prerequisites
- Node.js installed
- MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd devMatch
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure environment variables.

```bash
cd BACKEND
npm install
```

Create a `.env` file in the `BACKEND` directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3333
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:3333
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and configure environment variables.

```bash
cd FRONTEND
npm install
```

Create a `.env` file in the `FRONTEND` directory with the following variables:
```env
VITE_BASE_URL=http://localhost:3333
```

Start the frontend development server:
```bash
npm run dev
# App will run on http://localhost:5173
```

---

## 🌍 Deployment Guide
This project is configured and ready for production deployment!

1. **Frontend:** Deploy the `FRONTEND` folder to **Vercel** or **Netlify**. Ensure you set the `VITE_BASE_URL` environment variable to your deployed backend URL.
2. **Backend:** Deploy the `BACKEND` folder to **Render**, **Heroku**, or **Railway**. Ensure you set all the `.env` variables in their dashboard, setting `CLIENT_URL` to your deployed frontend URL.
