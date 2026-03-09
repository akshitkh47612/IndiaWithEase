import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Search,
  Heart,
  Wifi,
  Thermometer,
  Shield,
  Star,
  IndianRupee,
  SlidersHorizontal,
  X,
  MapPin,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Destination {
  id: number;
  name: string;
  state: string;
  image: string;
  tags: string[];
  costPerWeek: number;
  costLabel: string;
  temp: string;
  internet: number;
  safety: number;
  rating: number;
  description: string;
  bestSeason: string;
}

const allDestinations: Destination[] = [
  {
    id: 1,
    name: "Goa",
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    tags: ["Beaches", "Nightlife"],
    costPerWeek: 35000,
    costLabel: "₹35,000",
    temp: "32°C",
    internet: 8,
    safety: 8,
    rating: 4.7,
    description: "Sun-kissed beaches, vibrant nightlife, Portuguese heritage and fresh seafood by the coast.",
    bestSeason: "Nov – Mar",
  },
  {
    id: 2,
    name: "Jaipur",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
    tags: ["Heritage", "Culture"],
    costPerWeek: 28000,
    costLabel: "₹28,000",
    temp: "26°C",
    internet: 7,
    safety: 8,
    rating: 4.8,
    description: "The Pink City — majestic forts, opulent palaces, colorful bazaars and royal Rajasthani culture.",
    bestSeason: "Oct – Mar",
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    tags: ["Nature", "Wellness"],
    costPerWeek: 40000,
    costLabel: "₹40,000",
    temp: "28°C",
    internet: 7,
    safety: 9,
    rating: 4.9,
    description: "Serene houseboat cruises, lush tea plantations, Ayurvedic retreats and tropical biodiversity.",
    bestSeason: "Sep – Mar",
  },
  {
    id: 4,
    name: "Varanasi",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop",
    tags: ["Spiritual", "Culture"],
    costPerWeek: 20000,
    costLabel: "₹20,000",
    temp: "25°C",
    internet: 6,
    safety: 7,
    rating: 4.6,
    description: "One of the world's oldest cities — sacred ghats, evening Ganga aarti and timeless spirituality.",
    bestSeason: "Oct – Mar",
  },
  {
    id: 5,
    name: "Manali",
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
    tags: ["Mountains", "Adventure"],
    costPerWeek: 25000,
    costLabel: "₹25,000",
    temp: "12°C",
    internet: 6,
    safety: 8,
    rating: 4.5,
    description: "Snow-capped peaks, trekking trails, Rohtang Pass and cozy mountain cafes in the Kullu Valley.",
    bestSeason: "Mar – Jun",
  },
  {
    id: 6,
    name: "Udaipur",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
    tags: ["Luxury", "Heritage"],
    costPerWeek: 45000,
    costLabel: "₹45,000",
    temp: "28°C",
    internet: 7,
    safety: 9,
    rating: 4.8,
    description: "City of Lakes — floating palaces, romantic sunsets and some of India's finest heritage hotels.",
    bestSeason: "Sep – Mar",
  },
  {
    id: 7,
    name: "Rishikesh",
    state: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1600100397608-bfa8e9df7a98?w=600&h=400&fit=crop",
    tags: ["Spiritual", "Adventure"],
    costPerWeek: 22000,
    costLabel: "₹22,000",
    temp: "22°C",
    internet: 6,
    safety: 9,
    rating: 4.7,
    description: "Yoga capital of the world — ashrams, river rafting, bungee jumping and Beatles history.",
    bestSeason: "Sep – Nov",
  },
  {
    id: 8,
    name: "Hampi",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&h=400&fit=crop",
    tags: ["Heritage", "History"],
    costPerWeek: 18000,
    costLabel: "₹18,000",
    temp: "30°C",
    internet: 5,
    safety: 8,
    rating: 4.6,
    description: "UNESCO World Heritage ruins of the Vijayanagara Empire amid surreal boulder-strewn landscapes.",
    bestSeason: "Oct – Feb",
  },
  {
    id: 9,
    name: "Darjeeling",
    state: "West Bengal",
    image: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=600&h=400&fit=crop",
    tags: ["Mountains", "Nature"],
    costPerWeek: 24000,
    costLabel: "₹24,000",
    temp: "14°C",
    internet: 5,
    safety: 8,
    rating: 4.5,
    description: "Queen of the Hills — tea gardens, toy train, sunrise over Kanchenjunga and colonial charm.",
    bestSeason: "Mar – May",
  },
  {
    id: 10,
    name: "Pondicherry",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
    tags: ["Beaches", "Culture"],
    costPerWeek: 30000,
    costLabel: "₹30,000",
    temp: "30°C",
    internet: 7,
    safety: 8,
    rating: 4.6,
    description: "French Quarter charm, Auroville, pristine beaches and a thriving cafe culture on the Bay of Bengal.",
    bestSeason: "Oct – Mar",
  },
  {
    id: 11,
    name: "Leh-Ladakh",
    state: "Ladakh",
    image: "https://images.unsplash.com/photo-1626015365107-82a9a92ea5e5?w=600&h=400&fit=crop",
    tags: ["Mountains", "Adventure"],
    costPerWeek: 38000,
    costLabel: "₹38,000",
    temp: "8°C",
    internet: 4,
    safety: 8,
    rating: 4.9,
    description: "High-altitude desert — Pangong Lake, Khardung La, ancient monasteries and raw Himalayan beauty.",
    bestSeason: "Jun – Sep",
  },
  {
    id: 12,
    name: "Mumbai",
    state: "Maharashtra",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=400&fit=crop",
    tags: ["Urban", "Nightlife"],
    costPerWeek: 50000,
    costLabel: "₹50,000",
    temp: "30°C",
    internet: 9,
    safety: 7,
    rating: 4.4,
    description: "The city that never sleeps — Bollywood, street food, Gateway of India and a buzzing nightlife scene.",
    bestSeason: "Nov – Feb",
  },
];

