// Define gtag function type
interface GtagFunction {
  (command: 'event', eventName: string, parameters?: Record<string, unknown>): void;
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'js', date: Date): void;
}

// Web Vitals and Performance Monitoring
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fcp?: number; // First Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
  pageLoadTime?: number;
  timestamp: number;
  url: string;
  userAgent: string;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Web Vitals monitoring
    this.observeLCP();
    this.observeFCP();
    this.observeCLS();
    this.observeFID();
    this.observeTTFB();
    
    // Page load monitoring
    this.monitorPageLoad();
    
    // Send metrics on page unload
    this.setupReporting();
  }

  private observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    }
  }

  private observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
        }
      });
      
      observer.observe({ type: 'paint', buffered: true });
    }
  }

  private observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        this.metrics.cls = clsValue;
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
    }
  }

  private observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fidEntry = entries[0] as PerformanceEntry & { processingStart: number };
        if (fidEntry) {
          this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
        }
      });
      
      observer.observe({ type: 'first-input', buffered: true });
    }
  }

  private observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navEntry = entries[0] as PerformanceNavigationTiming;
        if (navEntry) {
          this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
        }
      });
      
      observer.observe({ type: 'navigation', buffered: true });
    }
  }

  private monitorPageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        this.metrics.pageLoadTime = loadTime;
      });
    }
  }

  private setupReporting() {
    if (typeof window !== 'undefined') {
      // Send metrics before page unload
      window.addEventListener('beforeunload', () => {
        this.sendMetrics();
      });

      // Also send after 5 seconds for SPAs
      setTimeout(() => {
        this.sendMetrics();
      }, 5000);
    }
  }

  private sendMetrics() {
    // Only send if we have some meaningful data
    if (this.metrics.lcp || this.metrics.fcp || this.metrics.pageLoadTime) {
      this.reportMetrics(this.metrics);
    }
  }

  private reportMetrics(metrics: PerformanceMetrics) {
    // In a real app, send to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);
    }

    // Example: Send to Google Analytics
    const windowWithGtag = window as Window & { gtag?: GtagFunction };
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      if (metrics.lcp) {
        windowWithGtag.gtag('event', 'timing_complete', {
          name: 'LCP',
          value: Math.round(metrics.lcp),
        });
      }
      
      if (metrics.fcp) {
        windowWithGtag.gtag('event', 'timing_complete', {
          name: 'FCP',
          value: Math.round(metrics.fcp),
        });
      }
      
      if (metrics.cls !== undefined) {
        windowWithGtag.gtag('event', 'timing_complete', {
          name: 'CLS',
          value: Math.round(metrics.cls * 1000), // Convert to avoid decimals
        });
      }
    }

    // Example: Send to your custom endpoint
    if (typeof fetch !== 'undefined' && process.env.NODE_ENV === 'production') {
      fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics),
      }).catch(() => {
        // Silently fail - don't impact user experience
      });
    }
  }

  // Public method to get current metrics
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Public method to manually report specific events
  public reportCustomEvent(eventName: string, value: number, category = 'performance') {
    const windowWithGtag = window as Window & { gtag?: GtagFunction };
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', eventName, {
        event_category: category,
        value: Math.round(value),
      });
    }
  }
}

// Hook for using performance monitoring in React components
export function usePerformanceMonitor() {
  if (typeof window === 'undefined') {
    return null;
  }

  // Singleton pattern to ensure only one monitor instance
  const windowWithMonitor = window as Window & { __performanceMonitor?: PerformanceMonitor };
  if (!windowWithMonitor.__performanceMonitor) {
    windowWithMonitor.__performanceMonitor = new PerformanceMonitor();
  }

  return windowWithMonitor.__performanceMonitor;
}

// Utility function to measure component render time
export function measureRenderTime(componentName: string) {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    const duration = end - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
    }
    
    // Report to analytics if over threshold
    if (duration > 100) { // 100ms threshold
      const windowWithGtag = window as Window & { gtag?: GtagFunction };
      if (typeof window !== 'undefined' && windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'slow_component_render', {
          component_name: componentName,
          render_time: Math.round(duration),
          event_category: 'performance',
        });
      }
    }
  };
}

// Utility to track business page views and performance
export function trackBusinessPagePerformance(businessName: string, businessSlug: string) {
  const startTime = performance.now();
  
  return {
    end: () => {
      const loadTime = performance.now() - startTime;
      
      const windowWithGtag = window as Window & { gtag?: GtagFunction };
      if (typeof window !== 'undefined' && windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'business_page_load', {
          business_name: businessName,
          business_slug: businessSlug,
          load_time: Math.round(loadTime),
          event_category: 'performance',
        });
      }
    }
  };
}