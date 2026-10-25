import axios from 'axios'

// everything in this file knows one thing: how to talk to our server.
// No React in here at all.
const BASE = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE}/todos`)
  return response.data
}

export const createTodo = async ({title, category}) => {
  // we send the title and cuisine. The server sends back the whole record,
  // WITH an id. Every new place starts out not visited and not rated
  // (rating 0 means "no rating yet"; category '' means "no category").
  const response = await axios.post(`${BASE}/todos`, {
    title,
    category,
    rating: 0,
    done: false,
  })
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE}/todos/${id}`)
}

export const updateTodo = async (todo) => {
  // PUT REPLACES the record. Send the whole todo, not just the bit that
  // changed, or everything else on it (rating, mapUrl...) is gone.
  const response = await axios.put(`${BASE}/todos/${todo.id}`, todo)
  return response.data
}

//HW: implement PATCH to update just the done status of a todo
export const patchTodo = async (id, changes) => {
  const response = await axios.patch(`${BASE}/todos/${id}`, changes)
  return response.data
}
