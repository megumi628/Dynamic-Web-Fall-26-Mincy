const FILTERS = [
  {value: 'all', label: 'All'},
  {value: 'active', label: 'Active'},
  {value: 'done', label: 'Done'},
]

// HW: implement a filter component that takes the current filter and a callback to change it
const TodoFilter = (props) => {
  const {filter, onChange} = props

  const renderedButtons = FILTERS.map((item) => {
    const isSelected = item.value === filter
    const style = isSelected
      ? 'bg-blue-900 text-white'
      : 'bg-gray-100 text-gray-700'

    return (
      <button
        key={item.value}
        onClick={() => onChange(item.value)}
        className={`px-4 py-1 rounded text-sm ${style}`}
      >
        {item.label}
      </button>
    )
  })

  return <div className="flex gap-2 mb-4">{renderedButtons}</div>
}

export default TodoFilter
