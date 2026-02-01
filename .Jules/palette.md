## 2025-02-19 - [Arabic Accessibility & Pluralization]
**Learning:** Arabic pluralization for UI labels (e.g., "1 item" vs "3 items") is complex and using simple templates like `${n} items` translated to Arabic often results in grammatical errors.
**Action:** Use simple, non-numeric labels like "سلة التسوق" (Shopping Cart) when dynamic pluralization logic is not available, or implement a proper pluralization helper for the 6 Arabic plural forms.

## 2025-02-19 - [Nested Triggers in Radix/Shadcn]
**Learning:** When nesting multiple triggers (e.g., TooltipTrigger and SheetTrigger) on the same button, both must use the `asChild` prop to correctly pass down props and event handlers.
**Action:** Always verify that nested triggers all have `asChild` and the innermost element is the actual interactive component (e.g., Button).
