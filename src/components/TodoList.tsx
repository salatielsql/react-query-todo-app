import { type Todo } from '../api/handlers'

export function TodoList(props: {
  todos: Todo[] | null
  isLoading: boolean
  hasError: boolean
  onTodoClick(todoId: string): void
  onTryAgainPress(): void
}) {
  return (
    <div style={{ marginTop: 24 }}>
      {/* if is not loading and has error show the error feedback */}
      {!props.isLoading && props.hasError && (
        <div>
          Oops! something went wrong!
          <br />
          <button onClick={props.onTryAgainPress}>Try again</button>
        </div>
      )}

      {/* If is loading show the loading */}
      {props.isLoading && <div>Loading todos...</div>}

      {/* If is not loading and has todos show the list of todos items */}
      {!props.isLoading && props.todos && props.todos.length > 0 && (
        <ul style={{ padding: 0 }}>
          {props.todos.map((todo) => (
            <li key={todo.id}>
              <a
                href="#"
                style={{ color: '#fff' }}
                onClick={() => props.onTodoClick(todo.id)}
              >
                {todo.done ? '✅' : '▢'} {todo.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
