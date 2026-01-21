"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ArrowLeft } from "lucide-react"

interface LoginPageProps {
  onLogin: (email: string, licenseKey: string) => void
  onBackToLanding: () => void
}

export function LoginPage({ onLogin, onBackToLanding }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [licenseKey, setLicenseKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !licenseKey) {
      alert("Please enter both email and license key")
      return
    }

    setIsLoading(true)

    // Simulate API validation (optional)
    setTimeout(() => {
      onLogin(email, licenseKey)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBackToLanding}
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-xl text-foreground">TrustCert</span>
        </div>

        {/* Login Card */}
        <Card className="border border-border">
          <CardHeader className="text-center">
            <CardTitle>Agency Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="hello@youragency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">License Key</label>
                <Input
                  type="password"
                  placeholder="Enter your license key"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="bg-background border-border"
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="p-3 bg-muted/50 border border-border rounded-lg text-center">
                <p className="text-xs font-medium text-foreground mb-1">Free Trial Available</p>
                <p className="text-xs text-muted-foreground">2 Complimentary Audits</p>
              </div>
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg text-center">
                <p className="text-xs font-medium text-foreground mb-1">TrustCert Founder License</p>
                <p className="text-sm font-bold text-[#d4af37]">$499 Lifetime Access</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              New user?{" "}
              <button onClick={onBackToLanding} className="text-primary hover:underline font-medium">
                Start Free Trial
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
