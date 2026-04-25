// src/components/RepoList.jsx
import { useState } from 'react'
import { REPOS_PREVIEW_COUNT, LANG_COLORS } from '../utils/constants'
import { formatCount } from '../utils/helpers'

const FolderIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color:'var(--text-muted)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
)

const RepoRow = ({ repo }) => {
  const langColor = LANG_COLORS[repo.language] || 'var(--text-muted)'
  return (
    <div className="repo-row">
      <FolderIcon />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm hover:opacity-80 transition-opacity block truncate"
              style={{color:'var(--accent)'}}>
              {repo.name}
            </a>
            {repo.description && (
              <p className="text-xs mt-0.5 line-clamp-1 leading-relaxed" style={{color:'var(--text-secondary)'}}>
                {repo.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              {repo.language && (
                <span className="flex items-center gap-1 text-xs" style={{color:'var(--text-secondary)'}}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: langColor }} />
                  {repo.language}
                </span>
              )}
              {repo.fork && (
                <span className="flex items-center gap-1 text-xs" style={{color:'var(--text-muted)'}}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Fork
                </span>
              )}
              {repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' && (
                <span className="text-xs" style={{color:'var(--text-muted)'}}>{repo.license.spdx_id}</span>
              )}
              {repo.topics?.slice(0, 2).map((t) => (
                <span key={t} className="tag text-[10px] py-0.5">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5" style={{ color: 'var(--star-color)' }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-mono text-xs font-bold">{formatCount(repo.stargazers_count)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const RepoList = ({ repos }) => {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? repos : repos.slice(0, REPOS_PREVIEW_COUNT)
  if (repos.length === 0) return null

  return (
    <div className="card overflow-hidden fade-up-d2">
      <div className="px-5 py-4 flex items-center justify-between gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 flex-shrink-0" style={{color:'var(--accent)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="font-mono text-sm font-bold" style={{color:'var(--text-primary)'}}>Repositories</span>
          <span className="tag">{repos.length} public</span>
        </div>
        <span className="font-mono text-xs hidden sm:block" style={{color:'var(--text-muted)'}}>sorted by stars</span>
      </div>

      {displayed.map((repo) => <RepoRow key={repo.id} repo={repo} />)}

      {repos.length > REPOS_PREVIEW_COUNT && (
        <div className="px-5 py-3.5 text-center" style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={() => setShowAll((v) => !v)}
            className="font-mono text-xs hover:opacity-80 transition-opacity flex items-center gap-1.5 mx-auto"
            style={{color:'var(--accent)'}}>
            {showAll ? '▲ Show fewer' : '▼ Show all ' + repos.length + ' repositories'}
          </button>
        </div>
      )}
    </div>
  )
}

export default RepoList
