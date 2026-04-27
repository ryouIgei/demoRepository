import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { Category } from './utils/botResponses'
import './App.css'

export default function App() {
  const [category, setCategory] = useState<Category>('IT')

  return (
    <div className="app-layout">
      <Sidebar activeCategory={category} onSelect={setCategory} />
      <ChatWindow category={category} />
    </div>
  )
}
