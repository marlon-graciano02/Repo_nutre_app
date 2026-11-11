import { Link } from 'react-router-dom'
import './Home.css'

// Hojas que caen (valores fijos para que el render sea estable)
const HOJAS = [
  { left: 6, size: 16, delay: 0, dur: 9, drift: 40 },
  { left: 14, size: 12, delay: 3, dur: 11, drift: -30 },
  { left: 22, size: 20, delay: 6, dur: 10, drift: 50 },
  { left: 31, size: 14, delay: 1.5, dur: 12, drift: -45 },
  { left: 40, size: 18, delay: 8, dur: 9.5, drift: 35 },
  { left: 49, size: 12, delay: 4.5, dur: 11.5, drift: -25 },
  { left: 57, size: 22, delay: 2, dur: 10.5, drift: 55 },
  { left: 66, size: 15, delay: 7, dur: 9, drift: -40 },
  { left: 74, size: 18, delay: 0.8, dur: 12, drift: 30 },
  { left: 82, size: 13, delay: 5.5, dur: 10, drift: -50 },
  { left: 90, size: 20, delay: 3.5, dur: 11, drift: 45 },
  { left: 96, size: 14, delay: 9, dur: 9.5, drift: -35 },
]

// Follaje del árbol: [cx, cy, rx, ry, rotación, tono, retraso]
const FOLLAJE = [
  [100, 222, 26, 13, -35, 'a', 2.6],
  [88, 250, 22, 11, -10, 'b', 2.8],
  [300, 208, 26, 13, 35, 'a', 2.7],
  [316, 238, 22, 11, 12, 'b', 2.9],
  [148, 132, 24, 12, -55, 'b', 3.1],
  [255, 128, 24, 12, 55, 'a', 3.2],
  [200, 100, 22, 28, 0, 'a', 3.3],
  [170, 170, 22, 11, -30, 'a', 3.0],
  [232, 168, 22, 11, 30, 'b', 3.1],
  [128, 190, 20, 10, -45, 'b', 2.9],
  [276, 180, 20, 10, 45, 'a', 3.0],
  [200, 150, 20, 10, 0, 'b', 3.2],
]

const TARJETAS = [
  {
    titulo: 'Gestión de Usuarios',
    texto: 'Registra a cada persona de la comunidad Nutresa y mantén sus datos en un solo lugar.',
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="15" r="8" fill="#4a7c2f" />
        <path d="M8 42c1-10 8-15 16-15s15 5 16 15" fill="#8ab661" />
      </svg>
    ),
  },
  {
    titulo: 'Roles y Seguridad',
    texto: 'Asigna el rol de cada cuenta —administrador, empleado o invitado— y protégela con contraseña.',
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 8 11v11c0 10 7 17 16 21 9-4 16-11 16-21V11L24 5Z" fill="#4a7c2f" />
        <path d="m16 24 6 6 11-12" fill="none" stroke="#f9f6f0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: 'Departamentos',
    texto: 'Organiza los equipos de RRHH, Finanzas, Logística, Mercadeo y Tecnología.',
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="6" fill="#4a7c2f" />
        <circle cx="10" cy="12" r="5" fill="#8ab661" />
        <circle cx="38" cy="12" r="5" fill="#8ab661" />
        <circle cx="10" cy="38" r="5" fill="#8ab661" />
        <circle cx="38" cy="38" r="5" fill="#8ab661" />
        <path d="M13 15l7 6M35 15l-7 6M13 35l7-6M35 35l-7-6" stroke="#4a7c2f" strokeWidth="2.5" />
      </svg>
    ),
  },
]

function ArbolAnimado() {
  return (
    <svg className="tree" viewBox="0 0 400 440" role="img" aria-label="Árbol que crece">
      {/* Suelo */}
      <path className="tree-ground" d="M30 408 Q200 372 370 408 Q200 392 30 408Z" fill="#4a7c2f" />

      {/* Tronco y ramas: se dibujan de abajo hacia arriba */}
      <g fill="none" stroke="#3b6a26" strokeLinecap="round">
        <path className="draw" pathLength="1" style={{ '--d': '0s' }} strokeWidth="16" d="M200 400 C196 340 204 290 200 215" />
        <path className="draw" pathLength="1" style={{ '--d': '1.3s' }} strokeWidth="9" d="M199 310 C165 295 130 275 100 228" />
        <path className="draw" pathLength="1" style={{ '--d': '1.5s' }} strokeWidth="9" d="M201 295 C240 280 275 262 300 212" />
        <path className="draw" pathLength="1" style={{ '--d': '1.8s' }} strokeWidth="8" d="M200 240 C178 215 160 180 150 135" />
        <path className="draw" pathLength="1" style={{ '--d': '2s' }} strokeWidth="8" d="M200 235 C225 210 245 175 255 132" />
        <path className="draw" pathLength="1" style={{ '--d': '2.2s' }} strokeWidth="8" d="M200 220 C201 185 200 150 200 100" />
      </g>

      {/* Follaje */}
      {FOLLAJE.map(([cx, cy, rx, ry, rot, tono, delay], i) => (
        <ellipse
          key={i}
          className={`foliage foliage-${tono}`}
          style={{ '--delay': `${delay}s` }}
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      ))}

      {/* Personas: frutos del árbol, como en el logo */}
      {[
        [78, 196],
        [322, 184],
        [130, 100],
        [272, 96],
        [200, 62],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          className="person"
          style={{ '--delay': `${3.5 + i * 0.15}s` }}
          cx={cx}
          cy={cy}
          r="9"
          fill="#2f9e2f"
        />
      ))}
    </svg>
  )
}

export default function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <header className="navbar">
        <Link to="/home" className="navbar-brand" aria-label="Grupo Nutresa, inicio">
          <img src="/logo-nutresa.png" alt="Grupo Nutresa" />
        </Link>
        <button type="button" className="navbar-account">
          Mi cuenta
        </button>
      </header>

      {/* Hero animado */}
      <section className="hero">
        <div className="falling" aria-hidden="true">
          {HOJAS.map((h, i) => (
            <span
              key={i}
              className="falling-leaf"
              style={{
                left: `${h.left}%`,
                width: `${h.size}px`,
                height: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.dur}s`,
                '--drift': `${h.drift}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-inner">
          <div className="hero-text">
            <h1>Juntos, hacemos crecer lo que nos une</h1>
            <p>
              Tu cuenta ya está lista. Desde esta plataforma gestionamos a las personas que hacen
              posible a Grupo Nutresa.
            </p>
            <Link to="/register" className="btn-back">
              <span>Volver al registro</span>
            </Link>
          </div>

          <div className="hero-tree">
            <ArbolAnimado />
          </div>
        </div>
      </section>

      {/* Tarjetas flotantes */}
      <section className="cards" aria-label="Qué puedes hacer en la plataforma">
        {TARJETAS.map((t, i) => (
          <article key={t.titulo} className="card" style={{ '--i': i }}>
            <div className="card-icon">{t.icono}</div>
            <h2>{t.titulo}</h2>
            <p>{t.texto}</p>
          </article>
        ))}
      </section>

      <footer className="footer">Grupo Nutresa © 2026</footer>
    </div>
  )
}
