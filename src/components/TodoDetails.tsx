import { type Todo } from '../api/handlers'

export function TodoDetails(props: {
  todo: Todo | null
  isLoading: boolean
  hasError: boolean
  onTryAgainPress(): void
}) {
  if (!props.isLoading && !props.hasError && !props.todo) return null

  return (
    <div
      style={{
        border: '1px solid white',
        padding: 24,
        marginTop: 32,
        borderRadius: 8,
      }}
    >
      <h2>{props.todo?.title}</h2>
      {/* if is not loading and has error show the error feedback */}
      {!props.isLoading && props.hasError && (
        <div>
          Can't load todo right now. Try again later
          <br />
          <button onClick={props.onTryAgainPress}>Try again</button>
        </div>
      )}

      {/* If is loading show the loading */}
      {props.isLoading && <div>Loading todo details...</div>}

      {/* If is not loading and has todos show the todo detail */}
      {!props.isLoading && props.todo && (
        <>
          <table>
            <tbody>
              <tr>
                <td>Assignee:</td>
                <td>
                  <strong>{props.todo.assignee}</strong>
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{props.todo.done ? '✅ done' : '▢ to do'}</td>
              </tr>
              <tr>
                <td>Tags:</td>
                <td>{props.todo.tags.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
