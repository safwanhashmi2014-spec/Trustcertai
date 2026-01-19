"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, LogOut, Loader2, Download, Eye, EyeOff, Menu, X } from "lucide-react"
import { generatePDF } from "@/lib/generate-pdf"

// Types
interface AuditScores {
  humanity: number
  truth: number
  quality: number
}

interface HistoryRecord {
  id: string
  date: string
  contentSnippet: string
  humanityScore: number
  truthScore: number
  qualityScore: number
}

interface AgencyProfile {
  agencyName: string
  email: string
}

// Mock data for history
const mockHistoryData: HistoryRecord[] = [
  {
    id: "CERT-001",
    date: "2025-01-14",
    contentSnippet: "AI has revolutionized content creation by enabling agencies...",
    humanityScore: 92,
    truthScore: 88,
    qualityScore: 85,
  },
  {
    id: "CERT-002",
    date: "2025-01-13",
    contentSnippet: "Digital marketing strategies require understanding customer behavior...",
    humanityScore: 78,
    truthScore: 82,
    qualityScore: 75,
  },
  {
    id: "CERT-003",
    date: "2025-01-12",
    contentSnippet: "Social media engagement metrics show how brands connect with audiences...",
    humanityScore: 85,
    truthScore: 90,
    qualityScore: 88,
  },
  {
    id: "CERT-004",
    date: "2025-01-11",
    contentSnippet: "Email marketing remains one of the highest ROI channels in digital...",
    humanityScore: 81,
    truthScore: 79,
    qualityScore: 82,
  },
  {
    id: "CERT-005",
    date: "2025-01-10",
    contentSnippet: "Content calendars help agencies maintain consistent brand messaging...",
    humanityScore: 88,
    truthScore: 84,
    qualityScore: 86,
  },
]

// Pricing Component
function PricingSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">TrustCert Founder License</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The industry standard for agency compliance certification
          </p>
          <div className="mt-6 bg-destructive/10 border border-destructive/30 rounded-lg p-3 inline-block">
            <p className="text-sm font-bold text-destructive">
              STRATEGIC ACCESS: Only 5 Founder Licenses Remaining
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          {/* Founder License */}
          <div className="border-2 border-primary rounded-lg p-8 bg-card relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
              MOST POPULAR
            </div>
            <div className="absolute top-12 right-0 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold">
              LIMITED
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Founder's License</h3>
            <p className="text-muted-foreground text-sm mb-6">Lifetime access</p>
            <div className="mb-2">
              <span className="text-4xl font-bold text-foreground">$499</span>
              <span className="text-muted-foreground line-through ml-2">$999</span>
            </div>
            <p className="text-success text-xs font-semibold mb-6">50% OFF - Limited Time Only</p>
            <p className="text-destructive text-xs font-semibold mb-6">⚠ 5 spots left</p>
            <ul className="space-y-3 mb-8 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Permanent Agency License
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Unlimited Audits
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Full Verification History
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                White-label Certificates
              </li>
            </ul>
            <button className="w-full py-3 px-4 bg-[#d4af37] text-black rounded-lg hover:bg-[#e6c850] transition-colors font-bold">
              Secure My License Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Landing Page
function LandingPage({ onLoginClick, onGetStartedClick }: { onLoginClick: () => void; onGetStartedClick: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">TrustCert</div>
          <button
            onClick={onLoginClick}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Agency Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Content Audit Certification Built for Agencies
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            TrustCert analyzes your content for Humanity, Truth, and Client-Ready quality. Generate branded PDF
            certificates to prove your content's value to clients.
          </p>
          <button
            onClick={onGetStartedClick}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Pricing - kept on landing for non-authenticated users */}
      <div id="pricing-section">
        <PricingSection />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-muted-foreground text-sm">
        <p>&copy; 2025 TrustCert. All rights reserved.</p>
      </footer>
    </div>
  )
}

// Login Page
function LoginPage({
  onLogin,
  onBackToLanding,
}: { onLogin: (email: string, key: string) => void; onBackToLanding: () => void }) {
  const [email, setEmail] = useState("")
  const [licenseKey, setLicenseKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && licenseKey) {
      onLogin(email, licenseKey)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-border rounded-lg p-8 bg-card">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">Sign in to your TrustCert account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agency@example.com"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Agency License Key</label>
              <input
                type="password"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Enter your license key"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!email || !licenseKey}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold flex items-center gap-2"
            >
              Sign In
            </button>
          </form>

          <button
            onClick={onBackToLanding}
            className="w-full py-2 px-4 text-primary hover:underline text-sm font-medium mt-4"
          >
            Back to Landing
          </button>
        </div>
      </div>
    </div>
  )
}

