"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Mic, MicOff, Globe, Bot, User, MapPin, Shield, Phone, Languages } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  language?: string
  isTranslated?: boolean
  originalContent?: string
}

interface QuickResponse {
  id: string
  text: string
  category: "safety" | "directions" | "emergency" | "general"
  icon: React.ComponentType<{ className?: string }>
}

export function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hello! I'm SafeTour AI, your multilingual safety assistant. I can help you with directions, safety information, emergency assistance, and local guidance. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ]

  const quickResponses: QuickResponse[] = [
    { id: "emergency", text: "I need emergency help", category: "emergency", icon: Phone },
    { id: "directions", text: "How do I get to...?", category: "directions", icon: MapPin },
    { id: "safety", text: "Is this area safe?", category: "safety", icon: Shield },
    { id: "translate", text: "Help me translate", category: "general", icon: Languages },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content.trim())
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Emergency responses
    if (input.includes("emergency") || input.includes("help") || input.includes("danger")) {
      return "🚨 I understand this is an emergency. I'm immediately connecting you to emergency services and sharing your location. Stay calm and stay on the line. Your current location has been shared with authorities. Is this a medical, security, or other type of emergency?"
    }

    // Safety inquiries
    if (input.includes("safe") || input.includes("safety") || input.includes("dangerous")) {
      return "🛡️ Based on your current location in the Downtown area, you're in a monitored safe zone with a 95% safety rating. There are 12 other tourists nearby and emergency services are 3.8 minutes away. I recommend staying in well-lit areas and avoiding the construction zone on Main St. Would you like me to guide you to the nearest safe point?"
    }

    // Directions
    if (input.includes("direction") || input.includes("how to get") || input.includes("where is")) {
      return "🗺️ I can help you navigate safely! I'm accessing real-time route information considering current safety conditions. The safest route to your destination avoids high-risk areas and includes well-monitored paths. Would you like me to provide turn-by-turn directions with safety checkpoints?"
    }

    // Translation help
    if (input.includes("translate") || input.includes("language") || input.includes("speak")) {
      return "🌐 I can help translate between 8 languages! I can also help you communicate with local services, hotels, and emergency responders. What would you like me to translate, or would you like me to help you communicate with someone nearby?"
    }

    // Weather and local info
    if (input.includes("weather") || input.includes("local") || input.includes("recommend")) {
      return "🌤️ Current conditions are favorable for tourism. Based on your safety profile and location, I recommend visiting the Tourist District (8% risk level) or Historic Quarter (5% risk level). The Waterfront area is also safe but slightly busier. Would you like specific recommendations for activities or dining?"
    }

    // Default helpful response
    return "I'm here to help keep you safe and assist with your visit! I can provide:\n\n🛡️ Real-time safety information\n🗺️ Safe navigation and directions\n🚨 Emergency assistance\n🌐 Translation services\n📍 Local recommendations\n\nWhat specific assistance do you need today?"
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setInputMessage("Where is the nearest hospital?")
        setIsListening(false)
      }, 2000)
    }
  }

  const handleQuickResponse = (response: QuickResponse) => {
    handleSendMessage(response.text)
  }

  if (!isChatOpen) {
    return (
      <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsChatOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-50 w-80 md:w-96">
      <Card className="shadow-xl border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>SafeTour AI</span>
              <Badge variant="default" className="text-xs">
                Online
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLanguage(selectedLanguage === "en" ? "es" : "en")}
              >
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                ×
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selector */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {languages.slice(0, 4).map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                className="text-xs whitespace-nowrap"
                onClick={() => setSelectedLanguage(lang.code)}
              >
                {lang.flag} {lang.name}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto space-y-3 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === "bot" && <Bot className="h-4 w-4 mt-0.5 text-primary" />}
                    {message.type === "user" && <User className="h-4 w-4 mt-0.5" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="grid grid-cols-2 gap-2">
            {quickResponses.map((response) => (
              <Button
                key={response.id}
                variant="outline"
                size="sm"
                className="text-xs h-auto p-2 flex items-center gap-1 bg-transparent"
                onClick={() => handleQuickResponse(response)}
              >
                <response.icon className="h-3 w-3" />
                {response.text}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Type your message in ${languages.find((l) => l.code === selectedLanguage)?.name}...`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className={isListening ? "bg-destructive text-destructive-foreground" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button size="sm" onClick={() => handleSendMessage(inputMessage)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>AI Assistant Active</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure Chat</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
