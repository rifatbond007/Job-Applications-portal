import React from "react";
import { Search, MapPin, Building2, X, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { DEPARTMENTS, LOCATION_TYPES } from "../../data/mockJobs";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedLocationType: string;
  onLocationTypeChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLocationType,
  onLocationTypeChange,
  onSearch,
  className,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  const hasFilters =
    searchTerm !== "" ||
    selectedDepartment !== "All Departments" ||
    selectedLocationType !== "All Types";

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-3", className)}>
      {/* Container: Optimized padding and spacing */}
      <div className="bg-white p-1 rounded-lg md:rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center gap-0 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/20">
        
        {/* Keyword Search */}
        <div className="flex-[1.4] flex items-center px-3 relative group">
          <Search className="h-4 w-4 text-indigo-500 shrink-0 mr-2.5 transition-transform group-focus-within:scale-110" />
          <Input
            type="text"
            placeholder="Role or company..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-none shadow-none focus-visible:ring-0 px-0 h-9 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors ml-1"
            >
              <X className="h-3.5 w-3.5 text-slate-400" />
            </button>
          )}
        </div>

        <div className="hidden md:block w-px h-6 bg-slate-100 mx-1" />

        {/* Location Type */}
        <div className="flex-1 flex items-center px-2.5 group">
          <MapPin className="h-4 w-4 text-slate-400 shrink-0 mr-1 group-focus-within:text-indigo-500" />
          <Select value={selectedLocationType} onValueChange={onLocationTypeChange}>
            <SelectTrigger className="border-none shadow-none focus:ring-0 focus:ring-offset-0 h-9 text-xs text-slate-700 font-bold bg-transparent">
              <SelectValue placeholder="Work Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 shadow-2xl z-[9999] rounded-xl">
              {LOCATION_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="text-xs font-semibold focus:bg-indigo-50 cursor-pointer">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden md:block w-px h-6 bg-slate-100 mx-1" />

        {/* Department */}
        <div className="flex-1 flex items-center px-2.5 group">
          <Building2 className="h-4 w-4 text-slate-400 shrink-0 mr-1 group-focus-within:text-indigo-500" />
          <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger className="border-none shadow-none focus:ring-0 focus:ring-offset-0 h-9 text-xs text-slate-700 font-bold bg-transparent">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 shadow-2xl z-[9999] rounded-xl">
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept} className="text-xs font-semibold focus:bg-indigo-50 cursor-pointer">
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button
          onClick={onSearch}
          className="md:rounded-full h-9 md:h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-indigo-200 group shrink-0"
        >
          <span className="flex items-center gap-1.5">
            Search
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Button>
      </div>

      {/* Filter Pills */}
      {hasFilters && (
        <div className="flex flex-wrap items-center justify-center gap-1 animate-in fade-in slide-in-from-top-1">
          {searchTerm && <FilterPill label={`"${searchTerm}"`} onClear={() => onSearchChange("")} />}
          {selectedLocationType !== "All Types" && (
            <FilterPill label={selectedLocationType} onClear={() => onLocationTypeChange("All Types")} />
          )}
          {selectedDepartment !== "All Departments" && (
            <FilterPill label={selectedDepartment} onClear={() => onDepartmentChange("All Departments")} />
          )}
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <div className="flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full group hover:border-indigo-200 transition-colors shadow-sm">
      <span className="text-[10px] font-bold text-slate-600 group-hover:text-indigo-600">{label}</span>
      <button onClick={onClear} className="text-slate-300 hover:text-red-500 transition-colors">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}