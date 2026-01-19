"use client"

import { useState } from "react"
import { ContentInput } from "./content-input"
import { AuditResults } from "./audit-results"
import { generatePDF } from "@/lib/generate-pdf"

export interface AuditScores {
  humanity: number
  truth: number
  quality: number
}

export function AuditDashboard() {
  const [licenseKey, setLicenseKey] = useState("")
  const [content, setContent] = useState("")
  const [isAuditing, setIsAuditing] = useState(false)
  const [scores, setScores] = useState<AuditScores | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [verdict, setVerdict] = useState<string | null>(null)
  const [reportId, setReportId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAudit = async () => {
    if (!content.trim() || !licenseKey.trim()) return

    setIsAuditing(true)
    setShowResults(false)
    setError(null)
    setVerdict(null)
    setReportId(null)

    try {
      const response = await fetch("https://python--safwanhashmi201.replit.app/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: content, content: content, license_key: licenseKey }),
      })

      if (response.status === 401) {
        const errorMessage = "ACCESS DENIED: Please purchase a valid license key. Contact support for details."
        alert(errorMessage)
        setError(errorMessage)
        setIsAuditing(false)
        return
      }

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error(`Audit failed (${response.status}): ${responseText}`)
      }

      const data = JSON.parse(responseText)

      const extractedScores = {
        humanity: data.humanity ?? data.scores?.humanity ?? 0,
        truth: data.truth ?? data.scores?.truth ?? 0,
        quality: data.quality ?? data.scores?.quality ?? 0,
      }

      setScores(extractedScores)
      setVerdict(data.verdict ?? null)
      setReportId(data.report_id ?? null)
      setShowResults(true)
    } catch (err) {
      console.error("Audit error:", err)
      setError(err instanceof Error ? err.message : "Failed to run audit. Please try again.")
    } finally {
      setIsAuditing(false)
    }
  }

  const handleGeneratePDF = async () => {
    if (scores) {
      await generatePDF(scores, content, verdict, reportId)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          Content Quality Certification
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          Paste your content below to generate a branded compliance certificate with Human-Origin Authenticity, Fact-Density Verification, and Structural Integrity scores.
        </p>
      </div>

      <ContentInput
        licenseKey={licenseKey}
        setLicenseKey={setLicenseKey}
        content={content}
        setContent={setContent}
        onRunAudit={runAudit}
        isAuditing={isAuditing}
      />

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-center">
          {error}
        </div>
      )}

      {showResults && scores && (
        <AuditResults scores={scores} verdict={verdict} reportId={reportId} onGeneratePDF={handleGeneratePDF} />
      )}
    </div>
  )
}
