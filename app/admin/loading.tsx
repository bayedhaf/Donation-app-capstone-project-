"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="min-h-screen min-w-full bg-linear-to-r from-indigo-50 to-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="border border-indigo-200 bg-white rounded-md p-4">
            <Skeleton className="h-6 w-40 mb-3" />
            <Skeleton className="h-4 w-64" />
          </div>
        ))}
      </div>
    </div>
  );
}
