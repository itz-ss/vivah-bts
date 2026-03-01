/**
 * SEO Hooks - Reusable React hooks for SEO functionality
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import siteData from '@/data/site.json';

/**
 * Hook to dynamically update meta tags
 */
export function useSEOMeta({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
} = {}) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords.length > 0) {
      metaKeywords.setAttribute('content', keywords.join(', '));
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && url) {
      canonical.setAttribute('href', url);
    }

    // Update OG tags
    const updateOGTag = (property, content) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    if (title) updateOGTag('og:title', title);
    if (description) updateOGTag('og:description', description);
    if (image) updateOGTag('og:image', image);
    if (url) updateOGTag('og:url', url);
    if (type) updateOGTag('og:type', type);

  }, [title, description, keywords, image, url, type]);

  return {
    currentPath: pathname,
  };
}

/**
 * Hook for managing breadcrumb navigation (SEO + UX)
 */
export function useBreadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  return {
    breadcrumbs: generateBreadcrumbs(),
    pathname,
  };
}

/**
 * Hook to track page views and events for analytics
 */
export function useSEOAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view (if using Google Analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  const trackEvent = (eventName, eventData = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  };

  const trackConversion = (conversionName, conversionValue = 0) => {
    trackEvent('conversion', {
      conversion_name: conversionName,
      conversion_value: conversionValue,
    });
  };

  return {
    trackEvent,
    trackConversion,
    currentPath: pathname,
  };
}

/**
 * Hook for image optimization & lazy loading
 */
export function useLazyImage(imageRef) {
  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [imageRef]);
}

/**
 * Hook to generate and manage structured data
 */
export function useStructuredData(schema) {
  useEffect(() => {
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);
}

/**
 * Hook for tracking search visibility metrics
 */
export function useSEOMetrics() {
  const trackKeywordRanking = (keyword, position) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'keyword_ranking', {
        keyword,
        position,
      });
    }
  };

  const trackPageMetrics = (metrics = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_metrics', metrics);
    }
  };

  return {
    trackKeywordRanking,
    trackPageMetrics,
  };
}

/**
 * Hook for social sharing optimization
 */
export function useSocialShare() {
  const pathname = usePathname();

  const generateShareUrls = (title, description, image) => {
    const url = `${siteData.url}${pathname}`;
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n${url}`)}`,
    };
  };

  const shareOnPlatform = (platform, title, description, image) => {
    const shareUrls = generateShareUrls(title, description, image);
    const url = shareUrls[platform];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return {
    generateShareUrls,
    shareOnPlatform,
  };
}

/**
 * Hook to monitor and optimize Core Web Vitals
 */
export function useWebVitals() {
  useEffect(() => {
    const handleWebVitals = (metric) => {
      // Log or send to analytics
      const vitals = {
        'LCP': metric.value < 2500 ? 'good' : 'needs_improvement',
        'FID': metric.value < 100 ? 'good' : 'needs_improvement',
        'CLS': metric.value < 0.1 ? 'good' : 'needs_improvement',
      };

      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          metric: metric.name,
          value: Math.round(metric.value),
          event_category: 'performance',
        });
      }
    };

    // If using web-vitals npm package
    try {
      import('web-vitals').then(({ onLCP, onFID, onCLS }) => {
        onLCP(handleWebVitals);
        onFID(handleWebVitals);
        onCLS(handleWebVitals);
      });
    } catch (e) {
      console.log('web-vitals not installed');
    }
  }, []);
}

/**
 * Hook for scroll tracking (engagement metric)
 */
export function useScrollTracking() {
  useEffect(() => {
    let scrollDepth = 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const depth = Math.round((currentScroll / maxScroll) * 100);

      if (depth > scrollDepth && depth % 25 === 0) {
        scrollDepth = depth;
        
        if (window.gtag) {
          window.gtag('event', 'scroll_depth', {
            scroll_depth: depth,
            page_path: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Hook for time on page tracking
 */
export function useTimeOnPage() {
  useEffect(() => {
    const startTime = Date.now();
    const pathname = window.location.pathname;

    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (window.gtag && timeSpent > 5) {
        window.gtag('event', 'time_on_page', {
          time_seconds: timeSpent,
          page_path: pathname,
        });
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);
}

export default {
  useSEOMeta,
  useBreadcrumbs,
  useSEOAnalytics,
  useLazyImage,
  useStructuredData,
  useSEOMetrics,
  useSocialShare,
  useWebVitals,
  useScrollTracking,
  useTimeOnPage,
};