// Dashboard - Audit Tab
function AuditTab() {
  const [licenseKey, setLicenseKey] = useState("")
  const [content, setContent] = useState("")
  const [isAuditing, setIsAuditing] = useState(false)
  const [scores, setScores] = useState<AuditScores | null>(null)
  const [verdict, setVerdict] = useState<string | null>(null)
  const [reportId, setReportId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAudit = async () => {
    if (!content.trim() || !licenseKey.trim()) return

    setIsAuditing(true)
    setError(null)
    setScores(null)
    setVerdict(null)
    setReportId(null)

    try {
      const response = await fetch("https://python--safwanhashmi201.replit.app/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content, content: content, license_key: licenseKey }),
      })

      if (response.status === 401) {
        setError("ACCESS DENIED: Please purchase a valid license key. Contact support for details.")
        setIsAuditing(false)
        return
      }

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Audit failed")

      const mappedScores = {
        humanity: Number(data.humanity_score || data.humanityScore || data.humanity || 0),
        truth: Number(data.truth_score || data.truthScore || data.truth || 0),
        quality: Number(data.quality_score || data.qualityScore || data.quality || 0),
      }

      // Ensure scores are valid numbers between 0-100
      Object.keys(mappedScores).forEach((key) => {
        const val = mappedScores[key as keyof AuditScores]
        if (isNaN(val) || val < 0) mappedScores[key as keyof AuditScores] = 0
        if (val > 100) mappedScores[key as keyof AuditScores] = 100
      })

      setScores(mappedScores)
      setVerdict(data.verdict || data.ai_verdict || null)
      setReportId(data.report_id || data.reportId || null)

      console.log("[v0] Audit response mapped:", { mappedScores, verdict: data.verdict, reportId: data.report_id })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run audit")
      console.log("[v0] Audit error:", err)
    } finally {
      setIsAuditing(false)
    }
  }

  const handleGeneratePDF = async () => {
    if (scores) {
      await generatePDF(scores, content, verdict, reportId)
    }
  }

  const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {score}%
        </span>
      </div>
      <div className="w-full bg-border rounded-full h-3 overflow-hidden">
        <div
          className="h-full transition-all duration-500 rounded-full"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-foreground mb-2">Content Quality Certification</h1>
      <p className="text-muted-foreground mb-8">
        Paste your content to get instant quality scores and a branded certificate.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">Agency License Key</label>
        <input
          type="password"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          placeholder="Enter your license key"
          className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">Content to Audit</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your blog post, LinkedIn strategy, or content here..."
          rows={6}
          className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <p className="text-xs text-muted-foreground mt-2">{content.length} characters</p>
      </div>

      <button
        onClick={runAudit}
        disabled={!content.trim() || !licenseKey.trim() || isAuditing}
        className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold flex items-center justify-center gap-2"
      >
        {isAuditing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Running Audit...
          </>
        ) : (
          "Run Audit"
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {scores && (
        <div className="mt-8 p-6 border border-border rounded-lg bg-card space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Compliance Audit Report</h2>
          <ScoreBar label="Human-Origin Authenticity Index" score={scores.humanity} color="#10b981" />
          <ScoreBar label="Fact-Density Verification" score={scores.truth} color="#3b82f6" />
          <ScoreBar label="Structural Integrity Index" score={scores.quality} color="#f59e0b" />

          {verdict && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm font-semibold text-foreground mb-2">AI Verdict</p>
              <p className="text-foreground text-sm">{verdict}</p>
            </div>
          )}

          {reportId && (
            <div className="p-4 bg-[#0f1e41]/5 border border-[#0f1e41]/20 rounded-lg">
              <p className="text-xs leading-relaxed font-medium" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                <span className="font-bold">Protocol Verification:</span> This audit utilizes the TrustCert Proprietary Protocol (Report ID: <code className="font-mono text-[#d4af37] bg-[#0f1e41]/10 px-1.5 py-0.5 rounded">{reportId}</code>) to certify linguistic variance and cross-reference structural authenticity for agency-client liability protection.
              </p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center pt-4 gap-3">
            {reportId && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Report ID:</p>
                <code className="text-xs font-mono font-semibold text-[#d4af37] bg-[#0f1e41]/10 px-3 py-1.5 rounded inline-block">#{reportId}</code>
              </div>
            )}
            <button
              onClick={handleGeneratePDF}
              className="w-full py-3 px-6 bg-[#d4af37] text-black rounded-lg hover:bg-[#e6c850] transition-colors font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Compliance Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Dashboard - History Tab
function HistoryTab() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-foreground mb-8">Audit History</h1>

      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Content Snippet</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground text-xs">Authenticity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground text-xs">Fact-Density</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground text-xs">Integrity</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockHistoryData.map((record) => (
              <tr key={record.id} className="border-b border-border hover:bg-card/50 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground">{new Date(record.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">{record.contentSnippet}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-success">
                      {record.humanityScore}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-info">
                      {record.truthScore}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-warning">
                      {record.qualityScore}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-primary hover:opacity-70 transition-opacity">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Dashboard - Settings Tab
function SettingsTab() {
  const [agencyName, setAgencyName] = useState("")
  const [email, setEmail] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const masterKey = "tc-2025-agency-master-001"

  const handleSaveProfile = async () => {
    if (!agencyName || !email) return

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("https://python--safwanhashmi201.replit.app/update-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agencyName, email }),
      })

      if (!response.ok) throw new Error("Failed to save settings")

      setMessage({ type: "success", text: "Profile saved successfully!" })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save profile. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-success/10 border-success/20 text-success"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Agency Profile Section */}
      <div className="border border-border rounded-lg p-6 bg-card mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Agency Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Agency Name</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              placeholder="Your agency name"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Primary Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agency@example.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={!agencyName || !email || loading}
            className="py-2 px-6 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-semibold flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>

      {/* License Management Section */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-2xl font-bold text-foreground mb-6">License Management</h2>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Active Master Key</label>
          <div className="flex gap-2">
            <input
              type={showKey ? "text" : "password"}
              value={masterKey}
              readOnly
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card/50 transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(masterKey)
                setMessage({ type: "success", text: "Key copied!" })
                setTimeout(() => setMessage(null), 2000)
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Copy
            </button>
          </div>
        </div>

        <button className="mt-6 py-2 px-6 border border-border text-foreground rounded-lg hover:bg-card/50 transition-colors font-semibold">
          Rotate Key
        </button>
      </div>
    </div>
  )
}

// Dashboard - Plans Tab
function PlansTab() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Upgrade Your Plan</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Current Plan: <span className="font-semibold text-foreground">Limited Founder Access</span>
        </p>
      </div>

      <PricingSection />
    </div>
  )
}

// Main Dashboard
function AuthenticatedDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"audit" | "history" | "plans" | "settings">("audit")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const tabs = [
    { id: "audit", label: "Audit", icon: "📋" },
    { id: "history", label: "History", icon: "📊" },
    { id: "plans", label: "Plans", icon: "💳" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-foreground">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold text-foreground">TrustCert</h1>
          </div>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                TC
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 border border-border rounded-lg bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-foreground hover:bg-card/50 flex items-center gap-2 rounded-lg border-b border-border"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } border-r border-border bg-card transition-all duration-300 overflow-hidden lg:w-64`}
        >
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-foreground hover:bg-card/50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeTab === "audit" && <AuditTab />}
          {activeTab === "history" && <HistoryTab />}
          {activeTab === "plans" && <PlansTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  )
}

// Main App Component
export default function Home() {
  const [view, setView] = useState<"landing" | "login" | "dashboard">("landing")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginClick = () => setView("login")
  const handleBackToLanding = () => setView("landing")

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // If logged in, this would be handled by the dashboard
      setView("dashboard")
    } else {
      // Scroll to pricing section
      setTimeout(() => {
        const pricingSection = document.getElementById("pricing-section")
        pricingSection?.scrollIntoView({ behavior: "smooth" })
      }, 0)
    }
  }

  const handleLogin = (email: string, licenseKey: string) => {
    if (email && licenseKey) {
      setIsAuthenticated(true)
      setView("dashboard")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setView("landing")
  }

  if (view === "landing") {
    return <LandingPage onLoginClick={handleLoginClick} onGetStartedClick={handleGetStarted} />
  }
  if (view === "login") {
    return <LoginPage onLogin={handleLogin} onBackToLanding={handleBackToLanding} />
  }
  return <AuthenticatedDashboard onLogout={handleLogout} />
}
