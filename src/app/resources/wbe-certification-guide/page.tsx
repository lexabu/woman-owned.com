import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'WBE Certification: A Complete Guide for Women Business Owners | Woman-Owned',
  description:
    'Everything women business owners need to know about WBE certification: what it is, who certifies it, what it costs, the real benefits, and how SIC and NAICS codes fit in.',
  alternates: {
    canonical: 'https://woman-owned.com/resources/wbe-certification-guide',
  },
};

const sections = [
  { id: 'what-is-wbe', label: 'What is WBE certification?' },
  { id: 'who-certifies', label: 'Who issues certification' },
  { id: 'sic-naics', label: 'SIC & NAICS codes' },
  { id: 'benefits', label: 'Real-world benefits' },
  { id: 'how-to-start', label: 'How to get certified' },
  { id: 'pitfalls', label: 'Common pitfalls' },
  { id: 'mena-gap', label: 'A note on MENA / Arab American owners' },
  { id: 'next-steps', label: 'Next steps' },
];

export default function WbeCertificationGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/resources"
            className="inline-flex items-center text-navy-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Resources
          </Link>
          <p className="text-coral-300 font-semibold uppercase tracking-wide text-sm mb-3">
            Certification Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            WBE Certification: A Complete Guide for Women Business Owners
          </h1>
          <p className="text-xl text-navy-200">
            What it is, who issues it, what it costs, and the real-world benefits — plus how
            classification codes like SIC and NAICS fit in.
          </p>
          <p className="text-sm text-navy-300 mt-6">12 min read · Updated April 2026</p>
        </div>
      </div>

      {/* Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TOC */}
          <nav
            aria-label="Table of contents"
            className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-200"
          >
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              In this guide
            </h2>
            <ol className="space-y-2 list-decimal list-inside marker:text-coral-500 marker:font-semibold">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-navy-700 hover:text-coral-600 hover:underline"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose prose-lg max-w-none">
            {/* Intro */}
            <p className="text-gray-700 text-lg leading-relaxed">
              If you own a women-led business, you&apos;ve probably seen the acronyms:{' '}
              <strong>WBE</strong>, <strong>WOSB</strong>, <strong>MBE</strong>,{' '}
              <strong>DBE</strong>. They sound like alphabet soup, but they unlock real,
              measurable advantages — billions of dollars in set-aside contracts every year,
              priority placement in supplier diversity programs, and a credibility signal that
              customers and partners recognize.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              This guide walks through what certification actually means, who issues it, what
              SIC and NAICS codes have to do with any of it, and how to get started without
              wasting weeks on the wrong path.
            </p>

            {/* Section 1 */}
            <h2 id="what-is-wbe" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              1. What is WBE certification?
            </h2>
            <p className="text-gray-700">
              <strong>WBE</strong> stands for <em>Women&apos;s Business Enterprise</em>. A WBE
              certification is a formal verification — by a recognized third party or a
              government agency — that your business is at least <strong>51% owned, operated,
              and controlled by one or more women</strong> who are U.S. citizens or lawful
              permanent residents.
            </p>
            <p className="text-gray-700">
              The three words matter. &quot;Owned&quot; means the equity stake. &quot;Operated&quot;
              means day-to-day management. &quot;Controlled&quot; means strategic decisions —
              hiring, signing contracts, financial authority. All three have to clear the 51%
              bar; you can&apos;t paper over a male-led business by transferring shares.
            </p>
            <p className="text-gray-700">
              Closely related certifications you&apos;ll see referenced:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>
                <strong>WOSB</strong> — Women-Owned Small Business, the federal SBA program for
                contracting set-asides.
              </li>
              <li>
                <strong>EDWOSB</strong> — Economically Disadvantaged WOSB, a subcategory with
                additional income/asset thresholds.
              </li>
              <li>
                <strong>MBE</strong> — Minority Business Enterprise. Separate certification, but
                if you qualify under both you can stack them.
              </li>
              <li>
                <strong>DBE</strong> — Disadvantaged Business Enterprise, focused on
                transportation contracts (DOT, FAA, FTA).
              </li>
            </ul>

            {/* Section 2 */}
            <h2 id="who-certifies" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              2. Who issues certification
            </h2>
            <p className="text-gray-700">
              There is no single national WBE certificate. Different bodies serve different use
              cases, and you may need more than one depending on who you want to sell to.
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      Issuer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      What it unlocks
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-semibold align-top">WBENC</td>
                    <td className="px-4 py-3 align-top">
                      Most Fortune 500 corporate supplier diversity programs
                    </td>
                    <td className="px-4 py-3 align-top">
                      The most widely recognized private cert. Site visit + financial review.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-semibold align-top">SBA (WOSB / EDWOSB)</td>
                    <td className="px-4 py-3 align-top">Federal contracting set-asides</td>
                    <td className="px-4 py-3 align-top">
                      Free to apply at certify.sba.gov. Required for federal WOSB contracts.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-semibold align-top">NWBOC</td>
                    <td className="px-4 py-3 align-top">
                      Federal contracting (third-party SBA-approved certifier) + corporate
                    </td>
                    <td className="px-4 py-3 align-top">
                      Often faster than WBENC; one of four SBA-approved third-party certifiers.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-semibold align-top">State / city programs</td>
                    <td className="px-4 py-3 align-top">
                      State and municipal contracting opportunities
                    </td>
                    <td className="px-4 py-3 align-top">
                      Texas HUB, NY MWBE, California Supplier Clearinghouse, etc. Rules vary.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold align-top">USPAACC</td>
                    <td className="px-4 py-3 align-top">Asian/Pacific American supplier programs</td>
                    <td className="px-4 py-3 align-top">
                      Stackable with WBE if you qualify on both axes.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700">
              <strong>Practical rule:</strong> If your buyers are mostly Fortune 500 or large
              corporations, start with WBENC. If you want federal contracts, start with SBA WOSB.
              If both, do both — the documentation overlaps heavily.
            </p>

            {/* Section 3 */}
            <h2 id="sic-naics" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              3. SIC & NAICS codes — and why every certification asks about them
            </h2>
            <p className="text-gray-700">
              Every certification application asks for your industry classification codes. They
              feel like a footnote but they directly determine which contract opportunities you
              show up in and which size standards apply to you.
            </p>
            <p className="text-gray-700">
              <strong>SIC</strong> (Standard Industrial Classification) is the older U.S.
              system, four digits, still used by Dun &amp; Bradstreet, banks, insurance carriers,
              and a lot of legacy procurement tools. <strong>NAICS</strong> (North American
              Industry Classification System) is the newer six-digit system used by the federal
              government and the SBA.
            </p>
            <p className="text-gray-700">
              You&apos;ll usually need both. Most platforms will translate one to the other, but
              they don&apos;t map perfectly, so it&apos;s worth picking each one deliberately.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Common codes for women-owned businesses
            </h3>
            <div className="not-prose overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      Industry
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      SIC
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      NAICS
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Beauty salons / suite rentals</td>
                    <td className="px-4 py-3 font-mono">7231</td>
                    <td className="px-4 py-3 font-mono">812112</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Jewelry stores (retail)</td>
                    <td className="px-4 py-3 font-mono">5944</td>
                    <td className="px-4 py-3 font-mono">448310</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Home goods / furniture retail</td>
                    <td className="px-4 py-3 font-mono">5712</td>
                    <td className="px-4 py-3 font-mono">442110</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Custom software / programming</td>
                    <td className="px-4 py-3 font-mono">7371</td>
                    <td className="px-4 py-3 font-mono">541511</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3">Marketing consulting</td>
                    <td className="px-4 py-3 font-mono">8742</td>
                    <td className="px-4 py-3 font-mono">541613</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Independent artists / creative services</td>
                    <td className="px-4 py-3 font-mono">7389</td>
                    <td className="px-4 py-3 font-mono">711510</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700">
              You can claim multiple codes. Pick the one that best describes your{' '}
              <strong>primary</strong> revenue, then add secondary codes for adjacent work. Don&apos;t
              guess — wrong codes lead to wrong size-standard thresholds, missed opportunities,
              and rejected applications.
            </p>

            {/* Section 4 */}
            <h2 id="benefits" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              4. The real-world benefits
            </h2>
            <p className="text-gray-700">
              Certification is paperwork. It&apos;s only worth doing if it produces results.
              Here&apos;s what it actually unlocks:
            </p>

            <div className="not-prose space-y-4 my-6">
              <div className="bg-coral-50 border-l-4 border-coral-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Set-aside contracts</h4>
                <p className="text-gray-700 text-sm">
                  The federal government has a 5% goal for awarding contracts to WOSBs each
                  year. State and city programs add similar targets. Certified businesses can
                  bid in pools where uncertified competitors can&apos;t.
                </p>
              </div>
              <div className="bg-coral-50 border-l-4 border-coral-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Corporate supplier diversity programs</h4>
                <p className="text-gray-700 text-sm">
                  Most Fortune 500 companies have supplier diversity quotas and dedicated
                  procurement teams looking for WBE vendors. WBENC certification gets you into
                  their searchable databases.
                </p>
              </div>
              <div className="bg-coral-50 border-l-4 border-coral-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Marketing trust signal</h4>
                <p className="text-gray-700 text-sm">
                  The certification logo on your website tells customers your business is what
                  it claims to be. For consumer-facing women-owned businesses, this drives
                  loyalty from buyers who actively want to support them.
                </p>
              </div>
              <div className="bg-coral-50 border-l-4 border-coral-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Networking and education</h4>
                <p className="text-gray-700 text-sm">
                  Certifying bodies run conferences, matchmaking events, and training programs.
                  WBENC&apos;s annual conference alone draws thousands of corporate buyers
                  actively shopping.
                </p>
              </div>
              <div className="bg-coral-50 border-l-4 border-coral-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Capital access</h4>
                <p className="text-gray-700 text-sm">
                  Some banks and CDFIs have lending products specifically for certified WBEs,
                  with better rates or relaxed underwriting.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <h2 id="how-to-start" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              5. How to get certified
            </h2>
            <p className="text-gray-700">
              The process varies by certifier but the document checklist is broadly the same.
              Gather these before you start:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Articles of incorporation or organization
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Operating agreement or bylaws
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Stock ledger / membership ledger showing 51%+ ownership
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Most recent 3 years of business tax returns (or all available if newer)
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Personal tax returns for the female owner(s)
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Drivers license / proof of citizenship for owners
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Resume showing the owner&apos;s industry experience
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-coral-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                Bank signature cards or board resolutions showing financial control
              </li>
            </ul>

            <p className="text-gray-700 mt-4">
              <strong>Typical timelines:</strong>
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>SBA WOSB self-certification: same day on certify.sba.gov</li>
              <li>SBA WOSB third-party (NWBOC, WBENC, etc.): 4 to 12 weeks</li>
              <li>WBENC corporate certification: 90 days on average</li>
              <li>State / city programs: typically 30 to 90 days</li>
            </ul>
            <p className="text-gray-700">
              <strong>Cost:</strong> SBA federal certification is free. WBENC charges a sliding
              fee based on revenue, typically $350 to $1,500 annually. Most state programs are
              free or under $500.
            </p>

            {/* Section 6 */}
            <h2 id="pitfalls" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              6. Common pitfalls
            </h2>
            <div className="not-prose space-y-4 my-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" aria-hidden="true" />
                  Ownership on paper, control elsewhere
                </h4>
                <p className="text-gray-700 text-sm">
                  Certifiers look hard at whether the female owner actually runs the business.
                  If a husband, father, or co-founder signs every contract, you&apos;ll be
                  rejected even with 51% equity. Make sure bank signature cards, board minutes,
                  and operating agreements all reflect real control.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" aria-hidden="true" />
                  Wrong NAICS / SIC codes
                </h4>
                <p className="text-gray-700 text-sm">
                  Codes drive size standards. A wrong code might say you&apos;re too big to
                  qualify as a small business when you&apos;d actually qualify under the right
                  one — or vice versa.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" aria-hidden="true" />
                  Letting certification lapse
                </h4>
                <p className="text-gray-700 text-sm">
                  Most certifications require annual recertification with updated tax returns.
                  Miss the renewal and you drop out of search results overnight.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" aria-hidden="true" />
                  Stopping at one certification
                </h4>
                <p className="text-gray-700 text-sm">
                  WBENC alone won&apos;t get you federal contracts. SBA WOSB alone won&apos;t
                  get you on a Fortune 500 supplier list. If you&apos;re selling to multiple
                  buyer types, plan for multiple certifications from the start.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <h2 id="mena-gap" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              7. A note on MENA / Arab American owners
            </h2>
            <p className="text-gray-700">
              If you&apos;re an Arab American or MENA (Middle Eastern or North African) woman
              business owner, here&apos;s an honest detail most guides skip: under federal MBE
              definitions, MENA is currently classified as &quot;White,&quot; which means you do
              not qualify as minority-owned for SBA, NMSDC, or most D&amp;B-driven supplier
              diversity programs.
            </p>
            <p className="text-gray-700">
              You still qualify for WBE / WOSB on the gender axis, and you can stack that with
              women-owned advantages independently. The MBE classification is a separate ladder
              that&apos;s slowly evolving — the U.S. Census is expected to add a MENA category
              in the 2030 census, which will likely cascade into federal and corporate
              definitions over time.
            </p>
            <p className="text-gray-700">
              In the meantime, some private supplier diversity programs and chambers of commerce
              (like the Arab American Chamber of Commerce) recognize MENA-owned status, and
              specific cities like New York and parts of California include MENA in their MWBE
              programs. It&apos;s worth checking program-by-program rather than assuming.
            </p>

            {/* Section 8 */}
            <h2 id="next-steps" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
              8. Next steps you can take this week
            </h2>
            <ol className="text-gray-700 space-y-3 list-decimal list-inside marker:font-semibold marker:text-coral-500">
              <li>
                <strong>Pin down your codes.</strong> Look up your primary NAICS code at{' '}
                <a
                  href="https://www.census.gov/naics/"
                  className="text-coral-600 hover:underline inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  census.gov/naics
                  <ExternalLink className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                </a>{' '}
                and confirm the SIC equivalent matches what your D&amp;B profile says.
              </li>
              <li>
                <strong>Decide your buyer mix.</strong> Federal? Corporate? State? Consumer?
                That answer determines whether you start with SBA WOSB, WBENC, a state
                program, or all three.
              </li>
              <li>
                <strong>Pull your documents.</strong> Use the checklist above. The biggest
                cause of slow certification is missing paperwork, not rejected applications.
              </li>
              <li>
                <strong>Apply.</strong> SBA WOSB self-certification at certify.sba.gov is free
                and same-day. Start there if you want federal contracting access; do it in
                parallel with WBENC for corporate.
              </li>
              <li>
                <strong>List in directories.</strong> Once certified, list your business
                everywhere relevant — including ours.
              </li>
            </ol>

            {/* Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-12">
              <p className="text-sm text-gray-600 mb-0">
                <strong>Disclaimer:</strong> This guide is informational, not legal or tax
                advice. Certification rules change and program-specific requirements vary by
                state, city, and certifier. Confirm details with each program before applying,
                and consult a qualified advisor for situation-specific questions.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-coral-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Already certified? Get listed.
          </h2>
          <p className="text-xl text-coral-100 mb-8">
            Add your women-owned business to our directory and reach customers actively
            searching for businesses like yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-white text-coral-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              List Your Business
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/resources"
              className="border-2 border-white text-white hover:bg-white hover:text-coral-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              More Resources
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
