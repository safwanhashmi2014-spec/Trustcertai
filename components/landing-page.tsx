"use client"

import { Button } from "@/components/ui/button"
import { PricingSection } from "@/components/pricing-section"
import { ShieldCheck } from "lucide-react"

interface LandingPageProps {
  onLoginClick: () => void
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">TrustCert</span>
          </div>
          <Button onClick={onLoginClick} className="bg-primary hover:bg-primary/90">
            Agency Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            AI-Powered Content Quality Certification for Agencies
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Give your clients confidence with TrustCert's verified content audits. Score your content on Humanity,
            Truth, and Quality—then deliver a branded certificate they can trust.
          </p>
          <Button onClick={onLoginClick} size="lg" className="bg-primary hover:bg-primary/90 px-8">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 TrustCert. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  )
}
