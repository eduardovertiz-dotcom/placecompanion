import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#141413" }}>
      <SiteNav />

      <div className="max-w-3xl mx-auto px-8 py-24">
        <h1
          className="font-serif font-normal text-[#FAF9F5] mb-4"
          style={{ fontSize: "56px", lineHeight: 1.05 }}
        >
          Privacy Policy
        </h1>
        <p className="font-sans text-[#53525D] mb-16" style={{ fontSize: "14px" }}>
          Last updated: March 2026
        </p>

        <div className="space-y-0">

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              Information We Collect
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              We collect information you provide when creating a hotel assistant — including
              your hotel name, property description, and contact email. We also collect
              conversation data (messages guests send to your assistant) to improve response
              quality. We do not collect payment information directly; billing is handled
              through Stripe.
            </p>
          </section>

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              How We Use It
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              Your hotel information is used solely to configure and operate your AI
              assistant. Guest conversation data is used to improve answer accuracy for
              your property. We do not sell your data or your guests&apos; data to any
              third party. We do not use conversation data for advertising.
            </p>
          </section>

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              Data Storage
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              Data is stored on servers in the United States. We retain conversation
              logs for up to 90 days to enable analytics features. You may request
              deletion of your hotel&apos;s data at any time by contacting us. We use
              industry-standard encryption in transit and at rest.
            </p>
          </section>

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              Contact
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              For any privacy questions or data requests, contact us at{" "}
              <a
                href="mailto:hola@placecompanion.com"
                className="text-[#FAF9F5] hover:text-white transition-colors duration-200"
              >
                hola@placecompanion.com
              </a>
              . We will respond within 5 business days.
            </p>
          </section>

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
