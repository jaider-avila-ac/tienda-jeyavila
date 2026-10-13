/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Paleta Jey Avila Music (la misma de su sitio web: negro, blanco y rojo) ──────────
        // Cambiar SOLO estos valores para actualizar el color en toda la app.
        // accent        → rojo de marca (#CF001B): botones CTA, badges, resaltados. El texto sobre
        //                  el rojo siempre va en blanco (nunca negro sobre rojo).
        // accent-dark   → variante oscura del rojo, para hover de botones CTA
        // complementario→ gris claro para degradados y acentos secundarios
        // aux           → fondo de la página: negro, como el sitio de Jey (tienda en modo oscuro)
        // superficie    → tarjetas, paneles, formularios y modales sobre el fondo negro
        // superficie-2  → un nivel más claro: campos, filas alternas, hover
        // black         → el negro del sitio (#0B0B0B); reskinea todas las clases bg-black/
        //                  text-black/border-black de la app sin tocar cada archivo.
        // ────────────────────────────────────────────────────────────────────
        accent:          '#CF001B',
        'accent-dark':   '#A50016',
        complementario:  '#E5E5E5',
        aux:             '#0B0B0B',
        superficie:      '#151515',
        'superficie-2':  '#1F1F1F',
        black:           '#0B0B0B',
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'], // títulos, como en el sitio de Jey
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
