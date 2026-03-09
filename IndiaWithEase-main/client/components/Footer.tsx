import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.04] bg-white/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-[15px] text-foreground mb-3">IndiaWithEase</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
            Your local connection to the heart of India. (Starting with the city I know best: Delhi.)
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Guides</p>
            <ul className="space-y-2 text-[13px]">
              <li><Link to="/delhi-guide" className="text-muted-foreground hover:text-foreground transition">Delhi Travel Guide</Link></li>
              <li><Link to="/delhi-guide#transport" className="text-muted-foreground hover:text-foreground transition">Transport</Link></li>
              <li><Link to="/delhi-guide#scams" className="text-muted-foreground hover:text-foreground transition">Scams to Avoid</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Help</p>
            <ul className="space-y-2 text-[13px]">
              <li><Link to="/ask-a-local" className="text-muted-foreground hover:text-foreground transition">Ask Me</Link></li>
              <li><Link to="/my-story" className="text-muted-foreground hover:text-foreground transition">My Story</Link></li>
              <li><a href="mailto:hello@indiawithease.com" className="text-muted-foreground hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Social</p>
            <ul className="space-y-2 text-[13px]">
              <li><a href="https://instagram.com/indiawithease" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/[0.04] pt-6 text-center">
          <p className="text-[12px] text-muted-foreground/50">&copy; {new Date().getFullYear()} IndiaWithEase</p>
        </div>
      </div>
    </footer>
  );
}
