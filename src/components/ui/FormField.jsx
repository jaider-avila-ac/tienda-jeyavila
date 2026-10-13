export default function FormField({ label, dark = false, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`text-xs font-semibold uppercase tracking-wider ${
        dark ? 'text-neutral-300' : 'text-neutral-400'
      }`}>
        {label}
      </label>
      {children}
    </div>
  )
}
