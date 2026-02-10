"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Shield, User, AlertTriangle, Search, Camera } from "lucide-react"

interface VerificationResult {
  isValid: boolean
  identity: {
    name: string
    nationality: string
    id: string
    verificationLevel: string
    emergencyContact: string
  }
  riskLevel: "low" | "medium" | "high"
  lastVerified: Date
  blockchainConfirmed: boolean
}

export function AuthorityVerification() {
  const [scanMode, setScanMode] = useState<"qr" | "manual" | null>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [manualId, setManualId] = useState("")

  const handleQRScan = () => {
    setIsScanning(true)
    setScanMode("qr")

    // Simulate QR scan
    setTimeout(() => {
      setIsScanning(false)
      setVerificationResult({
        isValid: true,
        identity: {
          name: "John Doe",
          nationality: "United States",
          id: "tourist-id-12345",
          verificationLevel: "verified",
          emergencyContact: "+1-555-0123",
        },
        riskLevel: "low",
        lastVerified: new Date(),
        blockchainConfirmed: true,
      })
    }, 3000)
  }

  const handleManualVerification = () => {
    if (!manualId.trim()) return

    setScanMode("manual")
    setVerificationResult({
      isValid: true,
      identity: {
        name: "Jane Smith",
        nationality: "Canada",
        id: manualId,
        verificationLevel: "premium",
        emergencyContact: "+1-555-0456",
      },
      riskLevel: "low",
      lastVerified: new Date(Date.now() - 3600000),
      blockchainConfirmed: true,
    })
  }

  const resetVerification = () => {
    setScanMode(null)
    setVerificationResult(null)
    setManualId("")
  }

  if (verificationResult) {
    return (
      <div className="space-y-4">
        <Card
          className={`${verificationResult.isValid ? "bg-accent/5 border-accent/20" : "bg-destructive/5 border-destructive/20"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verificationResult.isValid ? (
                <CheckCircle className="h-5 w-5 text-accent" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
              Verification {verificationResult.isValid ? "Successful" : "Failed"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{verificationResult.identity.name}</p>
                <p className="text-xs text-muted-foreground">{verificationResult.identity.nationality}</p>
              </div>
              <div className="text-right">
                <Badge
                  variant={verificationResult.identity.verificationLevel === "premium" ? "destructive" : "default"}
                >
                  {verificationResult.identity.verificationLevel}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tourist ID:</span>
                <span className="font-mono">{verificationResult.identity.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Risk Level:</span>
                <Badge
                  variant={
                    verificationResult.riskLevel === "low"
                      ? "default"
                      : verificationResult.riskLevel === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {verificationResult.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Blockchain Status:</span>
                <div className="flex items-center gap-1">
                  {verificationResult.blockchainConfirmed ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-xs">
                    {verificationResult.blockchainConfirmed ? "Confirmed" : "Unconfirmed"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Verified:</span>
                <span className="text-xs">{verificationResult.lastVerified.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={resetVerification}>
                New Scan
              </Button>
              <Button variant="default" className="flex-1">
                Grant Access
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Emergency Contact:</span>
                <span className="font-medium">{verificationResult.identity.emergencyContact}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Medical Info:</span>
                <span className="text-xs text-muted-foreground">Available on request</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isScanning) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">Scanning QR Code</h3>
            <p className="text-sm text-muted-foreground">
              Point camera at the tourist's QR code to verify their blockchain identity.
            </p>
            <Button variant="outline" onClick={() => setIsScanning(false)}>
              Cancel Scan
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Identity Verification System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Verify tourist identity using blockchain-secured digital IDs. Choose verification method below.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="default" className="h-auto p-4 flex items-center gap-3" onClick={handleQRScan}>
              <Camera className="h-6 w-6" />
              <div className="text-left">
                <p className="font-medium">Scan QR Code</p>
                <p className="text-xs opacity-80">Use camera to scan tourist's QR code</p>
              </div>
            </Button>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Tourist ID manually"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleManualVerification}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            Verification Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-accent mt-0.5" />
              <span>Green verification indicates valid blockchain identity</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-secondary mt-0.5" />
              <span>Yellow indicates pending blockchain confirmation</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
              <span>Red indicates invalid or tampered identity</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
