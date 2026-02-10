"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Star,
  Shield,
  Search,
  Clock,
  Users,
  Camera,
  Utensils,
  Landmark,
  ShoppingBag,
} from "lucide-react"

interface Place {
  id: string
  name: string
  category: "landmark" | "food" | "shopping" | "culture"
  safetyScore: number
  rating: number
  distance: string
  visitors: number
  description: string
  bestTime: string
}

const places: Place[] = [
  {
    id: "1",
    name: "Gateway of India",
    category: "landmark",
    safetyScore: 94,
    rating: 4.7,
    distance: "1.2 km",
    visitors: 342,
    description: "Iconic arch monument overlooking the Arabian Sea. Well-monitored tourist area.",
    bestTime: "Morning 7-10 AM",
  },
  {
    id: "2",
    name: "Chhatrapati Shivaji Maharaj Terminus",
    category: "landmark",
    safetyScore: 88,
    rating: 4.6,
    distance: "2.4 km",
    visitors: 520,
    description: "UNESCO World Heritage Site. Historic Victorian Gothic railway station.",
    bestTime: "Afternoon 2-5 PM",
  },
  {
    id: "3",
    name: "Leopold Cafe",
    category: "food",
    safetyScore: 92,
    rating: 4.3,
    distance: "0.8 km",
    visitors: 128,
    description: "Iconic cafe in Colaba, popular with tourists. Safe well-lit area.",
    bestTime: "Evening 6-9 PM",
  },
  {
    id: "4",
    name: "Crawford Market",
    category: "shopping",
    safetyScore: 78,
    rating: 4.1,
    distance: "3.1 km",
    visitors: 890,
    description: "Historic market with fresh produce and spices. Watch for pickpockets in crowds.",
    bestTime: "Morning 9-12 PM",
  },
  {
    id: "5",
    name: "Elephanta Caves",
    category: "culture",
    safetyScore: 96,
    rating: 4.5,
    distance: "10 km",
    visitors: 210,
    description: "Ancient rock-cut cave temples on Elephanta Island. Very safe guided tours.",
    bestTime: "Morning 9 AM - 2 PM",
  },
  {
    id: "6",
    name: "Colaba Causeway Market",
    category: "shopping",
    safetyScore: 85,
    rating: 4.2,
    distance: "0.5 km",
    visitors: 670,
    description: "Popular street shopping destination. Bargain carefully, generally safe daytime.",
    bestTime: "Afternoon 3-6 PM",
  },
]

const categoryIcons = {
  landmark: Landmark,
  food: Utensils,
  shopping: ShoppingBag,
  culture: Camera,
}

const categoryLabels = {
  landmark: "Landmarks",
  food: "Food & Dining",
  shopping: "Shopping",
  culture: "Culture",
}

export function ExploreView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = ["all", "landmark", "food", "shopping", "culture"]

  const filtered = places.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-5 pb-24 md:pb-5 max-w-4xl space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Explore Mumbai</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Discover safe tourist attractions and hidden gems</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search places..."
          className="pl-9 h-10 bg-card border-border"
        />
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat === "all" ? MapPin : categoryIcons[cat as keyof typeof categoryIcons]
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat === "all" ? "All Places" : categoryLabels[cat as keyof typeof categoryLabels]}
            </button>
          )
        })}
      </div>

      {/* Places grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((place) => {
          const CatIcon = categoryIcons[place.category]
          return (
            <div key={place.id} className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CatIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{place.name}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{place.category}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    place.safetyScore >= 90
                      ? "border-chart-2/20 text-chart-2"
                      : place.safetyScore >= 80
                        ? "border-chart-4/20 text-chart-4"
                        : "border-destructive/20 text-destructive"
                  }`}
                >
                  <Shield className="h-2.5 w-2.5 mr-0.5" />
                  {place.safetyScore}%
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{place.description}</p>

              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-chart-4" />
                  {place.rating}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {place.distance}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {place.visitors} visiting
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {place.bestTime}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No places found</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}
