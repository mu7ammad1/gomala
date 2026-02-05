## 2025-05-14 - [Accessibility & Localization Consistency]
**Learning:** In a project with a non-English primary language (Arabic), all accessibility attributes like `aria-label` must also be localized to that language to ensure a consistent experience for screen reader users. Additionally, standardizing symbols like currency (EGP -> ج.م) improves visual cohesion.
**Action:** Always check the primary language of the UI and ensure ARIA labels match it. Verify that all interactive elements (especially icon-only ones) have appropriate labels.
