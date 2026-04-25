// ─────────────────────────────────────────
//   src/hooks/useDebounce.js
//   Returns a debounced version of `value`
// ─────────────────────────────────────────

import { useState, useEffect } from 'react'

/**
 * useDebounce
 * Delays updating the returned value until `delay` ms
 * have elapsed without `value` changing.
 *
 * @param {any}    value  - The value to debounce
 * @param {number} delay  - Delay in milliseconds
 * @returns {any}          Debounced value
 */
export const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    // Cleanup: cancel the timer if value changes before delay
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
