import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const API_URL = 'http://localhost:8080/api/usuarios/register'

// Valores exactos de los enums del backend
const ROLES = ['ADMIN', 'EMPLEADO', 'INVITADO']
const DEPARTAMENTOS = ['RRHH', 'FINANZAS', 'LOGISTICA', 'MERCADEO', 'TECNOLOGIA']

// id (UUID) no va en el formulario: lo genera el backend
const initialForm = {
  nombre: '',
  correo: '',
  rol: '',
  departamento: '',
  contraseña: '',
}

function Hojita() {
  return (
    <svg className="leaf-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 3C10 3 4 8 4 14c0 1.6.5 3 1.3 4.2L3 21l1.4.6 2.3-2.4C7.9 20 9.4 20.5 11 20.5 17 20.5 21 14 20 3Z"
        fill="currentColor"
      />
      <path d="M6 18C9 13 13 10 17 8" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // En el front se llama "contraseña"; el backend la recibe como contraseña_hash
    const payload = {
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      rol: form.rol,
      departamento: form.departamento,
      contraseña_hash: form.contraseña,
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let detalle = ''
        try {
          const data = await res.json()
          detalle = data.message || data.error || ''
        } catch {
          /* respuesta sin JSON */
        }
        throw new Error(detalle || `No pudimos crear la cuenta (código ${res.status}).`)
      }

      navigate('/home')
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'No hay conexión con el servidor. Verifica que el backend esté activo en el puerto 8080.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-page">
      {/* Formas orgánicas flotantes */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />
      <div className="blob blob-4" aria-hidden="true" />

      <section className="register-card" aria-labelledby="register-title">
        <img className="register-logo" src="/logo-nutresa.png" alt="Grupo Nutresa" />

        <h1 id="register-title">Cultivamos tu acceso</h1>
        <p className="register-subtitle">Crea tu cuenta para la comunidad Nutresa</p>

        <form onSubmit={handleSubmit} noValidate={false} className="register-form">
          <div className="field">
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder=" "
              value={form.nombre}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <label htmlFor="nombre">Nombre</label>
            <Hojita />
          </div>

          <div className="field">
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder=" "
              value={form.correo}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <label htmlFor="correo">Correo</label>
            <Hojita />
          </div>

          <div className="field-row">
            <div className={`field ${form.rol ? 'has-value' : ''}`}>
              <select id="rol" name="rol" value={form.rol} onChange={handleChange} required>
                <option value="" disabled hidden></option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <label htmlFor="rol">Rol</label>
              <Hojita />
            </div>

            <div className={`field ${form.departamento ? 'has-value' : ''}`}>
              <select
                id="departamento"
                name="departamento"
                value={form.departamento}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden></option>
                {DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <label htmlFor="departamento">Departamento</label>
              <Hojita />
            </div>
          </div>

          <div className="field">
            <input
              id="contraseña"
              name="contraseña"
              type="password"
              placeholder=" "
              value={form.contraseña}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
            />
            <label htmlFor="contraseña">Contraseña</label>
            <Hojita />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-fill" disabled={loading}>
            <span>{loading ? 'Creando tu cuenta…' : 'Crear cuenta'}</span>
          </button>
        </form>
      </section>
    </main>
  )
}
