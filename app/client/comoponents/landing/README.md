# Landing Page Components

## Directory Structure

```
landing/
├── LandingPage.tsx           # Main landing page container
├── LandingNavbar.tsx         # Top navigation with hover dropdowns
├── SearchBar.tsx             # Multi-filter search interface
├── JobCard.tsx               # Individual job card (memoized)
├── JobCardSkeleton.tsx       # Loading skeleton for job cards
├── ApplicationSidebar.tsx    # Application form modal
├── StatusTracker.tsx         # Application progress tracker
├── index.ts                  # Barrel exports
└── README.md                 # This file
```

## Component Hierarchy

```
LandingPage (Main Container)
├── LandingNavbar
│   └── Hover Dropdowns (Admin, Job Seeker, Employer)
├── Hero Section
│   ├── Stats Display
│   └── SearchBar
│       ├── Keyword Input
│       ├── Location Filter
│       └── Department Filter
├── Features Banner
├── Main Content
│   ├── Job Feed
│   │   ├── JobCard (x6 per page)
│   │   └── JobCardSkeleton (loading state)
│   ├── Pagination Controls
│   └── StatusTracker (Sidebar)
├── ApplicationSidebar (Modal)
│   ├── Form Fields
│   ├── File Upload (Drag & Drop)
│   └── Validation Feedback
└── Footer
```

## Component Props

### LandingPage
No props - top-level component with internal state management.

### LandingNavbar
No props - self-contained navigation component.

### SearchBar
```typescript
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedLocationType: string;
  onLocationTypeChange: (value: string) => void;
  onSearch: () => void;
}
```

### JobCard
```typescript
interface JobCardProps {
  job: JobListing;
  onApply: (jobId: string) => void;
}
```

### ApplicationSidebar
```typescript
interface ApplicationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing | null;
}
```

### StatusTracker
```typescript
interface StatusTrackerProps {
  applications: ApplicationProgress[];
}
```

## State Management

### Local State (useState)
- `searchTerm`: Current search keyword
- `selectedDepartment`: Selected department filter
- `selectedLocationType`: Selected location type filter
- `currentPage`: Current pagination page
- `isLoading`: Loading state for skeleton display
- `selectedJob`: Job selected for application
- `isApplicationOpen`: Application modal visibility

### Derived State (useMemo)
- `filteredJobs`: Jobs filtered by search criteria
- `paginatedJobs`: Current page's jobs

### Persisted State (localStorage)
- Saved jobs (bookmark state)
- Application drafts (per job)

## Data Flow

1. **User Search**:
   ```
   SearchBar → onChange → LandingPage state → useMemo filter → JobCard render
   ```

2. **Apply for Job**:
   ```
   JobCard "Apply Now" → onApply → setSelectedJob → ApplicationSidebar opens
   ```

3. **Save Job**:
   ```
   JobCard bookmark → localStorage → persist across sessions
   ```

4. **Form Submission**:
   ```
   ApplicationSidebar → React Hook Form → Zod validation → Success/Error
   ```

## Performance Optimizations

1. **JobCard Memoization**:
   - Wrapped with `React.memo`
   - Only re-renders when job data changes
   - Prevents unnecessary re-renders during filtering

2. **useMemo for Filtering**:
   - Filters only recalculate when dependencies change
   - Improves performance with large job lists

3. **Pagination**:
   - Limits DOM nodes to 6 jobs per page
   - Reduces initial render time

4. **Skeleton Loaders**:
   - Displays immediately while data loads
   - Better perceived performance

## Accessibility Features

### Keyboard Navigation
- Tab through all interactive elements
- Enter to submit forms/search
- Escape to close modals
- Focus trap in application sidebar

### ARIA Labels
- All buttons have `aria-label`
- Form fields have `aria-describedby` for errors
- Modal has `aria-labelledby` and `aria-describedby`
- Pagination has `aria-current` for active page

### Screen Reader Support
- Semantic HTML (nav, section, article, footer)
- Proper heading hierarchy (h1-h4)
- Form error announcements
- Loading state announcements

## Form Validation

### Zod Schema
```typescript
{
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/).min(10),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  coverLetter: z.string().min(50)
}
```

### React Hook Form Integration
- Auto-validation on blur
- Real-time error display
- Submission disabled during validation
- Form reset on successful submit

## File Upload

### Supported Formats
- PDF (.pdf)
- Microsoft Word (.doc, .docx)

### Validation
- Max file size: 5MB
- MIME type checking
- Duplicate file prevention

### Features
- Drag and drop
- Click to browse
- File preview with size display
- Remove file option

## LocalStorage Keys

```typescript
- "savedJobs": string[]                    // Array of saved job IDs
- "applicationDraft_{jobId}": FormData     // Draft per job application
```

## Customization

### Changing Items Per Page
```typescript
// In LandingPage.tsx
const ITEMS_PER_PAGE = 6; // Change this value
```

### Modifying Mock Data
```typescript
// In /src/app/data/mockJobs.ts
export const MOCK_JOBS: JobListing[] = [
  // Add/edit jobs here
];
```

### Styling
All components use Tailwind CSS classes. Modify classes directly in components.

## Common Tasks

### Add New Filter
1. Add state in LandingPage
2. Add to SearchBar props
3. Update filteredJobs useMemo
4. Add UI in SearchBar component

### Modify Form Fields
1. Update schema in ApplicationSidebar
2. Add field in form JSX
3. Register with React Hook Form
4. Add validation message

### Change Color Theme
Update Tailwind classes:
- Primary: `bg-blue-600` → `bg-[your-color]-600`
- Hover: `hover:bg-blue-700` → `hover:bg-[your-color]-700`

## Testing

### Unit Tests
```bash
# Test individual components
- JobCard rendering
- SearchBar filtering logic
- Form validation
```

### Integration Tests
```bash
# Test component interactions
- Search → Filter → Display
- Apply → Form → Submit
- Save → LocalStorage → Persist
```

### E2E Tests
```bash
# Test complete user flows
- Browse jobs → Apply → Submit
- Search → Filter → Paginate
- Save jobs → Navigate away → Return
```

## Troubleshooting

### Issue: Jobs not filtering
- Check useMemo dependencies
- Verify filter state updates
- Console log filteredJobs

### Issue: Form not submitting
- Check Zod schema validation
- Verify all required fields
- Check console for errors

### Issue: LocalStorage not persisting
- Check browser privacy settings
- Verify key names match
- Test with isLocalStorageAvailable()

### Issue: Skeleton loaders stuck
- Check isLoading state reset
- Verify setTimeout cleanup
- Check for infinite loops

## Best Practices

1. ✅ Keep components small and focused
2. ✅ Use TypeScript for all props
3. ✅ Memoize expensive computations
4. ✅ Handle loading and error states
5. ✅ Add proper accessibility attributes
6. ✅ Test across different screen sizes
7. ✅ Validate user input
8. ✅ Provide user feedback (toasts)
9. ✅ Clean up side effects (useEffect)
10. ✅ Document complex logic
