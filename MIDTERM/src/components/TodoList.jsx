import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, categories, categoryColors, onDelete, onEdit, onToggle, onRate} =
    props

  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        categories={categories}
        categoryColors={categoryColors}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
        onRate={onRate}
      />
    )
  })

  // one rounded white card, rows separated by hairlines (like iOS Settings)
  return (
    <div className="divide-y divide-black/5 overflow-hidden rounded-2xl bg-white shadow-sm">
      {renderedTodos}
    </div>
  )
}

export default TodoList
