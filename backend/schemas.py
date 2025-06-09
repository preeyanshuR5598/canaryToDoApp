from pydantic import BaseModel

class TodoBase(BaseModel):
    title: str
    completed: bool = False
