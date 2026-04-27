export type Category = 'IT' | 'アカウント' | 'リモート' | '休暇' | '給与' | '経費';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface SuggestChip {
  label: string;
  query: string;
}
