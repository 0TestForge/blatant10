"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Users, ChevronLeft, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

const venuesData = [
  {
    id: 1,
    nameKey: "skylinePenthouse" as const,
    locationKey: "vakeTbilisi" as const,
    price: 450,
    guests: 30,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    description: "Modern penthouse with stunning city views",
    amenities: ["wifi", "kitchen", "heating"],
    location: "tbilisi",
  },
  {
    id: 2,
    nameKey: "gardenVilla" as const,
    locationKey: "saburtaloTbilisi" as const,
    price: 680,
    guests: 50,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    description: "Spacious villa with beautiful garden",
    amenities: ["wifi", "kitchen", "heating"],
    location: "tbilisi",
  },
  {
    id: 3,
    nameKey: "rooftopTerrace" as const,
    locationKey: "oldTownTbilisi" as const,
    price: 320,
    guests: 25,
    image: "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    description: "Charming rooftop with panoramic views",
    amenities: ["wifi", "kitchen", "heating"],
    location: "tbilisi",
  },
  {
    id: 4,
    nameKey: "loftStudio" as const,
    locationKey: "veraTbilisi" as const,
    price: 280,
    guests: 20,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
    ],
    description: "Contemporary loft space with industrial design",
    amenities: ["wifi", "kitchen", "heating"],
    location: "tbilisi",
  },
  {
    id: 5,
    nameKey: "seasideVilla" as const,
    locationKey: "batumi" as const,
    price: 890,
    guests: 60,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
    ],
    description: "Luxury seaside villa with private beach access",
    amenities: ["wifi", "kitchen", "heating"],
    location: "batumi",
  },
  {
    id: 6,
    nameKey: "mountainRetreat" as const,
    locationKey: "borjomi" as const,
    price: 520,
    guests: 35,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    description: "Peaceful mountain retreat surrounded by nature",
    amenities: ["wifi", "kitchen", "heating"],
    location: "borjomi",
  },
]

export default function BrowsePage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filteredVenues, setFilteredVenues] = useState(venuesData)

  useEffect(() => {
    const location = searchParams.get("location")
    const guests = searchParams.get("guests")

    let filtered = venuesData

    if (location) {
      filtered = filtered.filter((venue) => venue.location === location)
    }

    if (guests) {
      const guestRange = guests
      const minGuests =
        guestRange === "1-10"
          ? 1
          : guestRange === "11-25"
            ? 11
            : guestRange === "26-50"
              ? 26
              : 50

      filtered = filtered.filter((venue) => venue.guests >= minGuests)
    }

    setFilteredVenues(filtered)
  }, [searchParams])

  return (
    <main className="min-h-screen bg-background relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 md:w-[500px] h-96 md:h-[500px] bg-gradient-to-br from-apple-blue/20 md:from-apple-blue/15 via-apple-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 md:w-96 h-80 md:h-96 bg-gradient-to-br from-apple-green/15 md:from-apple-green/10 via-apple-green/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold hover:bg-foreground/90"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        <h1 className="text-xl font-bold text-foreground">Browse Venues</h1>
        <LanguageSwitcher variant="light" />
      </div>

      {/* Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Available Venues
            </h2>
            <p className="text-muted-foreground">
              {filteredVenues.length} {filteredVenues.length === 1 ? "venue" : "venues"} found
            </p>
          </div>

          {filteredVenues.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">
                No venues match your search criteria
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Try different filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <Link
                  key={venue.id}
                  href={`/venues/${venue.id}`}
                  className="group bg-card rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/50 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={venue.image}
                      alt={t.venueData[venue.nameKey]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t.venueData[venue.nameKey]}
                    </h3>

                    <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {t.venueData[venue.locationKey]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Up to {venue.guests} guests
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-bold text-foreground">
                          ${venue.price}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium block">
                          /night
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-6 py-3 px-6 rounded-2xl border border-border text-foreground font-semibold cursor-pointer transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-lg hover:scale-105">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
