import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onToggle} = props
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

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(todo.done)}
          onChange={handleToggle}
        />
        <span className={todo.done ? 'line-through text-gray-400' : ''}>
          {todo.title}
        </span>
      </label>
      <div className="flex gap-3 text-sm">
        <button onClick={handleEditClick} className="text-blue-700">
          edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem
