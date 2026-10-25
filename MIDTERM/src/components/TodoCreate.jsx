import {useState} from 'react'
import CategorySelect from './CategorySelect'
import {resolveCategory} from '../categories'

const TodoCreate = (props) => {
  const {onCreate, categories} = props
  // all three inputs' values live here -- this component owns them, because
  // nobody else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  // '' = no cuisine, a cuisine name, or OTHER (then newName is what counts)
  const [choice, setChoice] = useState('')
  const [newName, setNewName] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // don't save a place with no name
    if (!title.trim()) {
      return
    }
    onCreate({
      title: title.trim(),
      category: resolveCategory(choice, newName, categories),
    })
    // clear the boxes. This is only possible BECAUSE the inputs are controlled.
    setTitle('')
    setChoice('')
    setNewName('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm"
    >
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Add a restaurant"
        className="input-apple"
      />
      <div className="flex items-start gap-3">
        <CategorySelect
          categories={categories}
          choice={choice}
          newName={newName}
          onChoiceChange={setChoice}
          onNewNameChange={setNewName}
          emptyLabel="Cuisine (optional)"
        />
        <button className="btn-apple">Add</button>
      </div>
    </form>
  )
}

export default TodoCreate
