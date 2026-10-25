// a dropdown that picks which cuisine to show; 'all' means no filtering.
// `categories` comes from App, which works it out from the restaurants.
const CategoryFilter = (props) => {
  const {categories, category, onChange} = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const renderedOptions = categories.map((name) => {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    )
  })

  return (
    <select
      value={category}
      onChange={handleChange}
      className="select-apple min-w-0 flex-1 sm:flex-none"
    >
      <option value="all">All cuisines</option>
      {renderedOptions}
    </select>
  )
}

export default CategoryFilter
