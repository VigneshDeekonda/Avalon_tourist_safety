"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, QrCode, Key, CheckCircle, Globe, Lock, Copy, Eye, EyeOff, Smartphone, Building } from "lucide-react"

interface BlockchainTransaction {
  id: string
  type: "verification" | "update" | "access"
  timestamp: Date
  verifier: string
  status: "confirmed" | "pending" | "failed"
  blockHash: string
}

interface DigitalIdentity {
  id: string
  walletAddress: string
  name: string
  nationality: string
  passportNumber: string
  emergencyContact: string
  verificationLevel: "basic" | "verified" | "premium"
  createdAt: Date
  lastUpdated: Date
}

export function BlockchainID() {
  const [identity, setIdentity] = useState<DigitalIdentity>({
    id: "tourist-id-12345",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    name: "John Doe",
    nationality: "United States",
    passportNumber: "US123456789",
    emergencyContact: "+1-555-0123",
    verificationLevel: "verified",
    createdAt: new Date("2024-01-15"),
    lastUpdated: new Date(),
  })

  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([
    {
      id: "tx-001",
      type: "verification",
      timestamp: new Date(Date.now() - 3600000),
      verifier: "Hotel Grand Plaza",
      status: "confirmed",
      blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    },
    {
      id: "tx-002",
      type: "access",
      timestamp: new Date(Date.now() - 7200000),
      verifier: "Metro Transit Authority",
      status: "confirmed",
      blockHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    },
    {
      id: "tx-003",
      type: "verification",
      timestamp: new Date(Date.now() - 10800000),
      verifier: "Emergency Services",
      status: "confirmed",
      blockHash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    },
  ])

  const handleGenerateQR = () => {
    setIsGeneratingQR(true)
    setTimeout(() => {
      setIsGeneratingQR(false)
      setShowQRCode(true)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getVerificationColor = (level: string) => {
    switch (level) {
      case "basic":
        return "secondary"
      case "verified":
        return "default"
      case "premium":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-4">
      {/* Digital Identity Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Blockchain Digital Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{identity.name}</h3>
              <p className="text-sm text-muted-foreground">{identity.nationality}</p>
            </div>
            <Badge variant={getVerificationColor(identity.verificationLevel)} className="capitalize">
              {identity.verificationLevel}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Tourist ID</p>
              <p className="font-mono text-xs">{identity.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Verification Level</p>
              <div className="flex items-center gap-2">
                <Progress
                  value={
                    identity.verificationLevel === "basic" ? 33 : identity.verificationLevel === "verified" ? 66 : 100
                  }
                  className="flex-1 h-2"
                />
                <span className="text-xs">
                  {identity.verificationLevel === "basic"
                    ? "33%"
                    : identity.verificationLevel === "verified"
                      ? "66%"
                      : "100%"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleGenerateQR}>
              <QrCode className="h-4 w-4 mr-2" />
              {isGeneratingQR ? "Generating..." : "Show QR"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => copyToClipboard(identity.walletAddress)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy ID
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      {showQRCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                Verification QR Code
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowQRCode(false)}>
                <Eye className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-white p-4 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-32 h-32 bg-black/10 rounded-lg flex items-center justify-center mx-auto">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Scan to verify identity</p>
                <p className="text-xs font-mono text-muted-foreground">{identity.walletAddress.slice(0, 10)}...</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Valid for 5 minutes. Regenerate for new verification session.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Wallet Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-accent" />
            Blockchain Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-xs font-mono text-muted-foreground">{identity.walletAddress}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(identity.walletAddress)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium">Private Key</p>
                <p className="text-xs font-mono text-muted-foreground">
                  {showPrivateKey
                    ? "0x1234567890abcdef1234567890abcdef12345678"
                    : "••••••••••••••••••••••••••••••••••••••••"}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium">Network</p>
                <p className="text-xs text-muted-foreground">SafeTour Blockchain (Mainnet)</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-xs text-accent">Connected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Verification Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <Building className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-medium">Hotels</p>
              <Badge variant="default" className="text-xs mt-1">
                Active
              </Badge>
            </div>

            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <Smartphone className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-xs font-medium">Transport</p>
              <Badge variant="default" className="text-xs mt-1">
                Active
              </Badge>
            </div>

            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <Shield className="h-6 w-6 text-destructive mx-auto mb-2" />
              <p className="text-xs font-medium">Emergency</p>
              <Badge variant="destructive" className="text-xs mt-1">
                Priority
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-secondary" />
            Blockchain Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${tx.status === "confirmed" ? "bg-accent" : tx.status === "pending" ? "bg-secondary" : "bg-destructive"}`}
                />
                <div>
                  <p className="text-sm font-medium capitalize">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.verifier}</p>
                  <p className="text-xs text-muted-foreground">{tx.timestamp.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    tx.status === "confirmed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"
                  }
                >
                  {tx.status}
                </Badge>
                <p className="text-xs font-mono text-muted-foreground mt-1">{tx.blockHash.slice(0, 8)}...</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-destructive" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Data Encryption</span>
            </div>
            <Badge variant="default">AES-256</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Immutable Records</span>
            </div>
            <CheckCircle className="h-4 w-4 text-accent" />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Decentralized Storage</span>
            </div>
            <CheckCircle className="h-4 w-4 text-accent" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
