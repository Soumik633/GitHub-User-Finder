// ─────────────────────────────────────────
//   src/components/UserCard.jsx
// ─────────────────────────────────────────

import { formatCount, formatDate, ensureHttps, stripProtocol } from '../utils/helpers'

const StatChip = ({ emoji, label, value }) => (
  <div className="stat-item flex-1 min-w-0">
    <span className="text-base leading-none">{emoji}</span>
    <span className="font-mono text-sm font-bold heading-text mt-1 leading-none">
      {formatCount(value)}
    </span>
    <span className="text-xs label-text mt-0.5 leading-none">{label}</span>
  </div>
)

const MetaItem = ({ icon, label, href }) => {
  const inner = (
    <>
      <span className="text-sm">{icon}</span>
      <span className="truncate">{label}</span>
    </>
  )
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs accent-text hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    <span className="flex items-center gap-1.5 text-xs subtext">{inner}</span>
  )
}

const UserCard = ({ user }) => {
  const stats = [
    { emoji: '📁', label: 'Repos',     value: user.public_repos },
    { emoji: '👥', label: 'Followers', value: user.followers    },
    { emoji: '➕', label: 'Following', value: user.following    },
    { emoji: '📝', label: 'Gists',     value: user.public_gists },
  ]

  return (
    <div className="card p-6 fade-up">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 self-start">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full avatar-glow" />
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-24 h-24 rounded-full border-2 relative z-10 object-cover"
              style={{ borderColor: 'var(--border-accent)' }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + badges */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-bold heading-text leading-tight truncate">
                {user.name || user.login}
              </h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-sm accent-text hover:opacity-80 transition-opacity">
                @{user.login}
              </a>
            </div>

            <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
              {user.type === 'Organization' && <span className="tag">Org</span>}
              {user.hireable && <span className="tag tag-green">Hireable</span>}
              <a href={user.html_url} target="_blank" rel="noopener noreferrer"
                className="btn-primary px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {user.bio && (
            <p className="mt-3 text-sm subtext leading-relaxed">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
            {user.location        && <MetaItem icon="📍" label={user.location} />}
            {user.company         && <MetaItem icon="🏢" label={user.company.replace(/^@/, '')} />}
            {user.blog            && <MetaItem icon="🔗" label={stripProtocol(user.blog)} href={ensureHttps(user.blog)} />}
            {user.twitter_username && <MetaItem icon="𝕏" label={`@${user.twitter_username}`} href={`https://twitter.com/${user.twitter_username}`} />}
            {user.email           && <MetaItem icon="✉️" label={user.email} href={`mailto:${user.email}`} />}
          </div>

          <div className="flex gap-2 mt-4">
            {stats.map((s) => <StatChip key={s.label} {...s} />)}
          </div>

          {user.created_at && (
            <p className="mt-3 font-mono text-xs label-text">
              Joined {formatDate(user.created_at)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCard
