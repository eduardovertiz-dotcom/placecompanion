import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#141413" }}>
      <SiteNav />

      <div className="max-w-3xl mx-auto px-8 py-24">
        <h1
          className="font-serif font-normal text-[#FAF9F5] mb-4"
          style={{ fontSize: "56px", lineHeight: 1.05 }}
        >
          Terms of Service
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
              Use of Service
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              Place Companion provides an AI-powered guest assistant platform for hotels
              and hospitality businesses. By creating an account, you agree to use the
              service only for lawful purposes and in accordance with these terms. You
              are responsible for the accuracy of the hotel information you provide to
              configure your assistant.
            </p>
          </section>

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              Acceptable Use
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              You may not use Place Companion to provide false or misleading information
              to guests, to collect personal data beyond what is necessary for guest
              assistance, or to violate any applicable laws. We reserve the right to
              suspend accounts that violate these terms without refund.
            </p>
          </section>

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              Payment
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              Paid plans are billed monthly or annually via Stripe. Annual plans are
              non-refundable after 14 days. Monthly plans may be cancelled at any time
              and will not renew after the current billing period ends. Free trials
              require no credit card and convert to paid plans only with your explicit
              consent.
            </p>
          </section>

          <section>
            <h2
              className="font-serif font-normal text-[#FAF9F5] mb-4 mt-12"
              style={{ fontSize: "28px" }}
            >
              Limitation of Liability
            </h2>
            <p
              className="font-sans font-light text-[#9C9A93] leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              Place Companion is provided &ldquo;as is&rdquo; without warranties of any kind.
              We are not liable for any damages arising from incorrect information
              provided by the AI assistant, system downtime, or decisions made based
              on assistant responses. Our total liability to you shall not exceed the
              amount you paid in the 3 months prior to the claim.
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
              Questions about these terms? Email us at{" "}
              <a
                href="mailto:hola@placecompanion.com"
                className="text-[#FAF9F5] hover:text-white transition-colors duration-200"
              >
                hola@placecompanion.com
              </a>
              .
            </p>
          </section>

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
