import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Send,
  Map,
  AlertTriangle,
  Smartphone,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import type { AskResponse } from "@shared/api";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  { emoji: "📍", label: "Get the Delhi Travel Guide", rest: "with airport, SIM, transport and local tips", to: "/delhi-guide" },
  { emoji: "🛡️", label: "Avoid common scams", rest: "— know what to watch out for before you land", to: "/delhi-guide#scams" },
  { emoji: "💬", label: "Ask me anything", rest: "and get a personal reply with honest advice", to: "/ask-a-local" },
  { emoji: "🏘️", label: "Explore Delhi by area", rest: "— find the right neighbourhood for your trip", to: "/delhi-guide#areas" },
  { emoji: "📖", label: "Read my story", rest: "— why I built this for travellers like you", to: "/my-story" },
];

const cheatSheet = [
  { label: "Airport taxi", value: "₹400 – ₹700 to central Delhi" },
  { label: "Best SIM", value: "Airtel or Jio  ·  ₹200 – ₹500" },
  { label: "Best transport", value: "Delhi Metro  ·  fast & safe" },
  { label: "Cash vs Card", value: "Both work  ·  carry some cash" },
  { label: "Safety tip", value: "Watch scams near tourist areas" },
  { label: "Best app", value: "Delhi Metro Rail + Uber" },
];

const delhiAreas = [
  {
    name: "Connaught Place",
    vibe: "Shopping & dining hub",
    image: "/area-cp-india-gate.png",
    safety: "High",
    safetyColor: "text-emerald-400",
    places: ["India Gate", "Jantar Mantar", "Purana Qila (Old Fort)", "Agrasen ki Baoli", "Central Park"],
  },
  {
    name: "Chandni Chowk",
    vibe: "Street food & bazaars",
    image: "/area-chandni-chowk.png",
    safety: "Moderate",
    safetyColor: "text-amber-400",
    places: ["Paranthe Wali Gali", "Red Fort", "Jama Masjid", "Gurudwara Sis Ganj", "Khari Baoli spice market"],
  },
  {
    name: "Hauz Khas",
    vibe: "Cafes & nightlife",
    image: "/area-hauz-khas.png",
    safety: "High",
    safetyColor: "text-emerald-400",
    places: ["Hauz Khas Village cafes", "Deer Park", "Hauz Khas Fort ruins", "Rose Garden", "Social bar & kitchen"],
  },
  {
    name: "Paharganj",
    vibe: "Backpacker central",
    image: "/area-paharganj.png",
    safety: "Low",
    safetyColor: "text-rose-400",
    places: ["Main Bazaar street", "Sam's Cafe", "Budget guesthouses", "Rama Krishna Ashram metro", "Chill-out rooftop cafes"],
  },
  {
    name: "Karol Bagh",
    vibe: "Market streets & culture",
    image: "/area-karol-bagh.png",
    safety: "Moderate",
    safetyColor: "text-amber-400",
    places: ["Ajmal Khan Road", "Hanuman Mandir", "Gaffar Market electronics", "Roshan Di Kulfi", "Karol Bagh metro market"],
  },
  {
    name: "Lodhi Colony",
    vibe: "Art district & walks",
    image: "/area-lodhi-colony.png",
    safety: "High",
    safetyColor: "text-emerald-400",
    places: ["Sunder Nursery ✨ must visit", "Humayun's Tomb", "Safdarjung Tomb", "Lodhi Garden", "Dilli Haat – INA"],
  },
  {
    name: "Majnu Ka Tila",
    vibe: "Tibetan colony & hidden gem",
    image: "/area-majnu-ka-tila.png",
    safety: "Moderate",
    safetyColor: "text-amber-400",
    places: ["AMA Cafe", "Tibetan momos & thukpa spots", "Monastery visits", "Tibetan bookshops", "Riverside Gurudwara walk"],
  },
  {
    name: "Murthal",
    vibe: "Highway food paradise · 45 min from Delhi",
    image: "/area-murthal.png",
    safety: "High",
    safetyColor: "text-emerald-400",
    places: ["Amrik Sukhdev dhaba", "Paranthas with white butter", "Fresh lassi & chai stops", "Gulshan dhaba", "Late-night highway food runs"],
  },
];

const quickProblems = [
  { icon: Smartphone, title: "SIM card confusion", desc: "Airtel or Jio? Where to buy? What documents?" },
  { icon: AlertTriangle, title: "Tourist scams", desc: "Fake guides, rickshaw tricks, gem shops." },
  { icon: Map, title: "Metro vs Uber vs Auto", desc: "Which is cheapest, safest and fastest?" },
];

