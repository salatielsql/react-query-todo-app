import { useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

// COMPONENTS
import { TodoList } from './components/TodoList'
import { TodoDetails } from './components/TodoDetails'
import { TodoFilters } from './components/TodoFilters'

// STORES
import { usePageStore } from './store/page-store'

// SERVICES
import { getTodoById, getTodos, createTodo } from './services/todos'

function TodoApp() {
  const input = useRef<HTMLInputElement>(null)
  /**
   * My store abstration to store Client State
   */
  const [{ selectedTodoId, todosFilters }, pageDispatch] = usePageStore()

  /**
   * React Query now is my Server State / Data Layer abstration
   */
  const todosQuery = useQuery(['todos', todosFilters], () =>
    getTodos(todosFilters)
  )

  const todoDetailQuery = useQuery(
    ['todos-detail', selectedTodoId],
    () => getTodoById(selectedTodoId),
    { enabled: !!selectedTodoId }
  )

  const createTodoMutation = useMutation({
    mutationFn: (todoTitle: string) => createTodo(todoTitle),
    onSuccess: (todo) => {
      todosQuery.refetch()
      alert(`Todo "${todo?.title}" created! #${todo?.id}`)
    },
  })

  return (
    <>
      <h1>My todo list:</h1>

      <TodoFilters
        titleValue={todosFilters?.title}
        selectedTag={todosFilters?.tag}
        onTitleChange={(value) =>
          pageDispatch({ type: 'set-filters', state: { title: value } })
        }
        onTagChange={(value) =>
          pageDispatch({ type: 'set-filters', state: { tag: value } })
        }
      />

      <TodoList
        todos={todosQuery.data}
        isLoading={todosQuery.isLoading}
        hasError={todosQuery.isError}
        onTodoClick={(todoId: string) =>
          pageDispatch({ type: 'set-selected-todo-id', state: todoId })
        }
        onTryAgainPress={todosQuery.refetch}
      />

      <div>
        <input ref={input} placeholder="create a new todo" />
        <button
          disabled={createTodoMutation.isLoading}
          onClick={() => {
            if (input.current?.value) {
              createTodoMutation.mutate(input.current.value)
              input.current.value = ''
            }
          }}
        >
          {createTodoMutation.isLoading ? 'creating todo....' : 'create todo'}
        </button>
      </div>

      <TodoDetails
        todo={todoDetailQuery.data}
        isLoading={
          todoDetailQuery.isLoading &&
          todoDetailQuery.fetchStatus === 'fetching'
        }
        hasError={todoDetailQuery.isError}
        onTryAgainPress={todoDetailQuery.refetch}
      />
    </>
  )
}

export default TodoApp
