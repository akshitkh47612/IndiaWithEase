import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.error("404 — route not found:", pathname);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-24">
        <div className="text-center px-5">
          <p className="text-[80px] font-extrabold text-black/[0.06] leading-none mb-2">
            404
          </p>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Page not found
          </h1>
          <p className="text-[14px] text-muted-foreground mb-8 max-w-xs mx-auto">
            Looks like you've wandered off the map. Let's get you back.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <Link to="/">
              <Button className="rounded-full px-5 gap-1.5 h-9 text-[13px] bg-foreground text-background hover:bg-foreground/90">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Button>
            </Link>
            <Link to="/delhi-guide">
              <Button variant="outline" className="rounded-full px-5 h-9 text-[13px] border-black/10 hover:bg-black/[0.02]">
                Delhi Travel Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
