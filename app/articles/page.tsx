"use client"

import { Suspense } from "react"
import ArticlesContent from "./ArticlesContent"

export const dynamic = "force-dynamic"

export default function ArticlesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-gray-400">Loading articles...</div>}>
      <ArticlesContent />
    </Suspense>
  )
}