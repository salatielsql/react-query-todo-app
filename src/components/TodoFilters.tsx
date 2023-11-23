export function TodoFilters(props: {
  titleValue?: string
  onTitleChange?: (value: string) => void
  selectedTag?: string
  onTagChange?: (value: string) => void
}) {
  return (
    <div style={{ display: 'flex' }}>
      <input
        placeholder="filter by title"
        value={props.titleValue || ''}
        onChange={(event) => props.onTitleChange?.(event.target.value)}
      />

      <select
        onChange={(event) => {
          props.onTagChange?.(event.target.value)
        }}
        value={props.selectedTag}
      >
        <option value="" selected={!props.selectedTag} disabled>
          filter by tag
        </option>
        <option
          value="react-query"
          selected={props.selectedTag === 'react-query'}
        >
          react-query
        </option>
        <option value="vscode" selected={props.selectedTag === 'react-query'}>
          vscode
        </option>
        <option value="figma" selected={props.selectedTag === 'react-query'}>
          figma
        </option>
        <option value="discord" selected={props.selectedTag === 'react-query'}>
          discord
        </option>
      </select>
    </div>
  )
}
