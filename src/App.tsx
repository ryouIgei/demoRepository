import { useState } from 'react';
import type { Category } from './types';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import './App.css';

function App() {
  const [category, setCategory] = useState<Category>('IT');
  return (
    <div className="layout">
      <Sidebar selected={category} onSelect={setCategory} />
      <ChatArea category={category} />
    </div>
  );
}

export default App;
