import { useState } from 'react'
import type { Card, ColumnId } from './types'

type Props = {
  column: { id: ColumnId; title: string }
  cards: Card[]
  columns: { id: ColumnId; title: string }[]
  onAdd: (text: string) => void
  onDelete: (id: string) => void
  onMove: (id: string, to: ColumnId) => void
  onDragStart: (id: string) => void
  onDrop: () => void
}

export function KanbanColumn({
  column,
  cards,
  columns,
  onAdd,
  onDelete,
  onMove,
  onDragStart,
  onDrop,
}: Props) {
  const [input, setInput] = useState('')
  const [over, setOver] = useState(false)

  function handleAdd() {
    const text = input.trim()
    if (!text) return
    onAdd(text)
    setInput('')
  }

  return (
    <div
      className={`column ${over ? 'drag-over' : ''}`}
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={() => { setOver(false); onDrop() }}
    >
      <div className="column-header">
        <span className="column-title">{column.title}</span>
        <span className="column-count">{cards.length}</span>
      </div>

      <div className="cards">
        {cards.map(card => (
          <div
            key={card.id}
            className="card"
            draggable
            onDragStart={() => onDragStart(card.id)}
          >
            <p>{card.text}</p>
            <div className="card-actions">
              {columns
                .filter(c => c.id !== column.id)
                .map(c => (
                  <button
                    key={c.id}
                    className="move-btn"
                    onClick={() => onMove(card.id, c.id)}
                  >
                    → {c.title}
                  </button>
                ))}
              <button className="delete-btn" onClick={() => onDelete(card.id)}>
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-area">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleAdd()
            }
          }}
          placeholder="カードを追加..."
          rows={2}
        />
        <button onClick={handleAdd}>追加</button>
      </div>
    </div>
  )
}
