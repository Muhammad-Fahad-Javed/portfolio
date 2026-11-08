import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { AvailabilityBadge } from "@/components/availability-badge";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description: `Get in touch with ${siteConfig.person.name}.`
});

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Let's talk."
      headingLevel={1}
      className="pt-12 md:pt-20"
      description="Tell me what you're working on. If it's not a fit, I'll say so quickly."
    >
      <div className="grid gap-12 md:grid-cols-[1fr_18rem] md:items-start">
        <ContactForm fallbackEmail={siteConfig.person.email} />
        <aside className="space-y-6 text-sm">
          <div>
            <p className="eyebrow mb-2">Direct</p>
            <a href={`mailto:${siteConfig.person.email}`} className="break-all text-accent hover:underline">
              {siteConfig.person.email}
            </a>
            <div className="mt-3">
              <CopyEmail email={siteConfig.person.email} className="flex-wrap" />
            </div>
          </div>
          <div>
            <p className="eyebrow mb-2">Location</p>
            <p className="text-text-secondary">{siteConfig.person.location}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Availability</p>
            <AvailabilityBadge />
          </div>
        </aside>
      </div>
    </Section>
  );
}
