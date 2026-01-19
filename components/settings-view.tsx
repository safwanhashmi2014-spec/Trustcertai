"use client"

import { useState } from "react"
import { Copy, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SettingsView() {
  const [agencyName, setAgencyName] = useState("Your Agency Name")
  const [primaryEmail, setPrimaryEmail] = useState("hello@youragency.com")
  const [masterKey, setMasterKey] = useState("TC-MASTER-KEY-7f9e4b2d8c1a9k3x")
  const [showKey, setShowKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [saveMessage, setSaveMessage] = useState("")

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSaveStatus("idle")
    setSaveMessage("")

    try {
      const response = await fetch("https://python--safwanhashmi201.replit.app/update-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agency_name: agencyName,
          primary_email: primaryEmail,
          master_key: masterKey,
        }),
      })

      if (response.ok) {
        setSaveStatus("success")
        setSaveMessage("Profile saved successfully!")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
        setSaveMessage("Failed to save profile. Please try again.")
        setTimeout(() => setSaveStatus("idle"), 3000)
      }
    } catch (error) {
      setSaveStatus("error")
      setSaveMessage("Connection error. Please check your backend URL.")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRotateKey = () => {
    const newKey = "TC-MASTER-KEY-" + Math.random().toString(36).substring(2, 15)
    setMasterKey(newKey)
    setSaveStatus("success")
    setSaveMessage("Master Key rotated successfully!")
    setTimeout(() => setSaveStatus("idle"), 3000)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(masterKey)
    setSaveStatus("success")
    setSaveMessage("Master Key copied to clipboard!")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your agency profile and license</p>
      </div>

      {saveStatus !== "idle" && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            saveStatus === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          {saveStatus === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span className={saveStatus === "success" ? "text-green-700" : "text-red-700"}>{saveMessage}</span>
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agency Profile</CardTitle>
          <CardDescription>Update your agency information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Agency Name</label>
            <Input
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              placeholder="Your Agency Name"
              className="bg-background border-border"
              disabled={isSaving}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Email</label>
            <Input
              value={primaryEmail}
              onChange={(e) => setPrimaryEmail(e.target.value)}
              placeholder="hello@youragency.com"
              type="email"
              className="bg-background border-border"
              disabled={isSaving}
            />
          </div>
          <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>License Management</CardTitle>
          <CardDescription>Manage your TrustCert license and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Active Master Key</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-2 font-mono text-sm text-foreground">
                {showKey ? masterKey : "•".repeat(masterKey.length)}
              </div>
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 border border-border rounded-lg transition-colors text-sm font-medium"
              >
                {showKey ? "Hide" : "Show"}
              </button>
              <Button onClick={handleCopyKey} variant="outline" size="icon" title="Copy Master Key">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Keep this key secure. Anyone with this key can access your agency's audits.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              onClick={handleRotateKey}
              variant="outline"
              className="border-border hover:bg-secondary bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Rotate Master Key
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Rotating your key will invalidate the current one. All active sessions will be logged out.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
