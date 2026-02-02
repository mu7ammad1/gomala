## 2025-05-15 - Improving Arabic Accessibility & Localization
**Learning:** In a project primarily targeted at Arabic speakers with an RTL layout, consistency in localization is key for UX. Using English labels for ARIA attributes or UI controls (like "Logout" or "EGP") creates a disjointed experience. Additionally, icon-only buttons are frequent in Shadcn-based projects and often lack descriptive ARIA labels.
**Action:** Always check icon-only buttons (size="icon") for missing `aria-label` or `sr-only` text and ensure all accessibility labels match the primary UI language.
