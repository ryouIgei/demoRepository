import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { Category } from './data/botResponses'

export default function App() {
  const [category, setCategory] = useState<Category>('IT')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar selected={category} onSelect={setCategory} />
      <ChatWindow key={category} category={category} />
    </div>
  )
}
