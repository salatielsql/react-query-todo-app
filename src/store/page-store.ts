import { useReducer } from 'react'

const ACTION_TYPES = {
  'set-filters': 'set-filters',
  'set-selected-todo-id': 'set-selected-todo-id',
} as const

type PageStoreState = {
  todosFilters: Record<string, string> | undefined
  selectedTodoId: string | null
}

type Action = { type: keyof typeof ACTION_TYPES; state: unknown }

/**
 * @function usePageStore
 * Responsable to store Client States from the ToDos page such as filters and which todo is selected
 */
export function usePageStore(): [PageStoreState, React.Dispatch<Action>] {
  return useReducer(reducer, {
    todosFilters: undefined,
    selectedTodoId: null,
  })
}

function reducer(state: PageStoreState, action: Action): PageStoreState {
  switch (action.type) {
    case 'set-filters':
      return {
        ...state,
        todosFilters: action.state as Record<string, string> | undefined,
      }

    case 'set-selected-todo-id':
      return {
        ...state,
        selectedTodoId: action.state as string | null,
      }

    default:
      return state
  }
}
