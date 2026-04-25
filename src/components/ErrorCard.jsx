// src/components/ErrorCard.jsx
const ERROR_CONFIG = {
  notFound:  { emoji: '🔍', title: 'User not found',          hint: 'Double-check the username spelling and try again.' },
  rateLimit: { emoji: '⏱',  title: 'Rate limit exceeded',     hint: 'GitHub limits unauthenticated requests. Wait a minute or add a token in .env.' },
  network:   { emoji: '📡', title: 'Connection error',         hint: 'Could not reach GitHub. Check your internet connection.' },
  generic:   { emoji: '⚠',  title: 'Something went wrong',    hint: null },
}

const ErrorCard = ({ type = 'generic', message }) => {
  const cfg = ERROR_CONFIG[type] || ERROR_CONFIG.generic
  return (
    <div className="card p-10 text-center fade-up">
      <div className="text-5xl mb-5 select-none">{cfg.emoji}</div>
      <h3 className="font-bold text-lg" style={{color:'var(--accent)'}}>{cfg.title}</h3>
      <p className="text-sm mt-2 font-mono max-w-xs mx-auto leading-relaxed" style={{color:'var(--text-secondary)'}}>
        {cfg.hint || message}
      </p>
    </div>
  )
}

export default ErrorCard
