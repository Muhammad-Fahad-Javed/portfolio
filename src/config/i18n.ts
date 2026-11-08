import type { Locale } from "@/types";

/**
 * Translation-ready foundation.
 *
 * What works today:
 *  - <html lang> and <html dir> follow `siteConfig.locale` (en = ltr, ar/ur = rtl)
 *  - UI strings below are centralized so they can be translated
 *
 * What is NOT implemented: per-locale routing (/ar/...), translated content files,
 * and logical-property (start/end) conversion of every layout utility.
 * See DOCUMENTATION.md > Multilingual for the honest scope.
 */
export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", dir: "ltr" },
  ur: { label: "اردو", dir: "rtl" },
  ar: { label: "العربية", dir: "rtl" }
};

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu"
  },
  ur: {
    skipToContent: "مواد پر جائیں",
    openMenu: "مینو کھولیں",
    closeMenu: "مینو بند کریں"
  },
  ar: {
    skipToContent: "انتقل إلى المحتوى",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة"
  }
};
