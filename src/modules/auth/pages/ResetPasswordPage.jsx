import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { authService } from '../../../services/authService'

export default function ResetPasswordPage() {
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.resetPassword(code.trim(), password)
      setDone(true)
    } catch (err) {
      if (err.data?.message === 'CODE_INVALID') setError('Código incorrecto.')
      else if (err.data?.message === 'CODE_EXPIRED') setError('El código expiró. Solicita uno nuevo.')
      else setError('No se pudo restablecer la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-superficie flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] flex flex-col gap-6">

        <div className="flex justify-center">
          <img src="/logos/logo-blanco.png" alt="Jey Avila Music" width="800" height="334" className="h-16 w-auto" />
        </div>

        {done ? (
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">¡Contraseña actualizada!</h2>
            <p className="text-sm text-neutral-400">Ya puedes iniciar sesión con tu nueva contraseña.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full h-[54px] bg-accent text-white text-base font-bold hover:bg-accent-dark transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Nueva contraseña</h2>
              <p className="text-sm text-neutral-400">Ingresa el código que recibiste y tu nueva contraseña.</p>
            </div>

            {error && (
              <div className="p-3 bg-accent/10 border border-accent/40 text-sm text-red-400 text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wide mb-1.5">
                  Código de verificación
                </label>
                <input
                  type="text" required value={code} onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-white/15 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wide mb-1.5">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'} required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 border border-white/15 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    type="button" onClick={() => setShowPass((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full h-[54px] bg-accent text-white text-base font-bold hover:bg-accent-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" />Guardando…</> : 'Guardar contraseña'}
              </button>
            </form>

            <button
              onClick={() => navigate('/login')}
              className="text-xs text-neutral-500 hover:text-white transition-colors text-center"
            >
              ← Volver al login
            </button>
          </>
        )}
      </div>
    </div>
  )
}
