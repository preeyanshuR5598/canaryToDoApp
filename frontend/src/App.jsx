import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Checkbox } from './components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Loader2, Pencil, Trash2, X, Check } from 'lucide-react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/todos/')
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/todos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const toggleTodo = async (id, completed, title) => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: !completed }),
    });
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !completed } : todo
    ));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveEdit = async (id, completed) => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, completed }),
    });
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: editTitle } : todo
    ));
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-muted">
      <Card className="w-full max-w-xl mt-10">
        <CardHeader>
          <CardTitle className="text-orange-600">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTodo} className="flex gap-2 mb-4">
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Add a new todo"
              required
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Add
            </Button>
          </form>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin w-6 h-6 text-orange-500" />
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center gap-2 p-2 rounded hover:bg-accent">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id, todo.completed, todo.title)}
                  />
                  {editingId === todo.id ? (
                    <>
                      <Input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => saveEdit(todo.id, todo.completed)}
                        className="text-green-600"
                        title="Save"
                        type="button"
                      >
                        <Check size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={cancelEdit}
                        className="text-gray-500"
                        title="Cancel"
                        type="button"
                      >
                        <X size={18} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.title}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(todo.id, todo.title)}
                        className="text-blue-600"
                        title="Edit"
                        type="button"
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600"
                        title="Delete"
                        type="button"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
