"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, Lock } from "lucide-react"

interface ContentInputProps {
  licenseKey: string
  setLicenseKey: (key: string) => void
  content: string
  setContent: (content: string) => void
  onRunAudit: () => void
  isAuditing: boolean
}

export function ContentInput({
  licenseKey,
  setLicenseKey,
  content,
  setContent,
  onRunAudit,
  isAuditing,
}: ContentInputProps) {
  const isButtonDisabled = !content.trim() || !licenseKey.trim() || isAuditing

  return (
    <Card className="bg-card border-border mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5 text-primary" />
          Content Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            Agency License Key
          </label>
          <input
            type="password"
            placeholder="Enter your agency license key..."
            className="w-full px-4 py-2 bg-secondary border border-[#D4AF37]/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
          />
        </div>

        <Textarea
          placeholder="Paste your blog post, LinkedIn strategy, or any content you want to audit..."
          className="min-h-[200px] bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{content.split(/\s+/).filter(Boolean).length} words</p>
          <Button
            onClick={onRunAudit}
            disabled={isButtonDisabled}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
          >
            {isAuditing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Run Audit
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
