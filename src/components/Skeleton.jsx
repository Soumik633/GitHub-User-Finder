// src/components/Skeleton.jsx
export const SkeletonBlock = ({ className = '' }) => (
  <div className={"shimmer-bg rounded " + className} />
)

export const UserCardSkeleton = () => (
  <div className="card p-6 fade-up">
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <SkeletonBlock className="w-24 h-24 rounded-full flex-shrink-0" />
      <div className="flex-1 w-full space-y-3">
        <SkeletonBlock className="h-6 w-44" />
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
        <div className="flex gap-3 mt-2 pt-1">
          {[1,2,3,4].map((i) => <SkeletonBlock key={i} className="h-14 w-20 rounded-lg" />)}
        </div>
      </div>
    </div>
  </div>
)

export const RepoListSkeleton = () => (
  <div className="card overflow-hidden fade-up-d1">
    <div className="px-5 py-4" style={{borderBottom:'1px solid var(--border)'}}>
      <SkeletonBlock className="h-4 w-32" />
    </div>
    {[1,2,3,4,5].map((i) => (
      <div key={i} className="repo-row">
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-4 w-48" />
          <SkeletonBlock className="h-3 w-full max-w-xs" />
          <SkeletonBlock className="h-3 w-20" />
        </div>
        <SkeletonBlock className="h-5 w-10 rounded flex-shrink-0" />
      </div>
    ))}
  </div>
)
