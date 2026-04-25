// ─────────────────────────────────────────
//   src/utils/constants.js
//   App-wide constants and config values
// ─────────────────────────────────────────

/** GitHub REST API base URL */
export const GITHUB_API = 'https://api.github.com'

/** Number of repos to show before "Show all" */
export const REPOS_PREVIEW_COUNT = 8

/** Max recent search history entries stored in localStorage */
export const MAX_HISTORY = 5

/** localStorage key for search history */
export const HISTORY_KEY = 'gh_finder_history'

/** Debounce delay (ms) for search input auto-search */
export const DEBOUNCE_MS = 500

/** Famous GitHub usernames shown on the landing screen */
export const FEATURED_USERS = [
  'torvalds',
  'gaearon',
  'tj',
  'sindresorhus',
  'yyx990803',
  'kentcdodds',
]

/**
 * Language → color map for repository language dots.
 * Source: github-linguist
 */
export const LANG_COLORS = {
  JavaScript:  '#f1e05a',
  TypeScript:  '#3178c6',
  Python:      '#3572A5',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  Java:        '#b07219',
  Go:          '#00ADD8',
  Rust:        '#dea584',
  Ruby:        '#701516',
  Shell:       '#89e051',
  C:           '#555555',
  'C++':       '#f34b7d',
  'C#':        '#178600',
  Vue:         '#41b883',
  Swift:       '#F05138',
  Kotlin:      '#A97BFF',
  PHP:         '#4F5D95',
  Dart:        '#00B4AB',
  Scala:       '#c22d40',
  Elixir:      '#6e4a7e',
  Haskell:     '#5e5086',
  R:           '#198CE7',
  MATLAB:      '#e16737',
  Lua:         '#000080',
  Perl:        '#0298c3',
}
