import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { AskResponse } from "@shared/api";

const examples = [
  { q: "How much should airport taxi cost?", hint: "Know the fair price before you land." },
  { q: "Which SIM card should tourists buy?", hint: "Airtel vs Jio — I'll help you decide." },
  { q: "Is Delhi safe for solo travellers?", hint: "Honest safety advice, no sugar-coating." },
  { q: "How do I use the metro?", hint: "Step-by-step from token to exit." },
  { q: "Where should I stay near the airport?", hint: "Clean, safe stays on a budget." },
  { q: "Best way to get to Agra?", hint: "Train, car, or bus — pros and cons." },
];

export default function AskALocal() {
  const [form, setForm] = useState({ name: "", country: "", email: "", travelFrom: "", travelTo: "", question: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (f: string, v: string) => setForm((prev) => ({ ...prev, [f]: v }));

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
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError("");
    setForm({ name: "", country: "", email: "", travelFrom: "", travelTo: "", question: "", website: "" });
  };

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/15 placeholder:text-muted-foreground/40";

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&h=500&fit=crop"
            alt="Delhi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-1.5 text-white/50 text-[12px] mb-5">
            <Link to="/" className="hover:text-white/80 transition">Home</Link>
            <span>/</span>
            <span className="text-white/80">Ask a Local</span>
          </div>
          <div className="max-w-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-5 border border-white/10">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              Ask a Local
            </h1>
            <p className="text-white/55 text-[16px] leading-relaxed">
              Still unsure? Ask me and I'll reply with honest, practical advice
              — like getting help from a friend who lives in Delhi.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-black/[0.04] p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-14">
                  <div className="inline-block rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg px-8 py-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-100/80 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      Success! Your message has landed in my inbox.
                    </h2>
                    <p className="text-[13px] text-muted-foreground leading-relaxed max-w-sm mx-auto mb-1">
                      Just a heads-up: I&apos;m an engineer by day, so my response time might be a little like Delhi traffic — occasionally stuck, but definitely moving! I&apos;ll send you a thoughtful reply as soon as I step away from my desk. Thanks for your patience while I balance the &lsquo;9-to-5&rsquo; with the &lsquo;Incredible India&rsquo;!
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 mt-8">
                    <Button variant="outline" className="rounded-full px-5 h-9 text-[13px] border-black/10" onClick={reset}>
                      Ask another
                    </Button>
                    <Link to="/delhi-guide">
                      <Button className="rounded-full px-5 gap-1.5 h-9 text-[13px] bg-foreground text-background hover:bg-foreground/90">
                        Read Delhi Travel Guide <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-[16px] text-foreground mb-0.5">Your question</h2>
                  <p className="text-[13px] text-muted-foreground mb-6">
                    I personally reply to every question. No bots.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="f-email" className="block text-[13px] font-medium text-foreground mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input id="f-email" type="email" required disabled={loading} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className={`${inputCls} disabled:opacity-50`} />
                      <p className="text-[11px] text-muted-foreground/50 mt-1">I&apos;ll reply here.</p>
                    </div>
                    <div>
                      <label htmlFor="f-q" className="block text-[13px] font-medium text-foreground mb-1.5">
                        Question <span className="text-red-400">*</span>
                      </label>
                      <textarea id="f-q" required rows={4} disabled={loading} value={form.question} onChange={(e) => update("question", e.target.value)} placeholder="e.g. How much should an airport taxi cost to Connaught Place?" className={`${inputCls} resize-none disabled:opacity-50`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="f-name" className="block text-[13px] font-medium text-foreground mb-1.5">
                          Name <span className="text-muted-foreground/40 font-normal">(optional)</span>
                        </label>
                        <input id="f-name" type="text" disabled={loading} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Sarah" className={`${inputCls} disabled:opacity-50`} />
                      </div>
                      <div>
                        <label htmlFor="f-country" className="block text-[13px] font-medium text-foreground mb-1.5">
                          Country <span className="text-muted-foreground/40 font-normal">(optional)</span>
                        </label>
                        <input id="f-country" type="text" disabled={loading} value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="e.g. United Kingdom" className={`${inputCls} disabled:opacity-50`} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="f-date-from" className="block text-[13px] font-medium text-foreground mb-1.5">
                          Travel from <span className="text-muted-foreground/40 font-normal">(optional)</span>
                        </label>
                        <input id="f-date-from" type="date" disabled={loading} value={form.travelFrom} onChange={(e) => update("travelFrom", e.target.value)} className={`${inputCls} disabled:opacity-50`} />
                      </div>
                      <div>
                        <label htmlFor="f-date-to" className="block text-[13px] font-medium text-foreground mb-1.5">
                          Travel to <span className="text-muted-foreground/40 font-normal">(optional)</span>
                        </label>
                        <input id="f-date-to" type="date" disabled={loading} value={form.travelTo} onChange={(e) => update("travelTo", e.target.value)} className={`${inputCls} disabled:opacity-50`} />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/50 backdrop-blur-md border border-white/40 px-4 py-3">
                      <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                        Knowing when you&apos;re coming helps me check the city&apos;s &lsquo;inventory.&rsquo; From seasonal street food (hello, winter Daulat Ki Chaat!) to avoiding the monsoon &lsquo;swimming pool&rsquo; streets, your dates help me make sure you&apos;re seeing Delhi at its best.
                      </p>
                    </div>
                    <input type="text" name="website" value={form.website} onChange={(e) => update("website", e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
                    <Button type="submit" disabled={loading} className="w-full rounded-full gap-2 h-10 text-[13px] bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60">
                      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      {loading ? "Sending…" : "Ask for help"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-20 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-4 h-4 text-muted-foreground/40" />
                  <h3 className="font-semibold text-[14px] text-foreground">
                    Common questions
                  </h3>
                </div>
                <div className="space-y-2">
                  {examples.map((ex) => (
                    <button
                      key={ex.q}
                      onClick={() => update("question", ex.q)}
                      className="block w-full text-left rounded-xl bg-white border border-black/[0.04] p-3.5 hover:border-black/[0.08] hover:shadow-sm transition group"
                    >
                      <p className="text-[13px] font-medium text-foreground group-hover:text-foreground/70 transition mb-0.5">
                        &ldquo;{ex.q}&rdquo;
                      </p>
                      <p className="text-[11px] text-muted-foreground/50">{ex.hint}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-black/[0.04] p-5">
                <p className="font-medium text-[13px] text-foreground mb-1">
                  Check my guide first?
                </p>
                <p className="text-[12px] text-muted-foreground mb-4">
                  Many common questions are already answered.
                </p>
                <Link to="/delhi-guide">
                  <Button variant="outline" size="sm" className="rounded-full gap-1.5 w-full text-[12px] h-8 border-black/10 hover:bg-black/[0.02]">
                    Read Delhi Travel Guide <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>

              <a
                href="https://instagram.com/indiawithease"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl bg-gradient-to-br from-purple-500/[0.06] via-pink-500/[0.04] to-orange-400/[0.06] border border-black/[0.04] p-5 hover:shadow-lg hover:border-black/[0.08] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-foreground mb-1">Need a &lsquo;sanity check&rsquo; right now?</p>
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed mb-1.5">
                      Standing in a market? Send me a photo or a quick message and I&apos;ll help you navigate the moment.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-foreground group-hover:text-foreground/70 transition">
                      @indiawithease <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

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
