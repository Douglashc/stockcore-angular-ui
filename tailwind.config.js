/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Sigue respondiendo a la clase 'dark' en el <html>
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Semántica Adaptativa
        app: {
          // Fondos principales de pantalla
          bg: {
            dark: '#020617',    // Slate 950 (Fondo profundo absoluto)
            light: '#f8fafc',   // Slate 50 (Fondo claro limpio)
          },
          // Paneles laterales, secciones o contenedores secundarios
          surface: {
            dark: '#0f172a',    // Slate 900 (El contenedor del formulario)
            light: '#ffffff',   // Blanco puro institucional
          },
          // Bordes sutiles divisores
          border: {
            dark: '#1e293b',    // Slate 800
            light: '#e2e8f0',   // Slate 200
          },
          // Entradas de texto (Inputs)
          input: {
            dark: 'rgba(15, 23, 42, 0.6)', // slate-900/60
            light: '#ffffff',
          },
          // Tipografías
          text: {
            main: {
              dark: '#ffffff',  // Blanco puro para títulos principales
              light: '#0f172a', // Slate 900
            },
            muted: {
              dark: '#94a3b8',  // Slate 400 para textos secundarios y placeholders
              light: '#64748b', // Slate 500
            }
          }
        }
      }
    },
  },
  plugins: [],
}