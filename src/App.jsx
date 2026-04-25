// ─────────────────────────────────────────
//   src/App.jsx
//   Root component — wires all pieces together
//   Supports two modes:
//     'username' → fetch single user by login
//     'name'     → search multiple users by real name
// ─────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { useGithub }        from './hooks/useGithub'
import { useSearchByName }  from './hooks/useSearchByName'
import { useHistory }       from './hooks/useHistory'

import SearchBar      from './components/SearchBar'
import UserCard       from './components/UserCard'
import RepoList       from './components/RepoList'
import ErrorCard      from './components/ErrorCard'
import LandingHero    from './components/LandingHero'
import DarkModeToggle from './components/DarkModeToggle'
import UserGrid       from './components/UserGrid'
import { UserCardSkeleton, RepoListSkeleton } from './components/Skeleton'

const App = () => {
  // ── Persist dark mode ──
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('gh_darkmode')
    return saved !== null ? saved === 'true' : true
  })

  // ── Search mode: 'username' | 'name' ──
  const [mode, setMode] = useState('username')

  // ── Track what was last searched ──
  const [currentQuery, setCurrentQuery] = useState('')

  // ── Name search: when user clicks a person card we drill into their profile ──
  // 'grid'    → showing search results grid
  // 'profile' → showing a single user's full profile (drilled in from grid)
  const [nameView, setNameView] = useState('grid')

  // ── Hooks ──
  const { user, repos, loading: uLoading, error: uError, fetchUser, reset: resetUser } = useGithub()
  const { results, total, loading: nLoading, error: nError, search: searchByName, reset: resetName } = useSearchByName()
  const { history, addEntry, removeEntry, clearHistory } = useHistory()

  // ── Dark mode effect ──
  useEffect(() => {
    const html = document.documentElement
    darkMode ? html.classList.add('dark') : html.classList.remove('dark')
    localStorage.setItem('gh_darkmode', String(darkMode))
  }, [darkMode])

  // ── Handle search (called by SearchBar) ──
  const handleSearch = useCallback((query, searchMode) => {
    setCurrentQuery(query)

    if (searchMode === 'username') {
      resetName()
      setNameView('grid')
      fetchUser(query)
      addEntry(query)
    } else {
      resetUser()
      setNameView('grid')
      searchByName(query)
    }
  }, [fetchUser, searchByName, resetUser, resetName, addEntry])

  // ── Handle mode switch ──
  const handleModeChange = (newMode) => {
    setMode(newMode)
    resetUser()
    resetName()
    setCurrentQuery('')
    setNameView('grid')
  }

  // ── When user clicks a person card in grid → show their full profile ──
  const handleSelectPerson = useCallback((login) => {
    setNameView('profile')
    fetchUser(login)
  }, [fetchUser])

  // ── Back to grid from profile ──
  const handleBackToGrid = () => {
    setNameView('grid')
    resetUser()
  }

  // ── What to render in the main area ──
  const loading = uLoading || nLoading
  const error   = uError   || nError

  const showLanding    = !loading && !user && results.length === 0 && !error && !currentQuery
  const showULoading   = uLoading
  const showNLoading   = nLoading
  const showError      = !loading && !!error
  const showProfile    = !uLoading && !!user && (mode === 'username' || nameView === 'profile')
  const showGrid       = !nLoading && mode === 'name' && nameView === 'grid' && results.length >= 0 && currentQuery && !uLoading && !user

  return (
    <div className="app-root min-h-screen relative">
      <div className="bg-glow" />
      <div className="scanline" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-16">

        {/* Header */}
        <header className="flex items-center justify-between mb-10 fade-up">
          <div className="wordmark font-mono text-xs tracking-widest uppercase select-none">
            gh<span className="wordmark-dot">_</span>finder
          </div>
          <DarkModeToggle isDark={darkMode} onToggle={() => setDarkMode(d => !d)} />
        </header>

        {/* Search bar */}
        <div className="fade-up-d1">
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
            mode={mode}
            onModeChange={handleModeChange}
          />
        </div>

        {/* Main content */}
        <main className="mt-10 space-y-5">

          {/* Landing */}
          {showLanding && (
            <LandingHero
              onSearch={(u) => handleSearch(u, 'username')}
              history={history}
              onRemove={removeEntry}
              onClear={clearHistory}
            />
          )}

          {/* Username mode: loading skeleton */}
          {showULoading && (
            <div className="space-y-5">
              <div className="flex items-center justify-center gap-3 py-4 fade-up">
                <div className="spinner" />
                <span className="font-mono text-sm subtext">
                  Fetching <span style={{ color: 'var(--accent)' }}>@{currentQuery}</span>…
                </span>
              </div>
              <UserCardSkeleton />
              <RepoListSkeleton />
            </div>
          )}

          {/* Name mode: loading skeleton grid */}
          {showNLoading && (
            <div className="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="spinner" />
                <span className="font-mono text-sm subtext">
                  Finding people named <span style={{ color: 'var(--accent)' }}>"{currentQuery}"</span>…
                </span>
              </div>
              {/* Skeleton grid */}
              <div className="user-grid">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="person-card" style={{ cursor: 'default' }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="shimmer-bg w-12 h-12 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="shimmer-bg h-4 w-32 rounded" />
                        <div className="shimmer-bg h-3 w-20 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="shimmer-bg h-3 w-full rounded" />
                      <div className="shimmer-bg h-3 w-4/5 rounded" />
                      <div className="shimmer-bg h-3 w-3/5 rounded" />
                    </div>
                    <div className="pt-2.5 flex gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="shimmer-bg h-3 w-16 rounded" />
                      <div className="shimmer-bg h-3 w-16 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {showError && <ErrorCard type={error.type} message={error.message} />}

          {/* Name search results grid */}
          {showGrid && (
            <UserGrid
              results={results}
              total={total}
              query={currentQuery}
              onSelect={handleSelectPerson}
              loading={false}
            />
          )}

          {/* Profile view (username mode OR drilled from name search) */}
          {showProfile && (
            <>
              {/* Back button when drilled in from name search */}
              {mode === 'name' && nameView === 'profile' && (
                <button className="back-btn fade-up" onClick={handleBackToGrid}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to results for "{currentQuery}"
                </button>
              )}
              <UserCard user={user} />
              <RepoList repos={repos} total={user.public_repos} />
            </>
          )}

        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t footer-border">
          <div className="flex flex-wrap items-center justify-center gap-5 mb-5">
            <a href="https://github.com/Soumik633" target="_blank" rel="noopener noreferrer"
              className="footer-link flex items-center gap-1.5 text-xs font-mono transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/soumikpal-data" target="_blank" rel="noopener noreferrer"
              className="footer-link flex items-center gap-1.5 text-xs font-mono transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="mailto:soumikpal633@gmail.com"
              className="footer-link flex items-center gap-1.5 text-xs font-mono transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Mail Me
            </a>
          </div>
          <p className="text-center footer-copy text-xs font-mono">
            © {new Date().getFullYear()} Soumik Pal · Built with React + Vite + Tailwind ·{' '}
            <a href="https://docs.github.com/en/rest" target="_blank" rel="noopener noreferrer"
              className="footer-api-link transition-colors">GitHub REST API</a>
          </p>
        </footer>

      </div>
    </div>
  )
}

export default App
