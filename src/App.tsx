import { useCallback, useEffect } from 'react'

// STORES
import { TodoList } from './components/TodoList'
import { TodoDetails } from './components/TodoDetails'

// COMPONENTS
import { getTodoById, getTodos } from './services/todos'
import { useTodos } from './store/todos'
import { usePageStore } from './store/page-store'
import { TodoFilters } from './components/TodoFilters'

function TodoApp() {
  /**
   * My store abstration to store Server State
   */
  const [todosStore, todosDispatch] = useTodos()

  /**
   * My store abstration to store Client State
   */
  const [pageState, pageDispatch] = usePageStore()

  const fetchTodos = useCallback(
    async (filters: Record<string, string> | null) => {
      todosDispatch({ type: 'set-todos-loading', state: true })
      todosDispatch({ type: 'set-todos-error', state: false })

      try {
        const data = await getTodos(filters || undefined)

        todosDispatch({ type: 'set-todos', state: data })
        todosDispatch({ type: 'set-todos-loading', state: false })
      } catch (e) {
        todosDispatch({ type: 'set-todos-error', state: true })
        todosDispatch({ type: 'set-todos-loading', state: false })
        todosDispatch({ type: 'set-todos', state: null })
      }
    },
    [todosDispatch]
  )

  const fetchTodoById = useCallback(
    async (todoId: string) => {
      todosDispatch({ type: 'set-todo-loading', state: true })
      todosDispatch({ type: 'set-todo-error', state: false })
      todosDispatch({ type: 'set-todo', state: null })

      try {
        const data = await getTodoById(todoId)

        todosDispatch({ type: 'set-todo', state: data })
        todosDispatch({ type: 'set-todo-loading', state: false })
      } catch (e) {
        todosDispatch({ type: 'set-todo', state: null })
        todosDispatch({ type: 'set-todo-error', state: true })
        todosDispatch({ type: 'set-todo-loading', state: false })
      }
    },
    [todosDispatch]
  )

  useEffect(() => {
    fetchTodos(pageState.todosFilters)
  }, [fetchTodos, pageState.todosFilters])

  useEffect(() => {
    if (pageState.selectedTodoId) {
      fetchTodoById(pageState.selectedTodoId)
    }
  }, [fetchTodoById, pageState.selectedTodoId])
  console.log(pageState)
  return (
    <>
      <h1>My todo list:</h1>

      <TodoFilters
        titleValue={pageState.todosFilters?.title}
        selectedTag={pageState.todosFilters?.tag}
        onTitleChange={(value) =>
          pageDispatch({ type: 'set-filters', state: { title: value } })
        }
        onTagChange={(value) =>
          pageDispatch({ type: 'set-filters', state: { tag: value } })
        }
      />

      <TodoList
        todos={todosStore.todos}
        isLoading={todosStore.isTodosLoading}
        hasError={todosStore.hasTodosError}
        onTodoClick={(todoId: string) =>
          pageDispatch({ type: 'set-selected-todo-id', state: todoId })
        }
        onTryAgainPress={() => fetchTodos(pageState.todosFilters)}
      />

      <TodoDetails
        todo={todosStore.todo}
        isLoading={todosStore.isTodoLoading}
        hasError={todosStore.hasTodoError}
        onTryAgainPress={() => {
          if (pageState.selectedTodoId) fetchTodoById(pageState.selectedTodoId)
        }}
      />
    </>
  )
}

export default TodoApp
