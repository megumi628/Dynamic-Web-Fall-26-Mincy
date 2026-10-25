/*
 *    The component body runs on every render. Putting a fetch there creates an infinite loop,
 *    because updating state after fetching triggers another render and another fetch.
 *    Fetching is a side‑effect, while rendering should only produce JSX from state and props.
 *    useEffect runs side‑effects after render. The empty dependency array runs the fetch only once
 *    when the component mounts, so state updates will not start new requests.
 *
 *    The UI updates before the server request, which is an optimistic update.
 *    If the server fails, the todo disappears on screen but still exists in the database.
 *    Without rollback logic, the UI shows wrong information until the user refreshes the page.
 *    Keeping await before changing state prevents this problem; failed requests leave the UI unchanged.
 *    Our current deleteTodoById uses proper optimistic update with rollback.
 *    It restores the todo and alerts users when requests fail, unlike the buggy version with no undo.
 *
 *    No network request is needed. All todos are already loaded into local state.
 *    Filtering only uses Array.filter on local data and does not change anything on the server.
 *    CRUD operations modify server‑side data, but filtering only changes how local data displays.
 *    We store only the filter setting in state and calculate visible todos on each render.
 *    Storing a separate filtered array would risk out‑of‑sync state.
 *    The filter state lives in App, which is the shared parent for both the filter control and todo list.
 */

import {useState, useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoFilter from './components/TodoFilter'
import CategoryFilter from './components/CategoryFilter'
import TodoSearch from './components/TodoSearch'
import TodoSort from './components/TodoSort'
import TodoList from './components/TodoList'
import {buildCategoryColors} from './categoryColors'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  patchTodo as patchTodoRequest,
} from './api'

const App = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('az')
  const [actionError, setActionError] = useState(null)
  const [filter, setFilter] = useState('all')
  // which cuisine to show; 'all' means every cuisine
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (err) {
        // the usual cause: you forgot to start the server in the second tab
        console.error(err)
        setError('Could not reach the server. Is `npm run server` running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])

  // `fields` is {title, category} from the create form
  const createTodo = async (fields) => {
    setActionError(null)
    try {
      const newTodo = await createTodoRequest(fields)
      setTodos((current) => [...current, newTodo])
    } catch (err) {
      console.error(err)
      setActionError('Could not save that restaurant. Is `npm run server` running?')
    }
  }

  //HW: delete a todo by id, with optimistic update and error handling
  const deleteTodoById = async (id) => {
    const removed = todos.find((todo) => todo.id === id)
    setActionError(null)
    setTodos((current) => current.filter((todo) => todo.id !== id))

    try {
      await deleteTodoRequest(id)
    } catch (err) {
      console.error(err)
      setTodos((current) => [...current, removed])
      setActionError('Could not delete that restaurant. It has been put back.')
    }
  }

  // `changes` is {title, category} from the edit form. PUT replaces the whole
  // record, so spread the old todo first to keep done / rating / mapUrl / id.
  const editTodoById = async (id, changes) => {
    setActionError(null)
    const todo = todos.find((todo) => todo.id === id)
    try {
      const updated = await updateTodoRequest({...todo, ...changes})
      setTodos((current) =>
        current.map((item) => (item.id === id ? updated : item))
      )
    } catch (err) {
      console.error(err)
      setActionError('Could not save your changes. Nothing was changed.')
    }
  }

  // Ticking a place off and rating it are both "change one field, leave the
  // rest alone" -- a PATCH. They share this one helper.
  const patchTodoById = async (id, changes) => {
    setActionError(null)
    try {
      const updated = await patchTodoRequest(id, changes)
      setTodos((current) =>
        current.map((item) => (item.id === id ? updated : item))
      )
    } catch (err) {
      console.error(err)
      setActionError('Could not update that restaurant. Nothing was changed.')
    }
  }

  //HW: toggle done status of a todo by id
  const toggleTodoById = (id, done) => {
    return patchTodoById(id, {done})
  }

  const rateTodoById = (id, rating) => {
    return patchTodoById(id, {rating})
  }

  const query = search.trim().toLowerCase()

  // The cuisines are worked out from the restaurants, not stored separately:
  // every cuisine in use, once each, A to Z. So a cuisine typed under "Other"
  // is saved by being saved on its restaurant, and shows up in every dropdown.
  const categories = [
    ...new Set(todos.map((todo) => todo.category).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b))

  // If the last restaurant of the chosen cuisine was deleted or renamed, that
  // cuisine is gone from the dropdown, so fall back to showing everything.
  const activeCategory = categories.includes(category) ? category : 'all'

  // one colour per cuisine, for the tag on each row
  const categoryColors = buildCategoryColors(todos)

  const visibleTodos = todos
    .filter((todo) => {
      if (filter === 'active') {
        return !todo.done
      }
      if (filter === 'done') {
        return todo.done
      }
      return true
    })
    .filter((todo) => {
      // rows without a category never match a specific cuisine
      return activeCategory === 'all' || todo.category === activeCategory
    })
    .filter((todo) => {
      return todo.title.toLowerCase().includes(query)
    })
    .sort((a, b) => {
      if (sort === 'rating') {
        // old rows have no rating; treat that as 0. Ties go A to Z.
        return (b.rating || 0) - (a.rating || 0) || a.title.localeCompare(b.title)
      }
      return a.title.localeCompare(b.title)
    })

  const remaining = todos.filter((todo) => !todo.done).length

  const showEmpty = !isLoading && !error && visibleTodos.length === 0
  const emptyMessage =
    todos.length === 0
      ? 'No restaurants yet. Add one above.'
      : 'No restaurants match.'

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-apple-ink sm:text-5xl">
          To-Eat List
        </h1>

        <TodoCreate onCreate={createTodo} categories={categories} />
        <TodoFilter filter={filter} onChange={setFilter} />
        <div className="mb-5 flex flex-col gap-2 sm:flex-row">
          <TodoSearch search={search} onChange={setSearch} />
          <div className="flex gap-2">
            <CategoryFilter
              categories={categories}
              category={activeCategory}
              onChange={setCategory}
            />
            <TodoSort sort={sort} onChange={setSort} />
          </div>
        </div>

        {isLoading && (
          <p className="text-apple-gray">Loading your restaurants...</p>
        )}

        {actionError && (
          <p className="mb-3 rounded-2xl bg-red-50 p-4 text-apple-red">
            {actionError}
          </p>
        )}

        {error && (
          <p className="rounded-2xl bg-red-50 p-4 text-apple-red">{error}</p>
        )}

        {showEmpty ? (
          <p className="rounded-2xl bg-white p-8 text-center text-apple-gray shadow-sm">
            {emptyMessage}
          </p>
        ) : (
          <TodoList
            todos={visibleTodos}
            categories={categories}
            categoryColors={categoryColors}
            onDelete={deleteTodoById}
            onEdit={editTodoById}
            onToggle={toggleTodoById}
            onRate={rateTodoById}
          />
        )}

        <p className="mt-6 text-center text-sm text-apple-gray">
          {remaining} {remaining === 1 ? 'place' : 'places'} left to try
        </p>
      </div>
    </div>
  )
}

export default App
