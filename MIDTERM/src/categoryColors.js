// Every cuisine tag gets its own colour. Tailwind only generates classes it can
// see written out in full, so each colour below is a complete class string
// (never built from pieces like `bg-${name}-100`).

// The cuisines I imported get a fixed colour each.
const KNOWN_COLORS = {
  Bagel: 'bg-yellow-100 text-yellow-800',
  Chinese: 'bg-red-100 text-red-700',
  French: 'bg-indigo-100 text-indigo-700',
  Italian: 'bg-green-100 text-green-700',
  Japanese: 'bg-pink-100 text-pink-700',
  Korean: 'bg-blue-100 text-blue-700',
  Thai: 'bg-orange-100 text-orange-700',
  Vietnamese: 'bg-teal-100 text-teal-700',
}

// Cuisines added later (via "Other") take these in turn. None of them repeats
// a colour above, so a new tag never looks like an old one.
const EXTRA_COLORS = [
  'bg-purple-100 text-purple-700',
  'bg-cyan-100 text-cyan-800',
  'bg-lime-100 text-lime-800',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-800',
]

// Works out {cuisine: classes} for every cuisine in use. A new cuisine gets the
// next unused colour in the order cuisines first appear in the list, so a
// cuisine keeps its colour after a refresh and when other places are added.
// (After 8 new cuisines the colours start to repeat.)
export const buildCategoryColors = (todos) => {
  const colors = {}
  let extraIndex = 0

  todos.forEach((todo) => {
    const name = todo.category
    if (!name || colors[name]) {
      return
    }
    if (KNOWN_COLORS[name]) {
      colors[name] = KNOWN_COLORS[name]
    } else {
      colors[name] = EXTRA_COLORS[extraIndex % EXTRA_COLORS.length]
      extraIndex++
    }
  })

  return colors
}