const faqs = [
  {
    q: "Which SIM should I buy?",
    a: "Airtel or Jio. Both have great coverage. Just remember: activation can take a few hours, so consider it your first lesson in \"Indian patience.\" Don\u2019t leave the counter until you see signal bars!",
  },
  {
    q: "How much should an airport taxi cost?",
    a: "\u20B9500 \u2013 \u20B9700. Head straight to the official \u201CPrepaid Taxi\u201D booth or use Uber/Ola. If someone at the gate quotes you triple that, they aren\u2019t a driver \u2014 they\u2019re an optimist looking for a donation.",
  },
  {
    q: "Is Paharganj safe for solo travellers?",
    a: "Safe, but loud. It\u2019s essentially \u201CDelhi: The Extreme Edition.\u201D It\u2019s perfectly fine for solo travelers, but expect a high-intensity workout for your \u201CNo, thank you\u201D muscles.",
  },
  {
    q: "What metro line goes to the Taj Mahal?",
    a: "None \u2014 it\u2019s 200km away! The Taj is in Agra, not Delhi. You\u2019ll need a train (like the Gatimaan Express). If a rickshaw driver says he can take you there for \u20B9200, tell him you aren\u2019t ready for a 4-hour road trip!",
  },
];

/* ------------------------------------------------------------------ */
/*  Area Card                                                          */
/* ------------------------------------------------------------------ */

