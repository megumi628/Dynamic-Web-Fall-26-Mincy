const OPTIONS = [
  {value: 'az', label: 'A to Z'},
  {value: 'rating', label: 'Top rated'},
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
      className="select-apple min-w-0 flex-1 sm:flex-none"
    >
      {renderedOptions}
    </select>
  )
}

export default TodoSort
