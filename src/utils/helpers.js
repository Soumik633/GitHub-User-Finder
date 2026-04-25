// ─────────────────────────────────────────
//   src/utils/helpers.js
//   Pure utility / formatting functions
// ─────────────────────────────────────────

/**
 * Format a number to compact notation.
 * e.g. 1234 → "1.2k",  980 → "980"
 */
export const formatCount = (n) => {
  if (n === undefined || n === null) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`
  return n.toLocaleString()
}

/**
 * Format an ISO date string to a human-readable date.
 * e.g. "2011-04-10T20:09:31Z" → "April 10, 2011"
 */
export const formatDate = (iso) => {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/**
 * Ensure a URL has an https:// prefix.
 */
export const ensureHttps = (url) => {
  if (!url) return url
  return url.startsWith('http') ? url : `https://${url}`
}

/**
 * Strip the protocol from a URL for display.
 * e.g. "https://example.com" → "example.com"
 */
export const stripProtocol = (url) => {
  if (!url) return url
  return url.replace(/^https?:\/\//, '')
}

/**
 * Read search history from localStorage.
 * Returns an array of username strings, or [] on error.
 */
export const readHistory = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

/**
 * Persist updated history to localStorage.
 * Prepends the new entry and caps at maxItems.
 */
export const writeHistory = (key, current, newEntry, maxItems) => {
  const updated = [newEntry, ...current.filter((h) => h !== newEntry)].slice(0, maxItems)
  localStorage.setItem(key, JSON.stringify(updated))
  return updated
}

/**
 * Classify an Axios error into one of four types:
 * 'notFound' | 'rateLimit' | 'network' | 'generic'
 */
export const classifyError = (err) => {
  if (!err.response)                    return { type: 'network',   message: 'Network error — check your connection.' }
  if (err.response.status === 404)      return { type: 'notFound',  message: 'User not found on GitHub.' }
  if (err.response.status === 403)      return { type: 'rateLimit', message: 'GitHub API rate limit exceeded.' }
  return { type: 'generic', message: err.response?.data?.message || 'An unexpected error occurred.' }
}
