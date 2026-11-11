# Commercial License Review & Decision Guide

**Document Purpose:** This document highlights key commercial and legal considerations in the draft `LICENSE.md` that require the seller's explicit approval or customization before commercial release.

---

## 1. Key Licensing Decisions in `LICENSE.md`

| Section | Current Draft Term | Seller Options & Decisions Needed |
| :--- | :--- | :--- |
| **Licensing Model** | Single End Product (1 website per purchase) | Confirm whether you want to offer only a **Single-Use License**, or also add an **Extended / Unlimited License** option (e.g., higher price for unlimited client websites). |
| **Client Commercial Work** | Permitted (developers can build 1 client site per license) | Standard practice for developer templates. Confirm this aligns with your business model. |
| **Source Code Modification** | 100% full access to customize and adapt | Retained as standard; essential for Next.js developer templates. |
| **Public Repositories** | Prohibited (must keep in private Git repositories) | Protects your intellectual property from unauthorized scraping or distribution. |
| **Resale / Redistribution** | Strictly prohibited | Protects the template from being resold as a competing theme or starter kit. |

---

## 2. Marketplace-Specific Alignments

Depending on where you list the template, the marketplace may require its own standardized license:

1. **ThemeForest / Envato Market:**
   - Envato enforces its own *Regular License* (single end product) and *Extended License* (end product charged to end users).
   - If submitting to ThemeForest, Envato's license terms will take precedence, but `LICENSE.md` serves as the internal product agreement.
2. **Gumroad / Lemon Squeezy:**
   - Both platforms let you define your own custom terms. The draft `LICENSE.md` is ready for direct deployment on Gumroad or Lemon Squeezy.
3. **Direct Sales (Stripe / GitHub Sponsors):**
   - The current `LICENSE.md` protects your IP fully for direct sales.

---

## 3. Third-Party Intellectual Property & Compliance

The draft `LICENSE.md` clearly separates your original work from bundled open-source assets:
- **Fonts (SIL OFL 1.1):** Inter, Fraunces, and JetBrains Mono are licensed under the SIL Open Font License 1.1, allowing commercial embedding and bundling with software.
- **Dependencies (MIT/ISC):** Next.js, React, Tailwind CSS, Lucide icons, and Zod are commercially friendly and permissible for redistribution in compiled or source forms.
- **Images:** All default SVG illustrations in `public/images/` are placeholders. Buyers are informed to supply their own project assets.

---

## 4. Seller Approval Checklist

Before publishing on your store:
- [ ] Review the **Author / Licensor** entity name (update "FRAME Portfolio" to your personal legal name or registered business name if desired).
- [ ] Decide on your refund window (e.g., "14-day refund on technical defects" or platform-standard "All sales final for digital downloads").
- [ ] Determine support channels (e.g., GitHub issues, support email, or Discord).
