/**
 * SEO Utility Functions
 * Comprehensive collection of utilities for SEO optimization
 */

import siteData from '@/data/site.json';

/**
 * Generate Open Graph metadata
 */
export function generateOGMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  return {
    openGraph: {
      title: title || siteData.title,
      description: description || siteData.description,
      type,
      url: url || siteData.url,
      images: [
        {
          url: image || siteData.image,
          width: 1200,
          height: 630,
          alt: title || siteData.title,
          type: 'image/jpeg',
        },
      ],
      siteName: siteData.author,
      locale: 'en_IN',
    },
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterMetadata({
  title,
  description,
  image,
  creator = '@vivadbts',
}) {
  return {
    twitter: {
      card: 'summary_large_image',
      title: title || siteData.title,
      description: description || siteData.description,
      images: [image || siteData.image],
      creator,
      site: '@vivadbts',
    },
  };
}

/**
 * Generate structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.author,
    url: siteData.url,
    logo: siteData.logo,
    description: siteData.description,
    sameAs: [
      siteData.social.instagram,
      siteData.social.facebook,
      siteData.social.youtube,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteData.phone,
      contactType: 'Customer Service',
      email: siteData.email,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteData.location.country,
    },
  };
}

/**
 * Generate structured data for LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteData.url,
    name: siteData.author,
    url: siteData.url,
    telephone: siteData.phone,
    email: siteData.email,
    description: siteData.longDescription,
    image: siteData.image,
    priceRange: '₹₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteData.business.rating,
      ratingCount: siteData.business.ratingCount,
    },
    areaServed: siteData.business.serviceArea,
    sameAs: [
      siteData.social.instagram,
      siteData.social.facebook,
      siteData.social.youtube,
    ],
  };
}

/**
 * Generate structured data for Service
 */
export function generateServiceSchema({
  name,
  description,
  url,
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name || 'Wedding Cinematic Video Production',
    description: description || siteData.longDescription,
    serviceType: 'Video Production',
    provider: {
      '@type': 'LocalBusiness',
      name: siteData.author,
      url: url || siteData.url,
    },
    areaServed: {
      '@type': 'City',
      name: siteData.location.country,
    },
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items = []) {
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteData.url,
    },
    ...items,
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };
}

/**
 * Generate Video structured data
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration = 'PT10M',
  contentUrl,
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: name || 'Wedding Cinematic Video',
    description: description || 'Professional wedding videography content',
    thumbnailUrl: thumbnailUrl || siteData.image,
    uploadDate: uploadDate || new Date().toISOString(),
    duration,
    contentUrl,
    creator: {
      '@type': 'Person',
      name: siteData.author,
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question || item.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer || item.description,
      },
    })),
  };
}

/**
 * Generate Product/Package schema
 */
export function generateProductSchema({
  name,
  description,
  price,
  currency = 'INR',
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name || 'Wedding Cinematic Package',
    description: description || 'Premium wedding videography package',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteData.business.rating,
      ratingCount: siteData.business.ratingCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: price || 'Contact for pricing',
    },
  };
}

/**
 * Generate Event schema (for weddings)
 */
export function generateEventSchema({
  name,
  description,
  startDate,
  location,
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: name || 'Wedding Celebration',
    description: description || 'Premium wedding event coverage',
    eventStatus: 'EventScheduled',
    startDate: startDate || new Date().toISOString(),
    location: {
      '@type': 'Place',
      name: location || siteData.location.country,
    },
    organizer: {
      '@type': 'Organization',
      name: siteData.author,
      url: siteData.url,
    },
  };
}

/**
 * Create structured data script tag
 */
export function createStructuredDataScript(schema) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Sanitize URL for meta tags
 */
export function sanitizeUrl(url) {
  if (!url) return siteData.url;
  if (url.startsWith('http')) return url;
  return `${siteData.url}${url}`;
}

/**
 * Generate canonical link
 */
export function generateCanonical(path = '/') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return sanitizeUrl(cleanPath);
}

/**
 * Optimize description for meta tags (max 160 chars)
 */
export function optimizeDescription(description, maxLength = 160) {
  if (!description) return siteData.description;
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength).trim()}...`;
}

/**
 * Generate keywords array for pages
 */
export function generateKeywords(pageKeywords = []) {
  const baseKeywords = siteData.keywords || [];
  return [...new Set([...baseKeywords, ...pageKeywords])];
}

/**
 * Create image metadata for OG tags
 */
export function createImageMetadata({
  url,
  width = 1200,
  height = 630,
  alt = siteData.title,
  type = 'image/jpeg',
} = {}) {
  return {
    url: sanitizeUrl(url || siteData.image),
    width,
    height,
    alt,
    type,
  };
}

export default {
  generateOGMetadata,
  generateTwitterMetadata,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateVideoSchema,
  generateFAQSchema,
  generateProductSchema,
  generateEventSchema,
  createStructuredDataScript,
  sanitizeUrl,
  generateCanonical,
  optimizeDescription,
  generateKeywords,
  createImageMetadata,
};