function AreaCard({ area }: Readonly<{ area: (typeof delhiAreas)[number] }>) {
  const [tapped, setTapped] = useState(false);
  const showPlaces = tapped;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setTapped((t) => !t)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setTapped((t) => !t); } }}
      className="group relative rounded-2xl overflow-hidden h-[280px] sm:h-[320px] lg:h-[360px] cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
    >
      <img
        src={area.image}
        alt={area.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Default */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-0 ${showPlaces ? "opacity-0" : ""}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
          <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight text-center drop-shadow-lg">
            {area.name}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm mt-1.5">{area.vibe}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] sm:text-[13px] text-white/50">Safety:</span>
            <span className={`text-[12px] sm:text-[13px] font-semibold ${area.safetyColor}`}>{area.safety}</span>
          </div>
        </div>
      </div>

      {/* Hover / Tap — places to visit */}
      <div className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-all duration-500 flex flex-col justify-center px-5 sm:px-6 py-5 sm:py-6 ${showPlaces ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        <h3 className="text-white text-base sm:text-lg font-bold mb-1">{area.name}</h3>
        <p className="text-white/40 text-[11px] sm:text-[12px] mb-4 sm:mb-5">Places to visit</p>
        <ul className="space-y-2 sm:space-y-2.5">
          {area.places.map((place, i) => (
            <li
              key={place}
              className="flex items-center gap-2 sm:gap-2.5 text-[12px] sm:text-[13px] text-white/80 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
              {place}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 sm:pt-5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-[12px] text-white/40">Safety:</span>
            <span className={`text-[11px] sm:text-[12px] font-semibold ${area.safetyColor}`}>{area.safety}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Dropdown                                                       */
/* ------------------------------------------------------------------ */

function FaqItem({ faq }: Readonly<{ faq: (typeof faqs)[number] }>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm overflow-hidden transition-all">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-3 w-full text-left px-4 py-3 hover:bg-white/40 transition"
      >
        <span className="text-[13px] font-medium text-foreground">{faq.q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground/50 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-3.5 -mt-0.5">
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Index() {
  const [form, setForm] = useState({ name: "", country: "", email: "", travelFrom: "", travelTo: "", question: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 8000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          country: form.country,
          question: form.question,
          email: form.email,
          travelDate: [form.travelFrom, form.travelTo].filter(Boolean).join(" to ") || undefined,
          website: form.website,
        }),
      });
      const data: AskResponse = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      setForm({ name: "", country: "", email: "", travelFrom: "", travelTo: "", question: "", website: "" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">

      {/* ============================================================ */}
      {/*  HERO — NomadList style, no header                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-qutub-minar.png"
            alt="Qutub Minar at night, Delhi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-[12px] text-white/80 border border-white/10 mb-8">
            Delhi Travel Companion&nbsp;&nbsp;·&nbsp;&nbsp;Since 2026
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-[56px] lg:text-[64px] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Navigate Delhi,
            <br />
            <span className="text-white/50">the easy way</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[17px] sm:text-[20px] text-white/60 leading-relaxed mb-12 max-w-lg">
            Clear, practical guidance for international travellers. No fluff, no upsells — just what you need to know before you land.
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mb-12">
            {features.map((f) => (
              <li key={f.label}>
                <Link
                  to={f.to}
                  className="inline-flex items-baseline gap-2 text-[15px] sm:text-[16px] hover:opacity-80 transition"
                >
                  <span className="flex-shrink-0 not-italic">{f.emoji}</span>
                  <span>
                    <span className="font-semibold text-white underline decoration-white/25 underline-offset-[3px]">
                      {f.label}
                    </span>
                    <span className="text-white/45 font-normal"> {f.rest}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/delhi-guide">
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 bg-white text-black hover:bg-white/90 font-semibold shadow-xl shadow-black/20 h-12 text-[15px] w-full sm:w-auto"
              >
                Get Delhi Travel Guide
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/ask-a-local">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 gap-2 bg-white/15 backdrop-blur-md border-white/25 text-white hover:bg-white/25 hover:text-white h-12 text-[15px] font-semibold shadow-lg shadow-black/10 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Me a Question
              </Button>
            </Link>
          </div>

          {/* Inline nav */}
          <div className="flex flex-wrap gap-2.5 mt-12 pt-8 border-t border-white/10">
            {[
              { to: "/delhi-guide", label: "Delhi Travel Guide" },
              { to: "/ask-a-local", label: "Ask a Local" },
              { to: "/my-story", label: "My Story" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] text-white/90 font-medium bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/15 hover:bg-white/20 hover:border-white/25 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COMMON PROBLEMS                                              */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
              Sound familiar?
            </p>
            <h2 className="text-3xl sm:text-[40px] font-extrabold text-foreground tracking-tight leading-tight mb-3">
              Problems I help you solve
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-md mx-auto">
              India is incredible — but the basics can be confusing. I've broken each one down for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickProblems.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl bg-white border border-black/[0.04] p-5 hover:shadow-lg hover:border-black/[0.06] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center mb-4 group-hover:bg-black/[0.05] transition">
                  <p.icon className="w-[18px] h-[18px] text-foreground/70" />
                </div>
                <h3 className="font-semibold text-[15px] text-foreground mb-1.5">{p.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/delhi-guide">
              <Button variant="outline" className="rounded-full px-5 gap-1.5 h-9 text-[13px] border-black/10 hover:bg-black/[0.02]">
                See all Delhi tips <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  AREAS WORTH VISITING                                         */}
      {/* ============================================================ */}
      <section id="areas" className="py-20 sm:py-24 bg-white border-y border-black/[0.04] scroll-mt-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
              Explore Delhi
            </p>
            <h2 className="text-3xl sm:text-[40px] font-extrabold text-foreground tracking-tight leading-tight mb-3">
              Areas worth visiting
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-md mx-auto">
              Hover to see ratings. Each neighbourhood has its own personality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {delhiAreas.map((area) => (
              <AreaCard key={area.name} area={area} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CHEAT SHEET                                                  */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
              Quick reference
            </p>
            <h2 className="text-3xl sm:text-[40px] font-extrabold text-foreground tracking-tight leading-tight mb-3">
              Delhi Cheat Sheet
            </h2>
            <p className="text-muted-foreground text-[15px]">
              Save this before you land.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-black/[0.04] overflow-hidden shadow-sm">
            {cheatSheet.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                  i < cheatSheet.length - 1 ? "border-b border-black/[0.04]" : ""
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[13px] font-medium text-foreground truncate">{item.label}</span>
                </div>
                <span className="text-[11px] sm:text-[13px] text-muted-foreground text-right">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/delhi-guide">
              <Button className="rounded-full px-6 gap-2 h-10 text-[13px] bg-foreground text-background hover:bg-foreground/90">
                View full Delhi guide <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ASK ME                                                       */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 bg-white border-y border-black/[0.04]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
                Ask me
              </p>
              <h2 className="text-3xl sm:text-[40px] font-extrabold text-foreground tracking-tight leading-tight mb-4">
                Got a question about Delhi?
              </h2>
              <p className="text-muted-foreground text-[15px] mb-8 leading-relaxed max-w-md">
                Not sure about something? Ask me — I personally reply with honest,
                practical advice. Like getting help from a friend who lives here.
              </p>

              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40 mb-1">
                  People often ask
                </p>
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} faq={faq} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#fafafa] border border-black/[0.04] p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10 px-4">
                  <div className="inline-block rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-8 py-8">
                    <div className="w-12 h-12 rounded-full bg-emerald-100/80 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-foreground text-[16px] mb-2">
                      Success! Your message has landed in my inbox.
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      Just a heads-up: I&apos;m an engineer by day, so my response time might be a little like Delhi traffic — occasionally stuck, but definitely moving! I&apos;ll send you a thoughtful reply as soon as I step away from my desk. Thanks for your patience while I balance the &lsquo;9-to-5&rsquo; with the &lsquo;Incredible India&rsquo;!
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="h-email" className="block text-[13px] font-medium text-foreground mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input id="h-email" type="email" required disabled={loading} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 placeholder:text-muted-foreground/40 disabled:opacity-50" />
                    <p className="text-[11px] text-muted-foreground/50 mt-1">I&apos;ll reply here.</p>
                  </div>
                  <div>
                    <label htmlFor="h-q" className="block text-[13px] font-medium text-foreground mb-1.5">Question <span className="text-red-400">*</span></label>
                    <textarea id="h-q" required rows={3} disabled={loading} value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} placeholder="e.g. How much should an airport taxi cost?" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 resize-none placeholder:text-muted-foreground/40 disabled:opacity-50" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="h-name" className="block text-[13px] font-medium text-foreground mb-1.5">Name <span className="text-muted-foreground/40 font-normal">(optional)</span></label>
                      <input id="h-name" type="text" disabled={loading} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Sarah" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 placeholder:text-muted-foreground/40 disabled:opacity-50" />
                    </div>
                    <div>
                      <label htmlFor="h-country" className="block text-[13px] font-medium text-foreground mb-1.5">Country <span className="text-muted-foreground/40 font-normal">(optional)</span></label>
                      <input id="h-country" type="text" disabled={loading} value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} placeholder="e.g. United Kingdom" className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 placeholder:text-muted-foreground/40 disabled:opacity-50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="h-date-from" className="block text-[13px] font-medium text-foreground mb-1.5">Travel from <span className="text-muted-foreground/40 font-normal">(optional)</span></label>
                      <input id="h-date-from" type="date" disabled={loading} value={form.travelFrom} onChange={(e) => setForm((f) => ({ ...f, travelFrom: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 placeholder:text-muted-foreground/40 disabled:opacity-50" />
                    </div>
                    <div>
                      <label htmlFor="h-date-to" className="block text-[13px] font-medium text-foreground mb-1.5">Travel to <span className="text-muted-foreground/40 font-normal">(optional)</span></label>
                      <input id="h-date-to" type="date" disabled={loading} value={form.travelTo} onChange={(e) => setForm((f) => ({ ...f, travelTo: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 placeholder:text-muted-foreground/40 disabled:opacity-50" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/50 backdrop-blur-md border border-white/40 px-4 py-3">
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                      Knowing when you&apos;re coming helps me check the city&apos;s &lsquo;inventory.&rsquo; From seasonal street food (hello, winter Daulat Ki Chaat!) to avoiding the monsoon &lsquo;swimming pool&rsquo; streets, your dates help me make sure you&apos;re seeing Delhi at its best.
                    </p>
                  </div>
                  <input type="text" name="website" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
                  <Button type="submit" disabled={loading} className="w-full rounded-full gap-2 h-10 text-[13px] bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60">
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    {loading ? "Sending…" : "Ask Me"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Instagram sanity-check card */}
          <div className="mt-10 max-w-6xl mx-auto">
            <a
              href="https://instagram.com/indiawithease"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-gradient-to-br from-purple-500/[0.06] via-pink-500/[0.04] to-orange-400/[0.06] border border-black/[0.04] p-5 sm:p-6 hover:shadow-lg hover:border-black/[0.08] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <div>
                  <p className="font-bold text-[14px] text-foreground mb-1">
                    Need a &lsquo;sanity check&rsquo; right now?
                  </p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-2">
                    If you&apos;re standing in a market and need a quick &lsquo;Yes&rsquo; or &lsquo;No,&rsquo; Instagram is the best way to reach me. Send me a photo or a quick message, and I&apos;ll help you navigate the moment.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-foreground group-hover:text-foreground/70 transition">
                    @indiawithease <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative max-w-md w-full rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl p-8">
            <button
              onClick={() => setError("")}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-[17px] text-foreground leading-snug mb-3">
              Oh no! It looks like my code is acting like a junior intern on a Friday afternoon.
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Even as an engineer, I can&apos;t always outsmart a glitch! While I get under the hood to fix this, I still want to make sure your questions are answered. Feel free to skip the tech and send me a direct note at{" "}
              <a href="mailto:akshit@indiawithease.com" className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/70 transition">
                akshit@indiawithease.com
              </a>.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
