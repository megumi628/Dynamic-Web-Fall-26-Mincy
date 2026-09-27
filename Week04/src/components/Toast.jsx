import {useState} from 'react'
import cx from 'classnames'
import {twMerge} from 'tailwind-merge'
import {GoAlert, GoCheckCircle, GoInfo, GoX} from 'react-icons/go'

const ICONS = {
  success: <GoCheckCircle />,
  danger: <GoAlert />,
  warning: <GoAlert />,
  info: <GoInfo />,
}

const Toast = (props) => {
  const {message, success, danger, warning, info, ...otherProps} = props

  // #3/#4 from the five questions: the smallest thing we need to remember
  // is whether this toast has been dismissed yet.
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
  }

  // once dismissed, this component renders nothing at all
  if (!isVisible) {
    return null
  }

  const count =
    Number(!!success) + Number(!!danger) + Number(!!warning) + Number(!!info)

  if (count > 1) {
    console.warn(
      'You silly goose, you can only use 1 type variant boolean at a time'
    )
  }

  const baseClasses =
    'flex items-center justify-between gap-4 px-4 py-3 border-2 rounded shadow-sm'
  const classes = twMerge(
    cx(otherProps.className, baseClasses, {
      'bg-green-50 border-green-500 text-green-800': success,
      'bg-red-50 border-red-500 text-red-800': danger,
      'bg-yellow-50 border-yellow-500 text-yellow-800': warning,
      'bg-blue-50 border-blue-500 text-blue-800': info,
    })
  )

  const icon = success
    ? ICONS.success
    : danger
      ? ICONS.danger
      : warning
        ? ICONS.warning
        : info
          ? ICONS.info
          : null

  return (
    <div {...otherProps} className={classes}>
      <div className="flex items-center gap-2">
        {icon}
        <span>{message}</span>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="opacity-60 hover:opacity-100"
      >
        <GoX />
      </button>
    </div>
  )
}

export default Toast
