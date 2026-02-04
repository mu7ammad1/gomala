## 2025-05-15 - [Arabic RTL Accessibility]
**Learning:** In RTL applications localized to Arabic, icon-only buttons must have Arabic ARIA labels to ensure a consistent experience for screen reader users. Simply using English labels or no labels at all is a major accessibility gap in an otherwise localized interface.
**Action:** Always check for icon-only buttons and provide meaningful Arabic `aria-label` attributes that match the surrounding UI language.

## 2025-05-15 - [Currency Localization Consistency]
**Learning:** Standardizing currency symbols (e.g., using 'ج.م' instead of 'EGP' or '$') across all components (Cart, Product Card, Details) is a small but impactful micro-UX improvement that reduces cognitive load for local users.
**Action:** Audit the application for inconsistent currency representations and unify them using the most culturally appropriate symbol for the target locale.
