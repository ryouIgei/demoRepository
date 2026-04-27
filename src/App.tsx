import { useState, useCallback } from 'react';
import type { Category, Message } from './types';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { getBotResponse, suggestsByCategory, defaultSuggests } from './data/responses';
import styles from './App.module.css';

const WELCOME: Message = {
  id: 'welcome',
  role: 'bot',
  text: 'こんにちは！社内サポートボットです。左のカテゴリを選ぶか、下のサジェストをクリック、または直接ご質問を入力してください。',
  timestamp: new Date(),
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const suggests = activeCategory ? suggestsByCategory[activeCategory] : defaultSuggests;
  const headerLabel = activeCategory ? `${activeCategory} サポート` : '社内サポートチャット';

  const handleSend = useCallback((text: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = getBotResponse(text);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  }, []);

  const handleCategorySelect = useCallback((category: Category) => {
    setActiveCategory(category);
    const botMsg: Message = {
      id: `b-cat-${Date.now()}`,
      role: 'bot',
      text: `「${category}」カテゴリを選択しました。よくある質問を下に表示しています。お気軽にご質問ください！`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar activeCategory={activeCategory} onSelect={handleCategorySelect} />
      <ChatArea
        messages={messages}
        suggests={suggests}
        isTyping={isTyping}
        onSend={handleSend}
        categoryLabel={headerLabel}
      />
    </div>
  );
}
