## 2025-05-14 - [Confirmation Dialog for Destructive Actions]
**Learning:** In a local-first application where data is stored in localStorage, accidental deletion is a high-risk event because there is no easy server-side restore. Adding a confirmation dialog for folder deletion is a critical UX safeguard that aligns with the "Palette" philosophy of making interaction feel smooth and safe.
**Action:** Always implement confirmation steps or "undo" patterns for destructive actions in local-first apps to maintain user trust and prevent data loss.

## 2025-05-15 - [Empty State CTAs for Better Onboarding]
**Learning:** In a minimalist or technical UI (like the "Industrial" theme), empty states can easily feel like "dead ends" if they only contain static text. Adding a prominent, themed CTA button (e.g., using a dashed border for a "placeholder" look) significantly improves the onboarding experience and makes the next logical step unambiguous.
**Action:** Always accompany empty state messages with a direct call-to-action button that triggers the primary intended interaction for that view.

## 2026-02-11 - [Album Removal Safeguards]
**Learning:** Destructive actions on individual items (like albums) require the same level of protection as larger entities (like folders) in a local-first application. Users expect consistent safety patterns across the UI.
**Action:** Apply the confirmation dialog + toast feedback pattern consistently to all destructive actions, regardless of the item's perceived "size" in the hierarchy.

## 2025-05-16 - [Search Result Hover Affordance]
**Learning:** Providing visual affordance for primary actions in a search list (like adding an item) is critical for discoverability. Using a 'Plus' icon on hover for non-added items, and an 'X' on hover for added items (replacing a 'Check' mark), creates a consistent and intuitive interaction pattern.
**Action:** Always ensure interactive list items have clear hover states that signal their primary affordance, while maintaining accessibility via ARIA labels on the container.

## 2026-05-20 - [Character Counters and Double-Click Shortcuts]
**Learning:** Combining intuitive shortcuts (double-click to rename) with real-time feedback (character counters) enhances both power-user efficiency and general accessibility. When implementing counters, using `aria-describedby` ensures screen reader compatibility, while slightly larger font sizes and higher contrast maintain legibility in technical UIs.
**Action:** Always link character counters to their inputs using ARIA attributes and ensure they meet minimum contrast requirements even in minimalist themes.

## 2025-05-21 - [Keyboard Shortcut Hints and Power-User Patterns]
**Learning:** Introducing global keyboard shortcuts (e.g., 'S' for Settings, 'T' for Theme) significantly enhances power-user efficiency. Visually communicating these shortcuts via bracketed hints in labels and tooltips (e.g., 'Settings [S]') improves discoverability while ensuring they don't trigger during text input.
**Action:** Accompany global keyboard shortcuts with visual bracketed hints in labels and titles, and ensure they are guarded against active input elements and modifier keys.
