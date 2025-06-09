from sqlalchemy.orm import Session
from models import Todo
from schemas import TodoBase
from database import SessionLocal, engine, Base
# Create tables (only once)
Base.metadata.create_all(bind=engine)

def get_todos():
    db = SessionLocal()
    todos = db.query(Todo).all()
    db.close()
    return todos

def create_todo(todo: TodoBase):
    db = SessionLocal()
    db_todo = Todo(title=todo.title, completed=todo.completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    db.close()
    return db_todo

def update_todo(todo_id: int, todo: TodoBase):
    db = SessionLocal()
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo:
        db_todo.title = todo.title
        db_todo.completed = todo.completed
        db.commit()
        db.refresh(db_todo)
    db.close()
    return db_todo

def delete_todo(todo_id: int):
    db = SessionLocal()
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo:
        db.delete(db_todo)
        db.commit()
    db.close()
    return {"deleted": True}
