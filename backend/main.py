from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import crud
from schemas import TodoBase

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (frontend)
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/todos/")
def get_todos():
    return crud.get_todos()

@app.post("/todos/")
def create_todo(todo: TodoBase):
    return crud.create_todo(todo)

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: TodoBase):
    return crud.update_todo(todo_id, todo)

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    return crud.delete_todo(todo_id)
