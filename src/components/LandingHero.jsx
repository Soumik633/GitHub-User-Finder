// ─────────────────────────────────────────
//   src/components/LandingHero.jsx
//   Default landing screen before first search
// ─────────────────────────────────────────

import { FEATURED_USERS } from '../utils/constants'

/**
 * LandingHero
 * Props:
 *  - onSearch     {function}   Search a username
 *  - history      {string[]}   Recent searches
 *  - onRemove     {function}   Remove one history entry
 *  - onClear      {function}   Clear all history
 */
const LandingHero = ({ onSearch, history, onRemove, onClear }) => (
  <div className="text-center py-6 fade-up">

    {/* Logo */}
    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full logo-ring">
      <svg className="w-10 h-10 icon-accent" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </div>

    {/* Headline */}
    <h1 className="text-4xl sm:text-5xl font-bold heading-text leading-tight fade-up-d1">
      GitHub{' '}
      <span className="gradient-text">User Finder</span>
    </h1>

    <p className="mt-4 subtext text-sm max-w-sm mx-auto font-mono leading-relaxed fade-up-d2">
      Search any GitHub profile — repos, stats, bio, and more in one glance.
    </p>

    {/* Featured devs */}
    <div className="mt-8 fade-up-d3">
      <p className="label-text text-xs font-mono mb-3 uppercase tracking-widest">
        Try a featured dev
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {FEATURED_USERS.map((u) => (
          <button key={u} onClick={() => onSearch(u)} className="chip-btn">
            @{u}
          </button>
        ))}
      </div>
    </div>

    {/* Recent searches */}
    {history.length > 0 && (
      <div className="mt-6 fade-up-d4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <p className="label-text text-xs font-mono uppercase tracking-widest">
            Recent searches
          </p>
          <button
            onClick={onClear}
            className="text-xs font-mono clear-btn transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {history.map((u) => (
            <div key={u} className="history-pill group">
              {/* Username — click to search */}
              <button
                onClick={() => onSearch(u)}
                className="history-pill-text font-mono text-xs"
              >
                @{u}
              </button>

              {/* ✕ Remove button — appears on hover */}
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(u) }}
                className="history-pill-remove"
                aria-label={`Remove ${u} from history`}
                title={`Remove @${u}`}
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

export default LandingHero
