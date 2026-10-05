// 1. This effect uses an empty dependency array [].
// It only needs to run once after the first render and never again.
// The search term inside the effect is a hard-coded constant.
// Other searches are triggered by the form, so no re-run is needed.

// 2. If `images` was added to the dependency array, we get an infinite loop.
// The effect calls handleSubmit, which updates images with setImages.
// When images changes, the effect runs again, fetches data and updates images once more.
// This repeats nonstop and quickly uses up the 50 requests per hour limit.


import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'
import {searchImages} from './api'

const DEFAULT_TERM = 'mountains'

const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  // the term that produced the current results. It is separate from the
  // `term` inside SearchBar, which changes on every keystroke.
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async (term) => {
    setIsLoading(true)
    setError(null)
    setSearched(true)
    setSearchTerm(term)

    try {
      const results = await searchImages(term)
      setImages(results)
    } catch (err) {
      console.error(err)
      setError('The search did not work. Check the console.')
    } finally {
      setIsLoading(false)
    }
  }

  // search something on load. [] = run once, after the first render.
  // (In dev, StrictMode runs mount effects twice on purpose, so you will see
  // 2 requests in the network tab; a production build makes only 1.)
  useEffect(() => {
    handleSubmit(DEFAULT_TERM)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} /> <br />
      {searched && (
        <h2 className="px-4 text-2xl font-bold">
          Results for &ldquo;{searchTerm}&rdquo;
        </h2>
      )}
      {isLoading && <p className="p-4 text-gray-500">Searching ...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}
      {!isLoading && !error && searched && images.length === 0 && (
        <p className="p-4 text-gray-500">
          No photos for that one. Try another word!
        </p>
      )}
      <ImageList images={images} />
    </div>
  )
}

export default App
