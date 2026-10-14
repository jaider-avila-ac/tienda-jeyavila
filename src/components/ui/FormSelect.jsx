import { inputBase, inputBaseLight } from './FormInput'

export default function FormSelect({ light = false, className = '', children, ...props }) {
  const base = light ? inputBaseLight : inputBase
  return (
    <select className={`${base}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </select>
  )
}
