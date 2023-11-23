import { type Todo } from '../api/handlers'

export async function getTodos(filters?: Record<string, string>) {
  const searchParams = new URLSearchParams(filters)

  const response = await fetch(`/todos?${searchParams.toString()}`)

  const data: Todo[] = await response.json()

  return data
}

export async function getTodoById(todoId: string | null) {
  const response = await fetch(`/todos/${todoId}`)

  const data: Todo | null = await response.json()

  return data
}

export async function createTodo(todoTitle: string) {
  const response = await fetch(`/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: todoTitle }),
  })

  const data: Todo | null = await response.json()

  return data
}
