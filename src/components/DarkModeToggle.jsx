// ─────────────────────────────────────────
//   src/components/DarkModeToggle.jsx
// ─────────────────────────────────────────

const DarkModeToggle = ({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    className="flex items-center gap-2 group"
    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
  >
    <span className="text-sm select-none" aria-hidden>
      {isDark ? '🌙' : '☀️'}
    </span>
    <div className={`toggle-track ${isDark ? 'active' : ''}`}>
      <div className="toggle-thumb" />
    </div>
  </button>
)

export default DarkModeToggle
