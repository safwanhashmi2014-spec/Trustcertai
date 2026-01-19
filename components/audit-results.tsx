"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScoreBar } from "./score-bar"
import { TrustBadge } from "./trust-badge"
import type { AuditScores } from "./audit-dashboard"
import { Download, Heart, Search, Award, MessageSquare, FileText, Hash } from "lucide-react"
import { useState } from "react"

interface AuditResultsProps {
  scores: AuditScores
  verdict: string | null
  reportId: string | null
  onGeneratePDF: () => Promise<void>
}

export function AuditResults({ scores, verdict, reportId, onGeneratePDF }: AuditResultsProps) {
  const overallScore = Math.round((scores.humanity + scores.truth + scores.quality) / 3)
  const isPassing = overallScore >= 70
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      await onGeneratePDF()
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Compliance Audit Report</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Overall:</span>
              <span className={`text-2xl font-bold ${isPassing ? "text-success" : "text-warning"}`}>
                {overallScore}%
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <ScoreBar
              label="Human-Origin Authenticity Index"
              description="Measures linguistic variance and human resonance indicators"
              score={scores.humanity}
              icon={<Heart className="w-4 h-4" />}
              color="success"
            />
            <ScoreBar
              label="Fact-Density Verification"
              description="AI-driven cross-reference verification for factual accuracy"
              score={scores.truth}
              icon={<Search className="w-4 h-4" />}
              color="info"
            />
            <ScoreBar
              label="Structural Integrity"
              description="Assessment of content coherence and professional standards"
              score={scores.quality}
              icon={<Award className="w-4 h-4" />}
              color="warning"
            />
          </div>

          {verdict && (
            <div className="p-4 bg-muted/50 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-1">AI Verdict</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{verdict}</p>
                </div>
              </div>
            </div>
          )}

          {reportId && (
            <div className="space-y-3">
              <div className="p-4 bg-[#0f1e41]/5 border border-[#0f1e41]/20 rounded-lg">
                <p className="text-xs leading-relaxed font-medium" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  <span className="font-bold">Protocol Verification:</span> This audit utilizes the TrustCert Proprietary Protocol (Report ID: <code className="font-mono text-[#d4af37] bg-[#0f1e41]/10 px-1.5 py-0.5 rounded">{reportId}</code>) to certify linguistic variance and cross-reference structural authenticity for agency-client liability protection.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <TrustBadge isPassing={isPassing} overallScore={overallScore} />
          </div>

          <div className="flex flex-col items-center justify-center pt-4 gap-3">
            {reportId && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Report ID:</p>
                <code className="text-xs font-mono font-semibold text-[#d4af37] bg-[#0f1e41]/10 px-3 py-1.5 rounded inline-block">#{reportId}</code>
              </div>
            )}
            <Button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="bg-[#d4af37] text-black hover:bg-[#e6c850] gap-2 px-8 py-5 text-base font-bold shadow-lg border border-[#d4af37]"
            >
              <Download className="w-5 h-5" />
              {isGenerating ? "Generating PDF..." : "Download Compliance Certificate"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
