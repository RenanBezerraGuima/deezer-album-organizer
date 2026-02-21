## 2025-05-15 - [Accessible Search Combobox Pattern]
**Learning:** Implementing keyboard navigation in a search dropdown requires more than just listening for arrow keys; it requires a full ARIA combobox pattern (aria-expanded, aria-controls, aria-activedescendant) to be truly accessible to screen readers.
**Action:** Always use the standard ARIA combobox attributes when building search-with-results components to ensure screen readers announce selections correctly.

## 2025-05-16 - [Action Feedback and Input Management]
**Learning:** In highly interactive components like search-and-add, user confidence is significantly boosted by two simple touches: a one-click reset for the search input (Clear button) and immediate, high-contrast feedback for destructive or additive actions (Toast notifications).
**Action:** Always include a clear button for search inputs and use success/error toasts to confirm background state changes that might not be immediately obvious in the primary UI.

## 2026-02-05 - [Accessibility Standards for Icon-Only Buttons]
**Learning:** Icon-only buttons (like expansion toggles or inline action buttons) are completely inaccessible to screen readers without ARIA labels, and confusing for sighted users without tooltips. Combining `aria-label` with the `title` attribute provides a baseline of accessibility and usability.
**Action:** All icon-only interactive elements must have a descriptive `aria-label` and a matching `title` attribute for tooltips.

## 2025-05-20 - [Native Tooltips for Icon-Only Buttons]
**Learning:** While ARIA labels are essential for screen readers, sighted users often benefit from the immediate visual context provided by hover tooltips. Using the native `title` attribute in conjunction with `aria-label` provides a lightweight, dependency-free way to improve discovery for icon-only interactive elements.
**Action:** Consistently apply both `aria-label` and a matching `title` attribute to all icon-only buttons to ensure they are both accessible and intuitive.

## 2026-02-05 - [Empty States and Shortcuts]
**Learning:** For high-volume discovery components like search, an empty state isn't just a placeholder; it's a feedback loop. Combining "No results" messages with keyboard shortcut hints (like `[/]`) empowers both new and power users by providing clear status and efficient discovery.
**Action:** Always include specific "No results found" messages that echo the user's query, and provide discoverable keyboard shortcuts for core navigation actions.

## 2025-05-22 - [Skip to Content Link Implementation]
**Learning:** For SPAs with a global layout, the "Skip to content" link should be placed in the root layout (app/layout.tsx) and use 'fixed' positioning to ensure it reliably appears above all other elements regardless of the page-level scrolling or relative containers.
**Action:** Always place skip links at the very top of the body in the root layout and use fixed positioning with a high z-index to guarantee visibility when focused.

## 2025-05-22 - [Character Counter Noise Reduction]
**Learning:** When inputs are already linked to character counters via aria-describedby, setting aria-live="polite" on the counter creates excessive noise for screen reader users. Using aria-hidden="true" on the visual counter while maintaining the aria-describedby link on the input provides the necessary context without the repetitive keystroke announcements.
**Action:** Use aria-hidden="true" for visual character counters that are already properly linked to their parent inputs via aria-describedby to reduce accessibility noise.

## 2026-02-15 - [Interactive Breadcrumb Navigation]
**Learning:** Static breadcrumbs are a missed navigation opportunity. Transforming them into interactive links (or buttons) significantly improves the UX for hierarchical structures, providing a fast way to jump back to any ancestor without using the sidebar.
**Action:** When displaying breadcrumbs for nested resources, always make parent segments clickable and include proper accessibility markers like `aria-current="page"` for the final segment.
