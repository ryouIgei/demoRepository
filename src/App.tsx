import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { categories, type Category } from './data/responses'
import styles from './App.module.css'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('IT')
  const currentCategory = categories.find((c) => c.id === activeCategory)!

  return (
    <div className={styles.layout}>
      <Sidebar activeCategory={activeCategory} onSelect={setActiveCategory} />
      <ChatArea key={activeCategory} category={currentCategory} />
    </div>
  )
}
