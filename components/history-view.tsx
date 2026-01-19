"use client"

import { FileDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuditEntry {
  id: string
  date: string
  contentSnippet: string
  humanityScore: number
  truthScore: number
  qualityScore: number
}

export function HistoryView() {
  const auditHistory: AuditEntry[] = [
    {
      id: "audit-001",
      date: "Jan 15, 2025 - 2:45 PM",
      contentSnippet: "How to boost your LinkedIn engagement in 30 days with proven strategies...",
      humanityScore: 87,
      truthScore: 92,
      qualityScore: 89,
    },
    {
      id: "audit-002",
      date: "Jan 14, 2025 - 11:20 AM",
      contentSnippet: "5 copywriting hacks that will transform your email campaigns and drive...",
      humanityScore: 76,
      truthScore: 85,
      qualityScore: 81,
    },
    {
      id: "audit-003",
      date: "Jan 13, 2025 - 3:15 PM",
      contentSnippet: "The ultimate guide to personal branding for entrepreneurs and agency owners...",
      humanityScore: 94,
      truthScore: 88,
      qualityScore: 91,
    },
    {
      id: "audit-004",
      date: "Jan 12, 2025 - 9:30 AM",
      contentSnippet: "Why your marketing strategy is failing and how to fix it in 7 steps...",
      humanityScore: 82,
      truthScore: 79,
      qualityScore: 80,
    },
    {
      id: "audit-005",
      date: "Jan 11, 2025 - 4:50 PM",
      contentSnippet: "Mastering the art of storytelling: A complete framework for agencies...",
      humanityScore: 91,
      truthScore: 93,
      qualityScore: 92,
    },
  ]

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Compliance Audit History</h1>
        <p className="text-muted-foreground">Review all your past compliance audits and download TrustCert certificates</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Past Audits</CardTitle>
          <CardDescription>Your recent content quality audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Content</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground text-xs">Authenticity</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground text-xs">Fact-Density</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground text-xs">Integrity</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {auditHistory.map((audit) => (
                  <tr key={audit.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 text-sm text-muted-foreground">{audit.date}</td>
                    <td className="py-4 px-4 text-sm text-foreground max-w-sm truncate">{audit.contentSnippet}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getScoreBadgeColor(audit.humanityScore)}`}
                      >
                        {audit.humanityScore}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getScoreBadgeColor(audit.truthScore)}`}
                      >
                        {audit.truthScore}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getScoreBadgeColor(audit.qualityScore)}`}
                      >
                        {audit.qualityScore}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        className="inline-flex items-center justify-center hover:opacity-70 transition-opacity"
                        title="Download PDF"
                      >
                        <FileDown className="w-5 h-5 text-primary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
