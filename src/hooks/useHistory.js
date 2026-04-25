// ─────────────────────────────────────────
//   src/hooks/useHistory.js
//   Manages recent search history in localStorage
// ─────────────────────────────────────────

import { useState } from 'react'
import { HISTORY_KEY, MAX_HISTORY } from '../utils/constants'
import { readHistory, writeHistory } from '../utils/helpers'

export const useHistory = () => {
  const [history, setHistory] = useState(() => readHistory(HISTORY_KEY))

  const addEntry = (username) => {
    setHistory((prev) => {
      const updated = writeHistory(HISTORY_KEY, prev, username, MAX_HISTORY)
      return updated
    })
  }

  // Remove a single entry by username
  const removeEntry = (username) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h !== username)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY)
    setHistory([])
  }

  return { history, addEntry, removeEntry, clearHistory }
}
