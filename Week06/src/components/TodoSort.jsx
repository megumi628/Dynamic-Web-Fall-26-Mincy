const OPTIONS = [
  {value: 'newest', label: 'Newest first'},
  {value: 'oldest', label: 'Oldest first'},
  {value: 'az', label: 'A to Z'},
]

// HW: implement a sort component that takes the current sort and a callback to change it
const TodoSort = (props) => {
  const {sort, onChange} = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const renderedOptions = OPTIONS.map((option) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )
  })

  return (
    <select
      value={sort}
      onChange={handleChange}
      className="border border-gray-300 rounded px-2 py-1 text-sm"
    >
      {renderedOptions}
    </select>
  )
}

export default TodoSort
