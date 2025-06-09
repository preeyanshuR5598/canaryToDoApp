# Canary Todo Application

A fullstack Todo Application built as an assignment, using **FastAPI** (Python), **React** (Vite), **shadcn/ui**, **Tailwind CSS**, and **SQLite**.

---

## Features

- Add, edit, delete, and mark todos as completed
- Responsive UI using shadcn/ui and Tailwind CSS
- RESTful API with FastAPI and SQLite
- CORS enabled for frontend-backend communication

---

## Tech Stack & Versions

- **Python:** 3.11+ (recommended)
- **FastAPI:** 0.110+  
- **React:** 19.x (with Vite)
- **shadcn/ui:** 2.x
- **Tailwind CSS:** 4.x
- **SQLite:** 3.x (bundled with Python)
- **lucide-react:** 0.513+

---

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd canary-todo-app
```

---

### 2. Backend Setup

```sh
cd backend
python -m venv venv
# Activate venv:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

- The backend will run at `http://localhost:8000`
- The SQLite database file will be created in the backend directory (see `database.py` for the filename).

---

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

- The frontend will run at `http://localhost:5173` (default Vite port).

---

## Project Structure

```
canary-todo-app/
│
├── backend/
│   ├── main.py
│   ├── crud.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── venv/
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       └── ui/
    ├── package.json
    └── ...
```

---

## API Endpoints

- `GET /todos/` - List all todos
- `POST /todos/` - Create a new todo
- `PUT /todos/{todo_id}` - Update a todo
- `DELETE /todos/{todo_id}` - Delete a todo

---

## Useful Links

- [shadcn/ui documentation](https://ui.shadcn.com/)
- [Canary Frontend Boilerplate](https://github.com/canarymail/canary-frontend-boilerplate)
- [Canary Backend Boilerplate](https://github.com/canarymail/canary-backend-boilerplate)

---
