export type Role = 'bot' | 'user'

export type Message = {
  id: number
  role: Role
  text: string
  time: string
}
