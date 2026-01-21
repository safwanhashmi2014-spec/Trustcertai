"use client"

import { Check, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"



export function PricingSection() {
  const trialFeatures = [
    "2 Total Compliance Audits",
    "Standard Report ID",
    "Basic Audit Results",
    "No PDF Certificate Download",
  ]

  const founderFeatures = [
    "Permanent Agency License",
    "Unlimited Audits",
    "Full Verification ID History",
    "PDF Certificate Downloads",
    "White-label Options",
    "Lifetime Updates",
    "Priority 24/7 Support",
    "Custom Integration Support",
  ]

  const spotsLeft = 5

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Urgency Banner */}
        <div className="mb-8 bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
          <p className="text-sm font-bold text-destructive">
            STRATEGIC ACCESS: Only {spotsLeft} Founder Licenses Remaining
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Start with a free trial or unlock unlimited access with a Founder License
          </p>
        </div>

        {/* Pricing Cards - Trial and Founder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Trial Card */}
          <div className="rounded-2xl border border-border bg-card p-8 relative flex flex-col hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-semibold text-foreground mb-2">Complimentary Security Clearance</h3>
            <p className="text-sm text-muted-foreground mb-6">Risk-free trial to test TrustCert</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-sm text-muted-foreground">forever</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">No credit card required</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {trialFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg py-2.5 font-bold">
              Start Free Audit
            </Button>
          </div>

          {/* Founder's License - Most Popular */}
          <div className="rounded-2xl border-2 border-primary bg-card p-8 relative flex flex-col shadow-lg hover:shadow-xl transition-shadow">
            {/* Limited Availability Badge */}
            <div className="absolute -top-4 left-8 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              LIMITED: {spotsLeft} spots left
            </div>

            {/* Most Popular Badge */}
            <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              Most Popular
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Founder's License</h3>
            <p className="text-sm text-muted-foreground mb-6">Lifetime access with unlimited power</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">$499</span>
                <span className="text-lg text-muted-foreground line-through">$999</span>
              </div>
              <p className="text-xs text-destructive mt-2 font-medium">50% OFF - Limited Time Only</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {founderFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-[#d4af37] text-black hover:bg-[#e6c850] rounded-lg py-2.5 font-bold">
              Secure My License Now
            </Button>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Join 500+ agencies using TrustCert for compliance certification. 30-day money-back guarantee.
          </p>
          <p className="text-xs text-muted-foreground">
            Questions?{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
