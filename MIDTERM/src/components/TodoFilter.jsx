const FILTERS = [
  {value: 'all', label: 'All'},
  {value: 'active', label: 'To try'},
  {value: 'done', label: 'Visited'},
]

// HW: implement a filter component that takes the current filter and a callback to change it
// An iOS-style segmented control: one grey track, the chosen button is a white
// pill sitting on it.
const TodoFilter = (props) => {
  const {filter, onChange} = props

  const renderedButtons = FILTERS.map((item) => {
    const isSelected = item.value === filter
    const style = isSelected
      ? 'bg-white text-apple-ink shadow-sm'
      : 'text-apple-gray'

    return (
      <button
        key={item.value}
        onClick={() => onChange(item.value)}
        aria-pressed={isSelected}
        className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition ${style}`}
      >
        {item.label}
      </button>
    )
  })

  return (
    <div className="mb-3 flex gap-1 rounded-xl bg-black/[0.06] p-1">
      {renderedButtons}
    </div>
  )
}

export default TodoFilter
