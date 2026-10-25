// There is no hard-coded list of cuisines any more. The list is worked out
// from the restaurants themselves (see App.jsx), so a new cuisine is "saved"
// simply by being saved on a restaurant.

// The special value of the dropdown's last option, "Other (add a new cuisine)".
// It can never clash with a real cuisine name because real names never look
// like this.
export const OTHER = '__other__'

// Turn what the form holds into the cuisine to store.
//   choice  - the dropdown's value: '' (none), an existing cuisine, or OTHER
//   newName - what was typed in the "new cuisine" box (only used for OTHER)
// If the typed name matches an existing cuisine ignoring case ("thai" vs
// "Thai"), reuse the existing spelling so we don't get two Thai entries.
export const resolveCategory = (choice, newName, categories) => {
  if (choice !== OTHER) {
    return choice
  }
  const name = newName.trim()
  const existing = categories.find(
    (category) => category.toLowerCase() === name.toLowerCase()
  )
  return existing || name
}
