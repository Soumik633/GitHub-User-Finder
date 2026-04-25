// ─────────────────────────────────────────
//   src/components/UserGrid.jsx
//   Grid of user result cards for name search.
// ─────────────────────────────────────────

import { formatCount } from '../utils/helpers'

const Clue = ({ icon, text }) => {
  if (!text) return null
  return (
    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </span>
  )
}

const PersonCard = ({ user, onSelect }) => {
  // Identity clues — the "is this the right person?" info
  const clues = [
    { icon: '📍', text: user.location },
    { icon: '🏢', text: user.company?.replace(/^@/, '') },
    { icon: '🎓', text: user.bio ? (user.bio.length > 65 ? user.bio.slice(0, 65) + '…' : user.bio) : null },
    { icon: '🔗', text: user.blog ? user.blog.replace(/^https?:\/\//, '') : null },
  ].filter(c => c.text)

  // Is this an exact username match? (login === query fragment)
  const isExactLogin = user.__enriched === true

  return (
    <div
      className="person-card"
      onClick={() => onSelect(user.login)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(user.login)}
    >
      {/* Avatar + name */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: '2px solid var(--border-accent)' }}
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
              {user.name || user.login}
            </p>
            {/* Badge: exact username match */}
            {isExactLogin && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border-accent)' }}>
                exact match
              </span>
            )}
          </div>
          <p className="font-mono text-xs truncate" style={{ color: 'var(--accent)' }}>
            @{user.login}
          </p>
        </div>
      </div>

      {/* Identity clues */}
      <div className="space-y-1.5 mb-3 min-h-[52px]">
        {clues.length > 0
          ? clues.slice(0, 3).map((c, i) => <Clue key={i} icon={c.icon} text={c.text} />)
          : <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>No bio or location set</p>
        }
      </div>

      {/* Stats + View CTA */}
      <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex gap-3">
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{formatCount(user.public_repos)}</span> repos
          </span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{formatCount(user.followers)}</span> followers
          </span>
        </div>
        <span className="text-xs font-mono flex items-center gap-1 view-cta">
          View
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  )
}

const UserGrid = ({ results, total, query, onSelect, loading }) => {
  if (loading) return null

  return (
    <div className="fade-up">
      {results.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              People matching <span style={{ color: 'var(--accent)' }}>"{query}"</span>
            </h2>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} found ·{' '}
              <span style={{ color: 'var(--text-secondary)' }}>click a card to view full profile & repos</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono hint-badge self-start sm:self-auto">
            <span>🔍</span>
            <span>Identify by bio · location · company</span>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="user-grid">
          {results.map((user) => (
            <PersonCard key={user.id} user={user} onSelect={onSelect} />
          ))}
        </div>
      )}

      {results.length === 0 && query && (
        <div className="card p-10 text-center">
          <div className="text-4xl mb-4">🙅</div>
          <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No users found for "{query}"</h3>
          <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
            Try a different spelling, a shorter name, or switch to
          </p>
          <p className="text-sm font-mono mt-1" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent)' }}>By Username</span> if you know their GitHub handle
          </p>
        </div>
      )}
    </div>
  )
}

export default UserGrid
