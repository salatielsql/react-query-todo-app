import { type Todo } from '../api/handlers'

export async function getTodos(filters?: Record<string, string>) {
  const searchParams = new URLSearchParams(filters)

  const response = await fetch(`/todos?${searchParams.toString()}`)

  const data: Todo[] = await response.json()

  return data
}

export async function getTodoById(todoId: string) {
  const response = await fetch(`/todos/${todoId}`)

  const data: Todo | null = await response.json()

  return data
}
