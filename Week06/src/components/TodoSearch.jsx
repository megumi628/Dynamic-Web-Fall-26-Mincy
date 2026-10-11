// HW: implement a search component that takes the current search string and a callback to change it
const TodoSearch = (props) => {
  const {search, onChange} = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <input
      type="text"
      value={search}
      onChange={handleChange}
      placeholder="Search todos..."
      className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
    />
  )
}

export default TodoSearch
