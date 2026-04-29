export type Role = 'bot' | 'user';

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
}
