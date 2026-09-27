import Toast from '../components/Toast'

const ToastPage = () => {
  return (
    <div>
      <h1 className="text-2xl mb-4">ToastPage</h1>
      <div className="flex flex-col gap-3">
        <Toast success message="Changes saved successfully." />
        <Toast info message="A new version is available." />
        <Toast warning message="Your session will expire in 5 minutes." />
        <Toast danger message="Something went wrong. Please try again." />
      </div>
    </div>
  )
}

export default ToastPage
