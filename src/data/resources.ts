export interface Guide {
  path: string;
  title: string;
  description: string;
  /** ISO dates (YYYY-MM-DD); bump dateModified whenever the guide's copy changes. */
  datePublished: string;
  dateModified: string;
}

export const wbeCertificationGuide: Guide = {
  path: '/resources/wbe-certification-guide',
  title: 'WBE Certification: A Complete Guide for Women Business Owners',
  description:
    'Everything women business owners need to know about WBE certification: what it is, who certifies it, what it costs, the real benefits, and how SIC and NAICS codes fit in.',
  datePublished: '2026-04-29',
  dateModified: '2026-04-29',
};
