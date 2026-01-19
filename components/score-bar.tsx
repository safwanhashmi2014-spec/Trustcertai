"use client"

import { type ReactNode, useEffect, useState } from "react"

interface ScoreBarProps {
  label: string
  description: string
  score: number
  icon: ReactNode
  color: "success" | "info" | "warning"
}

const colorClasses = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
}

const iconColorClasses = {
  success: "text-success",
  info: "text-info",
  warning: "text-warning",
}

export function ScoreBar({ label, description, score, icon, color }: ScoreBarProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={iconColorClasses[color]}>{icon}</span>
          <div>
            <p className="font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <span className="text-xl font-bold text-foreground">{score}%</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${animatedScore}%` }}
        />
      </div>
    </div>
  )
}
