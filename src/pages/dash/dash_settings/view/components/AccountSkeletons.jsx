// Skeleton Components for loading states
export const ProfileCardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-14 w-14 animate-pulse rounded-full bg-gray-200 md:h-24 md:w-24" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>

    <div className="p-6">
      <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-12 animate-pulse rounded-lg bg-gray-200" />
          </div>
        ))}
        <div className="space-y-2 sm:col-span-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
);

export const QuickStatsSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </div>
);

export const PlanCardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <div className="h-5 w-5 animate-pulse rounded bg-blue-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="mt-1 h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>

    <div className="p-6">
      {/* Plan Period Skeleton */}
      <div className="mb-6 space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mx-auto h-4 w-40 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Token Usage Skeleton */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
        <div className="mt-2 ml-auto h-3 w-16 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Features Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="rounded-md bg-gray-100 p-1">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
        <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  </div>
);
