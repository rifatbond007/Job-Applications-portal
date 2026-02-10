import { Search, MapPin, Building2 } from "lucide-react";
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

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedLocationType: string;
  onLocationTypeChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLocationType,
  onLocationTypeChange,
  onSearch,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Role/Keyword Search */}
        <div className="md:col-span-5">
          <label htmlFor="job-search" className="sr-only">
            Search jobs by keyword or title
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="job-search"
              type="text"
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12"
              aria-label="Search jobs"
            />
          </div>
        </div>

        {/* Location Type Filter */}
        <div className="md:col-span-3">
          <label htmlFor="location-filter" className="sr-only">
            Filter by location type
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            <Select value={selectedLocationType} onValueChange={onLocationTypeChange}>
              <SelectTrigger
                id="location-filter"
                className="pl-10 h-12"
                aria-label="Location type filter"
              >
                <SelectValue placeholder="Location Type" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Department Filter */}
        <div className="md:col-span-3">
          <label htmlFor="department-filter" className="sr-only">
            Filter by department
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
              <SelectTrigger
                id="department-filter"
                className="pl-10 h-12"
                aria-label="Department filter"
              >
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <Button
            onClick={onSearch}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            aria-label="Search jobs"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedDepartment !== "All Departments" ||
        selectedLocationType !== "All Types" ||
        searchTerm) && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {searchTerm && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
              "{searchTerm}"
            </span>
          )}
          {selectedDepartment !== "All Departments" && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {selectedDepartment}
            </span>
          )}
          {selectedLocationType !== "All Types" && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {selectedLocationType}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
