export type ColumnId = 'todo' | 'inprogress' | 'done'

export type Card = {
  id: string
  text: string
  columnId: ColumnId
  createdAt: number
}

export type Column = {
  id: ColumnId
  title: string
}
