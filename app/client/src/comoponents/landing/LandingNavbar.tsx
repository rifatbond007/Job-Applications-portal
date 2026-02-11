import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Briefcase } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      scrolled 
        ? "bg-white/90 backdrop-blur-xl py-3 border-b border-slate-200 shadow-sm" 
        : "bg-transparent py-6 border-b border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-12 items-center justify-between">
          
          {/* Logo - Black Branding */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-950 p-2 rounded-xl group-hover:bg-indigo-600 transition-all duration-300 shadow-lg">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-950">
              JobTracker<span className="text-slate-400">.</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950/5 p-1 rounded-full backdrop-blur-sm border border-slate-200/50">
            {["Find Jobs", "Companies", "About", "Pricing"].map((item) => (
              <Link 
                key={item} 
                to="#" 
                className="px-5 py-1.5 rounded-full text-sm font-bold text-slate-600 hover:text-slate-950 hover:bg-white transition-all duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Action Button with Dropdown */}
          <Link to="/auth">
            <Button className="rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold h-11 px-6 shadow-xl shadow-slate-200 transition-all hover:scale-105 active:scale-95 border-none">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}