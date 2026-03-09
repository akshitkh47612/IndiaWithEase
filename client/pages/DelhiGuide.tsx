import { Link } from "react-router-dom";
import {
  Plane,
  Smartphone,
  TrainFront,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  MapPin,
  CreditCard,
  Car,
  ShieldAlert,
  Wifi,
  IndianRupee,
  FileText,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SectionHead({
  icon: Icon,
  id,
  badge,
  title,
  subtitle,
}: Readonly<{
  icon: React.ElementType;
  id: string;
  badge: string;
  title: string;
  subtitle: string;
}>) {
  return (
    <div id={id} className="scroll-mt-20 mb-8">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center">
          <Icon className="w-4 h-4 text-foreground/60" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          {badge}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1.5">
        {title}
      </h2>
      <p className="text-[14px] text-muted-foreground max-w-xl">{subtitle}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  items,
}: Readonly<{
  icon: React.ElementType;
  title: string;
  items: string[];
}>) {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.04] p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <Icon className="w-4 h-4 text-foreground/50" />
        <h3 className="font-semibold text-[14px] text-foreground">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tip({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-start gap-2.5 mt-5">
      <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
      </div>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

export default function DelhiGuide() {
  const sections = [
    { id: "airport", label: "Airport" },
    { id: "sim", label: "SIM Card" },
    { id: "transport", label: "Transport" },
    { id: "scams", label: "Scams" },
    { id: "tips", label: "Local Tips" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&h=600&fit=crop"
            alt="Delhi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-1.5 text-white/50 text-[12px] mb-5">
            <Link to="/" className="hover:text-white/80 transition">Home</Link>
            <span>/</span>
            <span className="text-white/80">Delhi Travel Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            The Delhi Travel Guide
          </h1>
          <p className="text-white/55 max-w-lg text-[16px] mb-8">
            Everything you need before landing — airport to getting around,
            staying safe and saving money.
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[12px] font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full px-3.5 py-1.5 text-white/80 border border-white/10 transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
        {/* 1 — Airport */}
        <section>
          <SectionHead
            icon={Plane}
            id="airport"
            badge="Step 1"
            title="Airport Arrival"
            subtitle="Getting from IGI Airport to your hotel without stress or overpaying."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={Navigation}
              title="How to exit"
              items={[
                "Follow signs to Arrivals after immigration & baggage",
                "Ignore anyone approaching you inside — they are touts",
                "Look for the Prepaid Taxi counter before exiting",
                "Uber/Ola: head to the pickup area outside",
              ]}
            />
            <InfoCard
              icon={Car}
              title="Fair prices"
              items={[
                "Prepaid Taxi: ₹400–₹700 to central Delhi",
                "Uber/Ola: ₹350–₹600 (pay via app)",
                "Airport Metro Express: ₹60 to New Delhi station",
                "Avoid private drivers who approach you",
              ]}
            />
          </div>
          <Tip>
            Airport Metro Express runs Terminal 3 → New Delhi station in 20 min.
            Fastest and cheapest if you're near CP or Paharganj.
          </Tip>
        </section>

        {/* 2 — SIM */}
        <section>
          <SectionHead
            icon={Smartphone}
            id="sim"
            badge="Step 2"
            title="SIM Card Guide"
            subtitle="A local SIM is essential for maps, Uber and staying connected."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={Wifi}
              title="Best providers"
              items={[
                "Airtel — best coverage and speed in Delhi",
                "Jio — cheapest data plans, good 4G",
                "Tourist SIM at airport (₹500–₹800)",
                "Activation takes 2–24 hours — buy early",
              ]}
            />
            <InfoCard
              icon={FileText}
              title="What you need"
              items={[
                "Passport + photocopy of passport & visa page",
                "One passport-size photo",
                "₹200–₹500 in cash for SIM + recharge",
                "Official Airtel/Jio stores are safest",
              ]}
            />
          </div>
        </section>

        {/* 3 — Transport */}
        <section>
          <SectionHead
            icon={TrainFront}
            id="transport"
            badge="Step 3"
            title="Getting Around"
            subtitle="Delhi has many options. Here's how to pick the right one."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard icon={TrainFront} title="Metro" items={[
              "Fast, AC, no traffic (₹10–₹60/ride)",
              "Covers most tourist areas",
              "Get a metro card to skip queues",
              "Runs 5 AM – 11 PM daily",
            ]} />
            <InfoCard icon={Car} title="Uber / Ola" items={[
              "Door-to-door, fixed price shown upfront",
              "Pay via card/UPI in the app",
              "Best for late night or far from metro",
              "Uber Auto available for short hops",
            ]} />
            <InfoCard icon={Navigation} title="Auto Rickshaw" items={[
              "Cheap for short distances (₹30–₹150)",
              "Always negotiate fare BEFORE getting in",
              "Or use Uber Auto for fixed pricing",
              "Available everywhere, great last-mile",
            ]} />
            <InfoCard icon={CreditCard} title="Taxi" items={[
              "Prepaid counters at stations & airport",
              "Yellow-top taxis often overcharge tourists",
              "Prefer app-based or prepaid over hailed",
              "Uber Premier for comfortable longer rides",
            ]} />
          </div>

          <div className="rounded-2xl bg-white border border-black/[0.04] overflow-x-auto mt-6 max-w-lg">
            <div className="min-w-[320px]">
              <div className="grid grid-cols-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 px-4 py-2.5 border-b border-black/[0.04]">
                <span>Mode</span><span>Cost</span><span>Speed</span><span>Comfort</span>
              </div>
              {[
                { mode: "Metro", cost: "₹", speed: "Fast", comfort: "Good" },
                { mode: "Uber", cost: "₹₹", speed: "Medium", comfort: "Best" },
                { mode: "Auto", cost: "₹", speed: "Medium", comfort: "Basic" },
                { mode: "Taxi", cost: "₹₹₹", speed: "Medium", comfort: "Good" },
              ].map((r, i) => (
                <div key={r.mode} className={`grid grid-cols-4 text-[13px] px-4 py-2.5 ${i < 3 ? "border-b border-black/[0.04]" : ""}`}>
                  <span className="font-medium text-foreground">{r.mode}</span>
                  <span className="text-muted-foreground">{r.cost}</span>
                  <span className="text-muted-foreground">{r.speed}</span>
                  <span className="text-muted-foreground">{r.comfort}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Scams */}
        <section>
          <SectionHead
            icon={AlertTriangle}
            id="scams"
            badge="Stay safe"
            title="Scams to Avoid"
            subtitle="Most people are genuinely helpful — but tourist areas attract a few tricks."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard icon={ShieldAlert} title="Fake tour guides" items={[
              "People at stations claiming 'official tourist office'",
              "They redirect you to overpriced hotels/tours",
              "Only use government-approved tourism offices",
              "Book guides through your hotel only",
            ]} />
            <InfoCard icon={Car} title="Taxi scams" items={[
              "'My meter is broken' — agree fare first or use app",
              "'Your hotel is closed' — they want commission elsewhere",
              "Never let drivers take you to a 'better hotel'",
              "Use Uber or prepaid counters for honest pricing",
            ]} />
            <InfoCard icon={IndianRupee} title="Overpriced shops" items={[
              "Shops near tourist spots charge 3x–10x normal",
              "'Government emporium' often isn't government-run",
              "Never follow a rickshaw driver's shop recommendation",
              "Go to Dilli Haat or Khadi Gramodyog stores",
            ]} />
            <InfoCard icon={FileText} title="Fake tickets" items={[
              "Buy tickets ONLY from official ASI counters/website",
              "Ignore 'skip the line' sellers outside monuments",
              "Carry your own water — sellers overcharge at sites",
              "'Temple donation required' — usually a scam",
            ]} />
          </div>
        </section>

        {/* 5 — Tips */}
        <section>
          <SectionHead
            icon={Lightbulb}
            id="tips"
            badge="Local knowledge"
            title="Quick Local Tips"
            subtitle="Small things that make a big difference on the ground."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard icon={CreditCard} title="Money" items={[
              "UPI (Google Pay, PhonePe) is used everywhere",
              "Carry ₹500–₹2,000 cash for autos and tips",
              "SBI and HDFC ATMs are most reliable",
              "Don't exchange money at the airport",
            ]} />
            <InfoCard icon={ShieldAlert} title="Safety" items={[
              "Generally safe — use common sense like any big city",
              "Avoid poorly-lit areas late at night",
              "Keep valuables in front pocket in crowds",
              "Emergency number: 112",
            ]} />
            <InfoCard icon={MapPin} title="Culture" items={[
              "Remove shoes at temples, mosques and homes",
              "Dress modestly at religious sites",
              "Tipping: ₹50–₹100 for good service",
              "Saying 'Namaste' with folded hands goes a long way",
            ]} />
            <InfoCard icon={Smartphone} title="Apps to install" items={[
              "Uber / Ola — rides at fixed prices",
              "Delhi Metro Rail (DMRC) — route planner",
              "Google Maps — works well for Delhi",
              "Zomato / Swiggy — food delivery & reviews",
            ]} />
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-white border border-black/[0.04] p-8 sm:p-12 text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2">
            Still have questions?
          </h2>
          <p className="text-[14px] text-muted-foreground max-w-sm mx-auto mb-6">
            I answer every question personally. Ask me anything about Delhi.
          </p>
          <Link to="/ask-a-local">
            <Button className="rounded-full px-6 gap-2 h-10 text-[13px] bg-foreground text-background hover:bg-foreground/90">
              <MessageCircle className="w-3.5 h-3.5" />
              Ask a Local
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
