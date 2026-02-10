import { Link, useLocation } from "react-router";
import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface PortalSidebarProps {
  title: string;
  items: SidebarItem[];
  accentColor: string;
}

export function PortalSidebar({ title, items, accentColor }: PortalSidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className={`p-6 border-b border-gray-800 ${accentColor} bg-opacity-10`}>
        <h1 className="text-xl">{title}</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? `${accentColor} bg-opacity-20 text-white`
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
