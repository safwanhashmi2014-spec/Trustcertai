import { ShieldCheck, ShieldAlert } from "lucide-react"

interface TrustBadgeProps {
  isPassing: boolean
  overallScore: number
}

export function TrustBadge({ isPassing, overallScore }: TrustBadgeProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 ${
          isPassing ? "border-success/30 bg-success/10" : "border-warning/30 bg-warning/10"
        }`}
      >
        {isPassing ? (
          <ShieldCheck className="w-10 h-10 text-success" />
        ) : (
          <ShieldAlert className="w-10 h-10 text-warning" />
        )}
        <div>
          <p className="font-semibold text-foreground">{isPassing ? "Verified by TrustCert" : "Review Recommended"}</p>
          <p className="text-sm text-muted-foreground">
            {isPassing
              ? `Content meets quality standards (${overallScore}%)`
              : `Content needs improvement (${overallScore}%)`}
          </p>
        </div>
      </div>
    </div>
  )
}