const ALL_TAGS = [
  "Beaches",
  "Heritage",
  "Nature",
  "Spiritual",
  "Mountains",
  "Adventure",
  "Culture",
  "Luxury",
  "Nightlife",
  "Wellness",
  "Urban",
  "History",
];

const tagColor: Record<string, string> = {
  Beaches: "bg-sky-100 text-sky-700 border-sky-200",
  Heritage: "bg-amber-100 text-amber-700 border-amber-200",
  Nature: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Spiritual: "bg-violet-100 text-violet-700 border-violet-200",
  Mountains: "bg-slate-100 text-slate-700 border-slate-200",
  Adventure: "bg-orange-100 text-orange-700 border-orange-200",
  Culture: "bg-pink-100 text-pink-700 border-pink-200",
  Luxury: "bg-rose-100 text-rose-700 border-rose-200",
  Nightlife: "bg-purple-100 text-purple-700 border-purple-200",
  Wellness: "bg-teal-100 text-teal-700 border-teal-200",
  Urban: "bg-gray-100 text-gray-700 border-gray-200",
  History: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

type SortOption = "rating" | "cost-low" | "cost-high" | "name";

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let results = allDestinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags =
        activeTags.length === 0 ||
        activeTags.some((tag) => d.tags.includes(tag));
      return matchesSearch && matchesTags;
    });

    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "cost-low":
        results.sort((a, b) => a.costPerWeek - b.costPerWeek);
        break;
      case "cost-high":
        results.sort((a, b) => b.costPerWeek - a.costPerWeek);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return results;
  }, [searchQuery, activeTags, sortBy]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">
              India<span className="text-primary">WithEase</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            {filtered.length} destination{filtered.length !== 1 && "s"}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="bg-secondary text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
            Explore India
          </h1>
          <p className="text-white/70 max-w-xl mb-8">
            Find your perfect destination — filter by interest, compare costs and
            plan your next adventure across incredible India.
          </p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-grow relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city or state..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white rounded-xl"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeTags.length > 0 && (
                <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeTags.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="bg-white border-b border-gray-100 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">
                Filter by interest
              </p>
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition ${
                      active
                        ? "bg-primary text-white border-primary"
                        : `${tagColor[tag] ?? "bg-gray-100 text-gray-700 border-gray-200"} hover:opacity-80`
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sort Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            destination{filtered.length !== 1 && "s"}
          </p>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm bg-transparent border-0 text-gray-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="cost-low">Budget Friendly</option>
              <option value="cost-high">Premium First</option>
              <option value="name">A – Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                No destinations found
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Try a different search or clear your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTags([]);
                }}
              >
                Reset All
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      onClick={() => toggleLike(dest.id)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition"
                    >
                      <Heart
                        className={`w-4 h-4 transition ${
                          likedIds.has(dest.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-500"
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {dest.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColor[tag] ?? "bg-gray-100 text-gray-700"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-sm font-semibold px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {dest.rating}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-lg text-foreground">
                        {dest.name}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {dest.bestSeason}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{dest.state}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-grow">
                      {dest.description}
                    </p>

                    {/* Cost */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <IndianRupee className="w-4 h-4" />
                        Avg. cost / week
                      </div>
                      <span className="font-bold text-foreground text-lg">
                        {dest.costLabel}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2.5 rounded-xl bg-orange-50">
                        <Thermometer className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                        <p className="text-[11px] text-gray-500">Temp</p>
                        <p className="font-bold text-sm text-foreground">
                          {dest.temp}
                        </p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-blue-50">
                        <Wifi className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                        <p className="text-[11px] text-gray-500">Internet</p>
                        <p className="font-bold text-sm text-blue-600">
                          {dest.internet}/10
                        </p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-green-50">
                        <Shield className="w-4 h-4 mx-auto mb-1 text-green-600" />
                        <p className="text-[11px] text-gray-500">Safety</p>
                        <p className="font-bold text-sm text-green-600">
                          {dest.safety}/10
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">
                India<span className="text-primary">WithEase</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} IndiaWithEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
