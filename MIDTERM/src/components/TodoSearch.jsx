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
      placeholder="Search"
      className="input-apple min-w-0 flex-1"
    />
  )
}

export default TodoSearch
