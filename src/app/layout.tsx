import type { Metadata } from "next";
// Self-hosted variable fonts (SIL Open Font License) bundled from npm.
// No Google Fonts request at build or run time: works offline, behind firewalls, and is privacy-friendly.
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { localeMeta, ui } from "@/config/i18n";
import { buildMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata()
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = siteConfig.locale;
  return (
    <html
      lang={locale}
      dir={localeMeta[locale].dir}
      data-preset={siteConfig.defaults.preset}
      suppressHydrationWarning
    >
      <body id="top" className="min-h-screen antialiased">
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded bg-accent px-3 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
          >
            {ui[locale].skipToContent}
          </a>
          <Navigation />
          <CommandPalette />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
