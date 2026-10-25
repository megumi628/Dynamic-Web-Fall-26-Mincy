import {useState} from 'react'
import TodoEdit from './TodoEdit'

// 0 means "not rated yet"; 1-5 are stars
const RATINGS = [0, 1, 2, 3, 4, 5]

const TodoItem = (props) => {
  const {todo, categories, categoryColors, onDelete, onEdit, onToggle, onRate} =
    props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    onDelete(todo.id)
  }

  //HW: toggle the done status of a todo, with optimistic update and error handling
  const handleToggle = () => {
    onToggle(todo.id, !todo.done)
  }

  // select values are always strings, so turn "4" back into 4 before it
  // goes up -- the server should store a number
  const handleRate = (event) => {
    onRate(todo.id, Number(event.target.value))
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, changes) => {
    onEdit(id, changes)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return (
      <TodoEdit todo={todo} categories={categories} onSubmit={handleSubmit} />
    )
  }

  const renderedRatings = RATINGS.map((stars) => {
    return (
      <option key={stars} value={stars}>
        {stars === 0 ? 'Rate it' : '★'.repeat(stars)}
      </option>
    )
  })

  return (
    <div className="flex items-start justify-between gap-3 px-4 py-3.5">
      <div className="flex min-w-0 items-start gap-3">
        <input
          type="checkbox"
          checked={Boolean(todo.done)}
          onChange={handleToggle}
          aria-label={`Mark ${todo.title} as visited`}
          className="check-apple mt-0.5"
        />
        <div className="min-w-0">
          {/* plain text now: the name no longer opens Google Maps */}
          <p
            className={`break-words text-[17px] font-medium leading-snug ${
              todo.done ? 'text-apple-gray' : 'text-apple-ink'
            }`}
          >
            {todo.title}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {todo.category && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  categoryColors[todo.category]
                }`}
              >
                {todo.category}
              </span>
            )}
            {/* only a place you have actually been to can be rated */}
            {todo.done && (
              <select
                value={todo.rating || 0}
                onChange={handleRate}
                aria-label={`Rating for ${todo.title}`}
                className="select-apple py-1 pl-2.5 pr-7 text-sm text-amber-500"
              >
                {renderedRatings}
              </select>
            )}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 gap-4 pt-0.5 text-[15px]">
        <button onClick={handleEditClick} className="text-apple-blue">
          Edit
        </button>
        <button onClick={handleDelete} className="text-apple-red">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem
