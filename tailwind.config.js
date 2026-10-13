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
        // aux           → fondo de la página: gris muy claro, para que las tarjetas blancas
        //                  (productos, header de checkout) floten sobre él
        // black         → el negro del sitio (#0B0B0B); reskinea todas las clases bg-black/
        //                  text-black/border-black de la app sin tocar cada archivo.
        // ────────────────────────────────────────────────────────────────────
        accent:          '#CF001B',
        'accent-dark':   '#A50016',
        complementario:  '#E5E5E5',
        aux:             '#F4F4F4',
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
