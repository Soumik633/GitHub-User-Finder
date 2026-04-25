/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        void:    '#060910',
        surface: '#0d1117',
        panel:   '#161b22',
        border:  '#21262d',
        accent:  '#58a6ff',
        glow:    '#1f6feb',
        muted:   '#8b949e',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        spin:     { '100%': { transform: 'rotate(360deg)' } },
        glowPulse:{ '0%,100%': { boxShadow: '0 0 10px #1f6feb40' }, '50%': { boxShadow: '0 0 30px #1f6feb80' } },
      },
      animation: {
        fadeUp:    'fadeUp 0.5s ease forwards',
        shimmer:   'shimmer 1.8s infinite linear',
        scanline:  'scanline 8s linear infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
