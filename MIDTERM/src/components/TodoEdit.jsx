import {useState} from 'react'
import CategorySelect from './CategorySelect'
import {resolveCategory} from '../categories'

const TodoEdit = (props) => {
  const {todo, onSubmit, categories} = props
  // start the inputs at the todo's CURRENT values, so editing means changing
  // what is there rather than retyping it.
  // Rows without a category have todo.category === undefined, so fall back
  // to '' -- a controlled input must never get undefined as its value.
  const [title, setTitle] = useState(todo.title)
  const [choice, setChoice] = useState(todo.category || '')
  const [newName, setNewName] = useState('')
  // old rows have no note either, same fallback as category
  const [note, setNote] = useState(todo.note || '')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) {
      return
    }
    onSubmit(todo.id, {
      title: title.trim(),
      category: resolveCategory(choice, newName, categories),
      note: note.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-4 py-3.5">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="input-apple"
      />
            <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="A short note about your visit, e.g. recommend uni tofu"
        rows={2}
        className="input-apple resize-none"
      />
      <div className="flex items-start gap-3">
        <CategorySelect
          categories={categories}
          choice={choice}
          newName={newName}
          onChoiceChange={setChoice}
          onNewNameChange={setNewName}
          emptyLabel="No cuisine"
        />
        <button className="btn-apple">Save</button>
      </div>
    </form>
  )
}

export default TodoEdit
