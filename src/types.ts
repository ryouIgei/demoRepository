export type CategoryId = 'it' | 'account' | 'remote' | 'leave' | 'salary' | 'expense'

export interface Category {
  id: CategoryId
  label: string
  icon: string
}

export interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: Date
}
