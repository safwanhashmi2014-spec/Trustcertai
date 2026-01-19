import type { AuditScores } from "@/components/audit-dashboard"

export async function generatePDF(
  scores: AuditScores,
  content: string,
  verdict: string | null,
  reportId: string | null,
) {
  const overallScore = Math.round((scores.humanity + scores.truth + scores.quality) / 3)
  const isPassing = overallScore >= 70

  const auditDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const verificationId =
    reportId ||
    `TC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#228b22"
    if (score >= 50) return "#daa520"
    return "#b22222"
  }

  const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>TrustCert Certificate - ${verificationId}</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      background: #fffcf5;
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 8mm;
    }
    .certificate {
      border: 4px solid #0a1428;
      padding: 4mm;
      height: calc(297mm - 16mm);
      position: relative;
    }
    .inner-border {
      border: 2px solid #d4af37;
      padding: 4mm;
      height: 100%;
    }
    .third-border {
      border: 0.5px solid #0f1e41;
      padding: 15mm;
      height: 100%;
      position: relative;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20mm;
    }
    .logo-box {
      background: #0f1e41;
      padding: 8px 16px;
      border-radius: 4px;
    }
    .logo-text {
      color: white;
      font-size: 18px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
    }
    .logo-subtitle {
      color: #d4af37;
      font-size: 8px;
      letter-spacing: 2px;
      font-family: 'Helvetica', sans-serif;
    }
    .seal {
      width: 80px;
      height: 80px;
      background: #0f1e41;
      border-radius: 50%;
      border: 3px solid #d4af37;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .seal::before {
      content: '';
      position: absolute;
      width: 65px;
      height: 65px;
      border: 1px solid #d4af37;
      border-radius: 50%;
    }
    .seal-text {
      color: #d4af37;
      font-size: 7px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
    }
    .seal-main {
      color: #d4af37;
      font-size: 11px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
    }
    .title {
      text-align: center;
      margin-bottom: 15mm;
    }
    .title h1 {
      color: #0f1e41;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 5mm;
    }
    .title-line {
      width: 120px;
      height: 3px;
      background: #d4af37;
      margin: 0 auto 3mm;
    }
    .title-line-thin {
      width: 140px;
      height: 1px;
      background: #d4af37;
      margin: 0 auto;
    }
    .date-box {
      background: #f8f8fa;
      border: 1px solid #0f1e41;
      border-radius: 6px;
      padding: 12px 20px;
      text-align: center;
      margin: 0 40px 15mm;
    }
    .date-label {
      color: #0f1e41;
      font-size: 10px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
      letter-spacing: 1px;
    }
    .date-value {
      color: #3c3c3c;
      font-size: 14px;
      margin-top: 4px;
    }
    .scores-header {
      text-align: center;
      color: #0f1e41;
      font-size: 14px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
      letter-spacing: 1px;
      margin-bottom: 8mm;
      position: relative;
    }
    .scores-header::before,
    .scores-header::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 60px;
      height: 1px;
      background: #d4af37;
    }
    .scores-header::before { left: 30px; }
    .scores-header::after { right: 30px; }
    .scores-grid {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 10mm;
    }
    .score-box {
      background: white;
      border: 1.5px solid #0f1e41;
      border-radius: 6px;
      padding: 12px;
      width: 120px;
      text-align: center;
      position: relative;
    }
    .score-box::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 10px;
      right: 10px;
      height: 3px;
      background: #d4af37;
    }
    .score-label {
      color: #0f1e41;
      font-size: 10px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
      margin-top: 8px;
    }
    .score-value {
      font-size: 28px;
      font-weight: bold;
      margin: 5px 0;
    }
    .score-desc {
      color: #666;
      font-size: 8px;
      font-family: 'Helvetica', sans-serif;
    }
    .overall-badge {
      background: #0f1e41;
      border: 2px solid #d4af37;
      border-radius: 8px;
      padding: 12px 30px;
      text-align: center;
      margin: 0 auto 10mm;
      width: fit-content;
    }
    .overall-label {
      color: white;
      font-size: 10px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
    }
    .overall-value {
      color: #d4af37;
      font-size: 22px;
      font-weight: bold;
    }
    .verdict-section {
      text-align: center;
      margin-bottom: 48mm;
      /* increased from 8mm to 48mm (40px equivalent) to prevent overlap with footer */
    }
    .cert-statement {
      text-align: center;
      color: #3c3c3c;
      font-size: 11px;
      margin: 8mm 20px;
    }
    .footer {
      position: absolute;
      bottom: 20mm;
      left: 15mm;
      right: 15mm;
      text-align: center;
      page-break-inside: avoid;
      /* added page-break-inside: avoid to prevent footer from breaking across pages */
    }
    .footer-line {
      width: calc(100% - 60px);
      height: 1px;
      background: #d4af37;
      margin: 0 auto 8px;
    }
    .footer-auth {
      color: #0f1e41;
      font-size: 12px;
      font-weight: bold;
      font-family: 'Helvetica', sans-serif;
    }
    .footer-id {
      color: #d4af37;
      font-size: 11px;
      margin-top: 4px;
    }
    .footer-note {
      color: #787878;
      font-size: 8px;
      margin-top: 8px;
      font-family: 'Helvetica', sans-serif;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="inner-border">
      <div class="third-border">
        <div class="header">
          <div class="logo-box">
            <div class="logo-text">TrustCert</div>
            <div class="logo-subtitle">QUALITY ASSURANCE</div>
          </div>
          <div class="seal">
            <span class="seal-text">OFFICIAL</span>
            <span class="seal-main">CERTIFIED</span>
            <span class="seal-text">CONTENT</span>
          </div>
        </div>

        <div class="title">
          <h1>Official Content Audit<br>Certificate</h1>
          <div class="title-line"></div>
          <div class="title-line-thin"></div>
        </div>

        <div class="date-box">
          <div class="date-label">AUDIT DATE</div>
          <div class="date-value">${auditDate}</div>
        </div>

        <div class="scores-header">QUALITY ASSESSMENT SCORES</div>

        <div class="scores-grid">
          <div class="score-box">
            <div class="score-label">HUMANITY</div>
            <div class="score-value" style="color: ${getScoreColor(scores.humanity)}">${scores.humanity}%</div>
            <div class="score-desc">Human Resonance</div>
          </div>
          <div class="score-box">
            <div class="score-label">TRUTH</div>
            <div class="score-value" style="color: ${getScoreColor(scores.truth)}">${scores.truth}%</div>
            <div class="score-desc">Fact Verification</div>
          </div>
          <div class="score-box">
            <div class="score-label">QUALITY</div>
            <div class="score-value" style="color: ${getScoreColor(scores.quality)}">${scores.quality}%</div>
            <div class="score-desc">Client Ready</div>
          </div>
        </div>

        <div class="overall-badge">
          <div class="overall-label">OVERALL SCORE</div>
          <div class="overall-value">${overallScore}%</div>
        </div>

        ${
          verdict
            ? `
        <div class="verdict-section">
          <div class="verdict-label">AI VERDICT</div>
          <div class="verdict-box">
            <div class="verdict-text">${verdict}</div>
          </div>
        </div>
        `
            : ""
        }

        <div class="cert-statement">
          ${
            isPassing
              ? "This content has been analyzed and CERTIFIED as meeting professional quality standards."
              : "This content has been analyzed. Additional review is recommended."
          }
        </div>

        <div class="footer">
          <div class="footer-line"></div>
          <div class="footer-auth">Authenticated by TrustCert Protocol</div>
          <div class="footer-id">Verification ID: ${verificationId}</div>
          <div class="footer-note">This certificate represents an AI-assisted quality assessment.<br>For verification, contact verify@trustcert.io</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>
`

  // Open certificate in new window for printing/saving as PDF
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(certificateHTML)
    printWindow.document.close()
  }
}
