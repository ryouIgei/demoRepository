import { useState } from 'react'
import type { Card, ColumnId } from './types'
import { KanbanColumn } from './KanbanColumn'
import './App.css'

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'ToDo' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

const STORAGE_KEY = 'kanban:cards'

function loadCards(): Card[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Card[]) : []
  } catch {
    return []
  }
}

function saveCards(cards: Card[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
}

export default function App() {
  const [cards, setCards] = useState<Card[]>(loadCards)
  const [dragId, setDragId] = useState<string | null>(null)

  function update(next: Card[]) {
    setCards(next)
    saveCards(next)
  }

  function addCard(columnId: ColumnId, text: string) {
    const card: Card = {
      id: crypto.randomUUID(),
      text,
      columnId,
      createdAt: Date.now(),
    }
    update([...cards, card])
  }

  function deleteCard(id: string) {
    update(cards.filter(c => c.id !== id))
  }

  function moveCard(id: string, to: ColumnId) {
    update(cards.map(c => (c.id === id ? { ...c, columnId: to } : c)))
  }

  function onDrop(columnId: ColumnId) {
    if (dragId) moveCard(dragId, columnId)
    setDragId(null)
  }

  return (
    <div className="board">
      <h1>Kanban Board</h1>
      <div className="columns">
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            column={col}
            cards={cards.filter(c => c.columnId === col.id)}
            columns={COLUMNS}
            onAdd={text => addCard(col.id, text)}
            onDelete={deleteCard}
            onMove={moveCard}
            onDragStart={setDragId}
            onDrop={() => onDrop(col.id)}
          />
        ))}
      </div>
    </div>
  )
}
