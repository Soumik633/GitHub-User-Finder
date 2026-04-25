// ─────────────────────────────────────────
//   src/hooks/useSearchByName.js
//
//   PROBLEM: GitHub Search only finds users
//   who have set a display name. Many users
//   (especially students) leave it blank.
//
//   SOLUTION: 3-strategy parallel search:
//
//   Strategy 1 — in:name
//     Finds users whose display name matches
//     e.g. "Soumik" → finds @Soumik633 if
//     they set their name to "Soumik"
//
//   Strategy 2 — in:login
//     Finds users whose username contains the
//     query e.g. "soumik" → finds @Soumik633
//     @soumik-dev @soumik2024 etc.
//
//   Strategy 3 — Direct exact-match attempt
//     Treats the query as a possible exact
//     username and tries /users/{query} directly.
//     Works even if search index has no results.
//
//   All 3 run in parallel, results are merged
//   and deduplicated by user id, then each is
//   enriched with their full profile.
// ─────────────────────────────────────────

import { useState, useCallback } from 'react'
import axios from 'axios'
import { GITHUB_API } from '../utils/constants'
import { classifyError } from '../utils/helpers'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const apiClient = axios.create({
  baseURL: GITHUB_API,
  headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
})

export const useSearchByName = () => {
  const [results, setResults] = useState([])
  const [total,   setTotal]   = useState(0)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const reset = useCallback(() => {
    setResults([])
    setTotal(0)
    setError(null)
  }, [])

  const search = useCallback(async (query) => {
    if (!query?.trim()) return

    const q = query.trim()

    setLoading(true)
    setError(null)
    setResults([])
    setTotal(0)

    try {
      // ── Run all 3 strategies in parallel ──
      const [byName, byLogin, directHit] = await Promise.allSettled([

        // Strategy 1: search by display name field
        apiClient.get(
          `/search/users?q=${encodeURIComponent(q)}+in:name&per_page=10&sort=followers&order=desc`
        ),

        // Strategy 2: search by username (login) field
        // This catches users who never set a display name
        apiClient.get(
          `/search/users?q=${encodeURIComponent(q)}+in:login&per_page=10&sort=followers&order=desc`
        ),

        // Strategy 3: try the query as an exact username directly
        // /users/{login} works even when search index misses them
        apiClient.get(`/users/${encodeURIComponent(q)}`),
      ])

      // ── Collect all candidate logins, deduplicate by id ──
      const seen   = new Set()
      const merged = []

      const addItems = (items = []) => {
        for (const u of items) {
          if (!seen.has(u.id)) {
            seen.add(u.id)
            merged.push(u)
          }
        }
      }

      // Pull items from strategy 1 and 2 (search results)
      if (byName.status   === 'fulfilled') addItems(byName.value.data.items)
      if (byLogin.status  === 'fulfilled') addItems(byLogin.value.data.items)

      // Pull the direct hit from strategy 3 (full profile already)
      if (directHit.status === 'fulfilled') {
        const u = directHit.value.data
        if (!seen.has(u.id)) {
          seen.add(u.id)
          // Direct hit is already a full profile — mark it so we skip re-fetching
          u.__enriched = true
          merged.unshift(u) // Put exact match at the top
        }
      }

      // Total count = best estimate across strategies
      const totalCount =
        (byName.status  === 'fulfilled' ? byName.value.data.total_count  : 0) +
        (byLogin.status === 'fulfilled' ? byLogin.value.data.total_count : 0)

      setTotal(Math.max(totalCount, merged.length))

      if (merged.length === 0) {
        setResults([])
        setLoading(false)
        return
      }

      // ── Step 2: Enrich all non-enriched items with full profile ──
      // (Direct hit from strategy 3 is already full, skip it)
      const enriched = await Promise.allSettled(
        merged.map((u) =>
          u.__enriched
            ? Promise.resolve({ data: u })
            : apiClient.get(`/users/${u.login}`)
        )
      )

      const profiles = enriched
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value.data)

      setResults(profiles)
    } catch (err) {
      setError(classifyError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, total, loading, error, search, reset }
}
