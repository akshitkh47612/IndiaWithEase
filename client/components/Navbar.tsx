import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/delhi-guide", label: "Delhi Travel Guide" },
  { to: "/ask-a-local", label: "Ask Me" },
  { to: "/my-story", label: "My Story" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="text-[15px] font-bold tracking-tight text-foreground">
          IndiaWithEase
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13px] font-medium px-3 py-1.5 rounded-full transition-all ${
                pathname === link.to
                  ? "text-foreground bg-black/[0.05]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/delhi-guide" className="ml-2">
            <Button size="sm" className="rounded-full px-4 h-8 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90">
              Get Travel Guide
            </Button>
          </Link>
        </nav>

        <button className="md:hidden p-1.5 -mr-1.5 rounded-lg hover:bg-black/5 transition" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/80 backdrop-blur-2xl border-t border-black/[0.04] px-4 sm:px-5 pb-4 pt-2 space-y-0.5 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block text-[13px] font-medium px-3 py-2.5 rounded-xl transition ${
                pathname === link.to ? "text-foreground bg-black/[0.04]" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/delhi-guide" onClick={() => setOpen(false)} className="block pt-2">
            <Button className="w-full rounded-full h-9 text-[13px] bg-foreground text-background hover:bg-foreground/90">
              Get Delhi Travel Guide
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
