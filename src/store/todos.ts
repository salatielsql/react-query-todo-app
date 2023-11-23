import { useReducer } from 'react'
import { type Todo } from '../api/handlers'

const ACTION_TYPES = {
  'set-todos': 'set-todos',
  'set-todos-error': 'set-todos-error',
  'set-todos-loading': 'set-todos-loading',
  'set-todo': 'set-todo',
  'set-todo-loading': 'set-todo-loading',
  'set-todo-error': 'set-todo-error',
} as const

type TodoStoreState = {
  todosFilters: Record<string, string> | null
  selectedTodoId: string | null
  todos: Todo[] | null
  isTodosLoading: boolean
  hasTodosError: boolean
  todo: Todo | null
  hasTodoError: boolean
  isTodoLoading: boolean
}

type Action = { type: keyof typeof ACTION_TYPES; state: unknown }

/**
 * @function useTodos
 * Responsable to store Server State related to ToDos fetch responses
 */
export function useTodos(): [TodoStoreState, React.Dispatch<Action>] {
  return useReducer(reducer, {
    todosFilters: null,
    todos: null,
    hasTodosError: false,
    isTodosLoading: true,
    selectedTodoId: null,
    todo: null,
    hasTodoError: false,
    isTodoLoading: false,
  })
}

function reducer(state: TodoStoreState, action: Action): TodoStoreState {
  switch (action.type) {
    case 'set-todos':
      return {
        ...state,
        todos: action.state as Todo[] | null,
      }

    case 'set-todos-error':
      return {
        ...state,
        hasTodosError: action.state as boolean,
      }

    case 'set-todos-loading':
      return { ...state, isTodosLoading: action.state as boolean }

    case 'set-todo':
      return {
        ...state,
        todo: action.state as Todo | null,
      }

    case 'set-todo-loading':
      return { ...state, isTodoLoading: action.state as boolean }

    case 'set-todo-error':
      return {
        ...state,
        hasTodoError: action.state as boolean,
      }

    default:
      return state
  }
}
