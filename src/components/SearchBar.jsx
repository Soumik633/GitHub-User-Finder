// ─────────────────────────────────────────
//   src/components/SearchBar.jsx
//   Search input with mode toggle:
//   "By Username" vs "By Name"
// ─────────────────────────────────────────

import { useState, useRef, useEffect } from 'react'

/**
 * SearchBar
 * Props:
 *  - onSearch    {function}  Called with (query, mode)
 *                            mode = 'username' | 'name'
 *  - loading     {boolean}
 *  - mode        {string}    Controlled from parent
 *  - onModeChange{function}  Parent updates mode state
 */
const SearchBar = ({ onSearch, loading, mode, onModeChange }) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  // Clear input and error when mode changes
  useEffect(() => {
    setValue('')
    setError('')
    inputRef.current?.focus()
  }, [mode])

  const isUsername = mode === 'username'

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      setError(isUsername ? 'Please enter a GitHub username' : 'Please enter a name to search')
      inputRef.current?.focus()
      return
    }
    if (isUsername && !/^[a-zA-Z0-9-]{1,39}$/.test(trimmed)) {
      setError('Invalid username — only letters, numbers and hyphens allowed')
      return
    }
    if (!isUsername && trimmed.length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    setError('')
    onSearch(trimmed, mode)
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit() }
  const handleChange  = (e) => { setValue(e.target.value); if (error) setError('') }

  return (
    <div className="w-full">
      {/* ── Mode toggle tabs ── */}
      <div className="flex gap-1 mb-3 p-1 rounded-xl w-fit" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
        <button
          onClick={() => onModeChange('username')}
          className={"mode-tab font-mono text-xs px-4 py-2 rounded-lg transition-all " + (isUsername ? 'mode-tab-active' : 'mode-tab-inactive')}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            By Username
          </span>
        </button>
        <button
          onClick={() => onModeChange('name')}
          className={"mode-tab font-mono text-xs px-4 py-2 rounded-lg transition-all " + (!isUsername ? 'mode-tab-active' : 'mode-tab-inactive')}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            By Name
          </span>
        </button>
      </div>

      {/* ── Input row ── */}
      <div className="relative flex gap-2 items-center">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <svg className="w-4 h-4" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isUsername ? 'Enter GitHub username  e.g. torvalds' : 'Enter a real name  e.g. Linus Torvalds'}
          className="search-input flex-1 pl-10 pr-4 py-3.5 rounded-xl font-mono text-sm"
          disabled={loading}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize={isUsername ? 'off' : 'words'}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary px-6 py-3.5 rounded-xl whitespace-nowrap flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-3 h-3 rounded-full border border-white/30 border-t-white"
                style={{ animation: 'spin 0.7s linear infinite' }} />
              {isUsername ? 'Fetching…' : 'Searching…'}
            </>
          ) : (
            isUsername ? 'Search' : 'Find People'
          )}
        </button>
      </div>

      {/* Helper hint for name mode */}
      {!isUsername && !error && (
        <p className="mt-2 text-xs font-mono flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
          <span>💡</span>
          Results show bio, location &amp; company so you can identify the right person
        </p>
      )}

      {/* Validation error */}
      {error && (
        <p role="alert" className="mt-2 text-xs font-mono flex items-center gap-1.5" style={{ color: 'var(--red)' }}>
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default SearchBar
