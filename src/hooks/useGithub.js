// ─────────────────────────────────────────
//   src/hooks/useGithub.js
//   Custom hook: fetch GitHub user + repos
// ─────────────────────────────────────────

import { useState, useCallback } from 'react'
import axios from 'axios'
import { GITHUB_API } from '../utils/constants'
import { classifyError } from '../utils/helpers'

// ── Optional: GitHub Personal Access Token ──
// Raises rate limit from 60 → 5,000 requests/hour.
// Create one at: https://github.com/settings/tokens (no scopes needed)
// Then add VITE_GITHUB_TOKEN=ghp_yourtoken to a .env file in project root.
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

// Axios instance — attaches auth header automatically when token is present
const apiClient = axios.create({
  baseURL: GITHUB_API,
  headers: GITHUB_TOKEN
    ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
    : {},
})

/**
 * useGithub
 * Encapsulates all GitHub API logic.
 *
 * Returns:
 *  - user      {object|null}  GitHub user object
 *  - repos     {array}        Sorted repos array
 *  - loading   {boolean}
 *  - error     {object|null}  { type, message }
 *  - fetchUser {function}     Call with a username string
 *  - reset     {function}     Clear all state
 */
export const useGithub = () => {
  const [user,    setUser]    = useState(null)
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const reset = useCallback(() => {
    setUser(null)
    setRepos([])
    setError(null)
  }, [])

  const fetchUser = useCallback(async (username) => {
    if (!username?.trim()) return

    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])

    try {
      // Fetch user profile and all repos in parallel for speed
      const [userRes, reposRes] = await Promise.all([
        apiClient.get(`/users/${username}`),
        apiClient.get(`/users/${username}/repos?per_page=100&sort=pushed`),
      ])

      setUser(userRes.data)

      // Sort repos by star count descending
      const sorted = [...reposRes.data].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      )
      setRepos(sorted)
    } catch (err) {
      setError(classifyError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  return { user, repos, loading, error, fetchUser, reset }
}
