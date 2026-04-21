import { useState, useEffect } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  done: boolean
}

const STORAGE_KEY = 'demo-todo-app:todos'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    const text = input.trim()
    if (!text) return
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
    setInput('')
  }

  function toggleTodo(id: number) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <h1>タスク管理</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスクを入力..."
        />
        <button onClick={addTodo}>追加</button>
      </div>

      {todos.length === 0 ? (
        <p className="empty">タスクはありません</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="stats">
        {todos.filter(t => t.done).length} / {todos.length} 完了
      </p>
    </div>
  )
}
