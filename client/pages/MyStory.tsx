import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const travelPhotos = [
  { src: "/travel-malaysia.png", alt: "Malaysia", caption: "Malaysia" },
  { src: "/travel-japan.png", alt: "Japan", caption: "Japan" },
  { src: "/travel-thailand.png", alt: "Thailand", caption: "Thailand" },
];

export default function MyStory() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[55vh] min-h-[240px] sm:min-h-[360px] overflow-hidden">
        <img
          src="/hero-qutub-minar.png"
          alt="Delhi at night"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        <div className="relative h-full flex flex-col items-center justify-end pb-14 px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
            The person behind this project
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight text-center leading-[1.1]">
            A Note from Your
            <br />
            <span className="text-white/50">Local Friend</span>
          </h1>
        </div>
      </section>

      {/* Story body */}
      <section className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">

          {/* Opening */}
          <p className="text-[20px] sm:text-[24px] font-extrabold text-foreground tracking-tight leading-snug mb-10">
            Hi there. If you&apos;ve found your way to this page — welcome.
          </p>

          <div className="space-y-6 text-[16px] leading-[1.85] text-foreground/70">
            <p>
              By profession, I&apos;m an engineer — not a certified tour guide.
              I created this space because I know exactly how it feels to land in
              a new country, not sure if you&apos;re making the right choices or
              paying a fair price.
            </p>

            <p>
              Every time I travel abroad, the kindness of locals has been my
              greatest safety net — the stranger who pointed me to the right
              train, the shopkeeper who warned me about a scam, the friend of a
              friend who said &ldquo;just text me if you need anything.&rdquo;
            </p>

            <p className="text-foreground/90 font-medium">
              This project is my way of keeping that circle of kindness moving.
            </p>
          </div>

          {/* Photo strip */}
          <div className="my-14">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {travelPhotos.map((photo) => (
                <div key={photo.caption} className="group relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-3 left-3 text-[12px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-[12px] text-muted-foreground/40 mt-3">
              A few countries I keep going back to — each trip makes me see travel a little differently, and I plan to keep expanding this horizon
            </p>
          </div>

          {/* Second section */}
          <div className="space-y-6 text-[16px] leading-[1.85] text-foreground/70">
            <p>
              India is a beautiful, vibrant, and deeply positive place — but
              I&apos;ll be the first to admit it can be a bit of a puzzle to
              navigate. Whether you&apos;re worried about a potential scam,
              unsure about local customs, or just need to know which corner of
              the city has the best hidden gems — I&apos;m here to help.
            </p>

            <p>
              Having spent most of my life in Delhi, and lived in both Hyderabad
              and Bengaluru, I&apos;ve experienced these cities as a local and a
              resident. I know the shortcuts, the pitfalls, and the places that
              don&apos;t make it into the guidebooks.
            </p>
          </div>

          {/* Pull quote */}
          <div className="my-14 py-8 border-y border-black/[0.06]">
            <blockquote className="text-[19px] sm:text-[26px] font-extrabold text-foreground tracking-tight leading-snug text-center max-w-lg mx-auto">
              &ldquo;Think of me as a friend you can text when you&apos;re not sure
              of the next step.&rdquo;
            </blockquote>
            <p className="text-center text-[13px] text-muted-foreground/50 mt-4">
              No strings attached — just a fellow traveler looking out for you.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-white border border-black/[0.04] p-6 sm:p-10 text-center shadow-sm overflow-hidden">
            <MessageCircle className="w-7 h-7 text-foreground/15 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-2">
              Got a question about India?
            </h2>
            <p className="text-[14px] text-muted-foreground max-w-sm mx-auto mb-6">
              Seriously — ask me anything. No strings attached, no upsells.
              Just honest advice from someone who&apos;s been here a while.
            </p>
            <Link to="/ask-a-local" className="block">
              <Button className="rounded-full px-5 sm:px-7 gap-2 h-auto min-h-[44px] py-3 text-[13px] sm:text-[14px] bg-foreground text-background hover:bg-foreground/90 font-semibold w-full sm:w-auto whitespace-normal">
                Send me a question — no strings attached
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
