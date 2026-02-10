import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Briefcase, ChevronDown, User, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function LandingNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStartedItems = [
    { title: "Job Seeker", sub: "Apply & track jobs", href: "/job-seeker", icon: <User className="h-4 w-4" />, color: "text-slate-900 bg-slate-50" },
    { title: "Job Poster", sub: "Hire top talent", href: "/job-poster", icon: <Users className="h-4 w-4" />, color: "text-slate-900 bg-slate-50" },
    { title: "Admin", sub: "Platform control", href: "/admin", icon: <Shield className="h-4 w-4" />, color: "text-slate-900 bg-slate-50" },
  ];

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
          <div className="relative" onMouseEnter={() => setActiveDropdown("get-started")} onMouseLeave={() => setActiveDropdown(null)}>
            <Button className="rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold h-11 px-6 shadow-xl shadow-slate-200 transition-all hover:scale-105 active:scale-95 border-none">
              Get Started
              <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform duration-300", activeDropdown === "get-started" && "rotate-180")} />
            </Button>

            {activeDropdown === "get-started" && (
              <div className="absolute right-0 mt-4 w-72 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="rounded-[2rem] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 overflow-hidden">
                  <div className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Select Portal</div>
                  {getStartedItems.map((item) => (
                    <Link key={item.title} to={item.href} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition group">
                      <div className={cn("p-2.5 rounded-xl transition-colors shadow-sm", item.color)}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{item.sub}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}