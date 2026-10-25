import {OTHER} from '../categories'

// The cuisine picker used by BOTH the create form and the edit form.
// It owns no state: the form that uses it holds `choice` and `newName`, so the
// form can read them on submit and clear them afterwards.
const CategorySelect = (props) => {
  const {
    categories,
    choice,
    newName,
    onChoiceChange,
    onNewNameChange,
    emptyLabel,
  } = props

  const handleChoiceChange = (event) => {
    onChoiceChange(event.target.value)
  }

  const handleNewNameChange = (event) => {
    onNewNameChange(event.target.value)
  }

  const renderedOptions = categories.map((name) => {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    )
  })

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <select
        value={choice}
        onChange={handleChoiceChange}
        className="select-apple w-full"
      >
        <option value="">{emptyLabel}</option>
        {renderedOptions}
        <option value={OTHER}>Other (add a new cuisine)...</option>
      </select>

      {/* only shown after picking Other. `required` makes the browser stop
          the submit and ask for a name, so we never save an empty cuisine */}
      {choice === OTHER && (
        <input
          type="text"
          value={newName}
          onChange={handleNewNameChange}
          placeholder="New cuisine, e.g. Mexican"
          required
          className="input-apple"
        />
      )}
    </div>
  )
}

export default CategorySelect
