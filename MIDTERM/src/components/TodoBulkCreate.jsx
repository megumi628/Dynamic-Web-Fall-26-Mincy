import {useState} from 'react'
import CategorySelect from './CategorySelect'
import {resolveCategory} from '../categories'

// Paste a whole list at once: one restaurant per line. A line can end in
// ", Cuisine" to give that place its own cuisine; otherwise it gets the one
// picked in the dropdown (or none).
const TodoBulkCreate = (props) => {
  const {onCreateMany, categories} = props
  // closed by default so the page still starts with the simple one-place form
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [choice, setChoice] = useState('')
  const [newName, setNewName] = useState('')

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // the name ends at the LAST comma, so "Joe's Pizza, Broadway, Pizza" keeps
  // "Joe's Pizza, Broadway" as the name
  const parseLine = (line, fallback) => {
    const comma = line.lastIndexOf(',')
    if (comma === -1) {
      return {title: line, category: fallback}
    }
    const title = line.slice(0, comma).trim()
    const typed = line.slice(comma + 1).trim()
    // reuse an existing spelling ("thai" -> "Thai"), same as the Other box
    const existing = categories.find(
      (category) => category.toLowerCase() === typed.toLowerCase()
    )
    return {title, category: existing || typed || fallback}
  }

  const places = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (places.length === 0) {
      return
    }
    const fallback = resolveCategory(choice, newName, categories)
    onCreateMany(
      places
        .map((line) => parseLine(line, fallback))
        .filter((place) => place.title)
    )
    setText('')
    setChoice('')
    setNewName('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={handleToggle}
        className="-mt-3 mb-6 text-[15px] text-apple-blue"
      >
        + Add many places at once
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm"
    >
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder={'One restaurant per line, e.g.\nSushi Mumi, Japanese\nOdo east village, Japanese'}
        rows={6}
        className="input-apple resize-y"
      />
      <div className="flex items-start gap-3">
        <CategorySelect
          categories={categories}
          choice={choice}
          newName={newName}
          onChoiceChange={setChoice}
          onNewNameChange={setNewName}
          emptyLabel="Cuisine for lines without one"
        />
        <button className="btn-apple whitespace-nowrap">
          Add {places.length || ''}
        </button>
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className="self-start text-sm text-apple-gray"
      >
        Cancel
      </button>
    </form>
  )
}

export default TodoBulkCreate
