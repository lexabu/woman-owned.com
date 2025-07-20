'use client';

import Script from 'next/script';

interface AnalyticsProps {
  gaId?: string;
  gtmId?: string;
}

export default function Analytics({ gaId, gtmId }: AnalyticsProps) {
  if (!gaId && !gtmId) return null;

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {gtmId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
    </>
  );
}

// Define gtag function type
interface GtagFunction {
  (command: 'event', eventName: string, parameters?: Record<string, unknown>): void;
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'js', date: Date): void;
}

// Hook for tracking events
export function useAnalytics() {
  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    const windowWithGtag = window as Window & { gtag?: GtagFunction };
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', eventName, parameters);
    }
  };

  const trackBusinessView = (businessName: string, businessSlug: string) => {
    trackEvent('business_view', {
      business_name: businessName,
      business_slug: businessSlug,
      event_category: 'engagement',
    });
  };

  const trackBusinessClick = (businessName: string, businessUrl: string) => {
    trackEvent('business_click', {
      business_name: businessName,
      business_url: businessUrl,
      event_category: 'conversion',
    });
  };

  const trackFormSubmission = (formType: 'contact' | 'business_submission') => {
    trackEvent('form_submission', {
      form_type: formType,
      event_category: 'conversion',
    });
  };

  const trackDirectoryFilter = (filterType: 'city' | 'category', filterValue: string) => {
    trackEvent('directory_filter', {
      filter_type: filterType,
      filter_value: filterValue,
      event_category: 'engagement',
    });
  };

  return {
    trackEvent,
    trackBusinessView,
    trackBusinessClick,
    trackFormSubmission,
    trackDirectoryFilter,
  };
}