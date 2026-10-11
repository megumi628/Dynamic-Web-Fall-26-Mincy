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
import TodoSearch from './components/TodoSearch'
import TodoSort from './components/TodoSort'
import TodoList from './components/TodoList'
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
  const [sort, setSort] = useState('newest')
  const [actionError, setActionError] = useState(null)
  const [filter, setFilter] = useState('all')

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

  const createTodo = async (title) => {
    const newTodo = await createTodoRequest(title)
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
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
      setActionError('Could not delete that todo. It has been put back.')
    }
  }

  const editTodoById = async (id, newTitle) => {
    const todo = todos.find((todo) => todo.id === id)
    const updated = await updateTodoRequest({...todo, title: newTitle})

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  //HW: toggle done status of a todo by id
  const toggleTodoById = async (id, done) => {
    const updated = await patchTodoRequest(id, {done})

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const query = search.trim().toLowerCase()

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
      return todo.title.toLowerCase().includes(query)
    })
    
    .sort((a, b) => {
      if (sort === 'az') {
        return a.title.localeCompare(b.title)
      }
      return sort === 'newest' ? b.id - a.id : a.id - b.id
    })

  const remaining = todos.filter((todo) => !todo.done).length

  const showEmpty = !isLoading && !error && visibleTodos.length === 0
  const emptyMessage =
    todos.length === 0
      ? 'Nothing yet. Add something above.'
      : 'No todos match.'

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <div className="flex gap-2 mb-4">
        <TodoSearch search={search} onChange={setSearch} />
        <TodoSort sort={sort} onChange={setSort} />
      </div>
      {isLoading && <p className="text-gray-500">Loading your todos...</p>}

      {actionError && (
        <p className="rounded bg-red-50 p-3 mb-3 text-red-700">{actionError}</p>
      )}

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>
      )}

      {showEmpty ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : (
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoById}
        />
      )}

      <p className="mt-6 text-sm text-gray-500">
        {remaining} {remaining === 1 ? 'thing' : 'things'} left to do
      </p>
    </div>
  )
}

export default App
