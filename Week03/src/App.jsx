import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import ToastPage from './pages/ToastPage'
const App = () => {
  return (
    <div className="container mx-auto mt-4">
      <ButtonPage />
      <hr></hr>
      <AccordionPage />
      <hr></hr>
      <ToastPage />
    </div>
  )
}

export default App
