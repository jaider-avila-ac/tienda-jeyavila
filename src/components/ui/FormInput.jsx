export const inputBase =
  'w-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white ' +
  'placeholder-neutral-500 focus:outline-none focus:border-accent transition-colors'

const inputBaseDark =
  'w-full h-[58px] border border-[#2f2f2f] pl-4 bg-[#1a1a1a] ' +
  'text-white placeholder-neutral-500 focus:outline-none focus:border-white/50 transition-colors text-[15px] font-medium'

// Para los formularios que van sobre fondo blanco a propósito (carrito, mis compras — ver
// ProductCard.jsx), igual que el resto del sitio es oscuro por defecto.
export const inputBaseLight =
  'w-full border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-900 bg-white ' +
  'placeholder-neutral-400 focus:outline-none focus:border-accent transition-colors'

export default function FormInput({ dark = false, light = false, className = '', ...props }) {
  const base = light ? inputBaseLight : dark ? inputBaseDark : inputBase
  return <input className={`${base}${className ? ` ${className}` : ''}`} {...props} />
}
