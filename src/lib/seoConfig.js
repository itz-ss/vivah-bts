/**
 * SEO Configuration & Best Practices
 * Comprehensive guide for implementing world-class SEO
 */

export const SEO_CONFIG = {
  // Site-wide settings
  siteUrl: 'https://vivadbts.com',
  language: 'en',
  region: 'IN',
  
  // Title & description constraints
  constraints: {
    titleMin: 30,
    titleMax: 60,
    descriptionMin: 120,
    descriptionMax: 160,
    keywordCount: 3,
  },

  // Sitemap configuration
  sitemap: {
    changeFrequencies: {
      homepage: 'weekly',
      portfolio: 'weekly',
      about: 'monthly',
      contact: 'monthly',
      faq: 'monthly',
      blog: 'weekly',
    },
    priorities: {
      homepage: 1.0,
      portfolio: 0.95,
      about: 0.9,
      contact: 0.8,
      faq: 0.7,
      blog: 0.85,
    },
  },

  // Robots.txt settings
  robots: {
    allowedBots: [
      'Googlebot',
      'Bingbot',
      'Slurp',
      'DuckDuckBot',
      'Baiduspider',
      'YandexBot',
      'facebookexternalhit',
      'Twitterbot',
      'LinkedInBot',
      'WhatsApp',
    ],
    blockedBots: [
      'AhrefsBot',
      'SemrushBot',
      'MJ12bot',
      'DotBot',
      'PetalBot',
    ],
    crawlDelay: 1,
    userAgentDelay: {
      Googlebot: 0,
      Bingbot: 1,
    },
  },

  // Image optimization settings
  images: {
    formats: ['avif', 'webp', 'jpeg'],
    sizes: {
      thumbnail: { width: 300, height: 300 },
      medium: { width: 600, height: 600 },
      large: { width: 1200, height: 1200 },
      ogImage: { width: 1200, height: 630 },
      twitterCard: { width: 1200, height: 630 },
    },
    maxFileSize: {
      thumbnail: '50KB',
      medium: '100KB',
      large: '250KB',
      video: '10MB',
    },
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vivah BTS',
  },

  // Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    creator: '@vivadbts',
    site: '@vivadbts',
  },

  // Structured data types
  schema: {
    organization: true,
    localBusiness: true,
    breadcrumb: true,
    faq: true,
    video: true,
    service: true,
    event: true,
  },

  // Core Web Vitals targets
  performance: {
    lcp: '2.5s',      // Largest Contentful Paint
    fid: '100ms',     // First Input Delay  
    cls: '0.1',       // Cumulative Layout Shift
    fcp: '1.8s',      // First Contentful Paint
    ttfb: '0.8s',     // Time to First Byte
  },

  // Canonical URL strategy
  canonical: {
    enforceHttp: false,
    enforceWWW: false,
    enforceTrailingSlash: false,
  },
};

/**
 * Meta tag validation rules
 */
export const META_VALIDATION = {
  title: {
    required: true,
    min: SEO_CONFIG.constraints.titleMin,
    max: SEO_CONFIG.constraints.titleMax,
    pattern: /^.{30,60}$/,
  },
  description: {
    required: true,
    min: SEO_CONFIG.constraints.descriptionMin,
    max: SEO_CONFIG.constraints.descriptionMax,
    pattern: /^.{120,160}$/,
  },
  keywords: {
    required: false,
    maxCount: 10,
  },
  image: {
    required: true,
    formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  canonical: {
    required: true,
    pattern: /^https:\/\//,
  },
};

/**
 * Page-specific SEO templates
 */
export const PAGE_SEO_TEMPLATES = {
  homepage: {
    title: 'Vivah BTS | Luxury Cinematic Wedding Stories',
    description: 'India\'s premium wedding content creators specializing in cinematic reels, behind-the-scenes videos, and real-time edits.',
    keywords: ['wedding videographer', 'cinematic wedding', 'BTS videographer', 'luxury wedding films'],
    priority: 1.0,
    changefreq: 'weekly',
  },
  
  portfolio: {
    title: 'Portfolio | Cinema Wedding Films & Behind-the-Scenes Content',
    description: 'Explore our award-winning wedding cinematic films, real-time edits, and behind-the-scenes content from luxury destinations.',
    keywords: ['wedding portfolio', 'wedding films', 'cinematic videos', 'wedding reel examples'],
    priority: 0.95,
    changefreq: 'weekly',
  },

  about: {
    title: 'About Vivah BTS | Award-Winning Wedding Cinematographers',
    description: 'Meet our passionate team of cinematographers and storytellers. Discover our journey capturing 300+ weddings with cinematic excellence.',
    keywords: ['about vivah bts', 'wedding cinematography team', 'professional videographers'],
    priority: 0.9,
    changefreq: 'monthly',
  },

  contact: {
    title: 'Contact Vivah BTS | Book Your Wedding Cinematography',
    description: 'Get in touch with Vivah BTS to book your cinematic wedding story. Inquire about packages, pricing, and availability.',
    keywords: ['contact vivah bts', 'booking videographer', 'wedding inquiry'],
    priority: 0.8,
    changefreq: 'monthly',
  },

  faq: {
    title: 'FAQ | Vivah BTS Wedding Cinematic Services',
    description: 'Find answers to frequently asked questions about our wedding videography services, packages, and booking process.',
    keywords: ['wedding FAQ', 'videography questions', 'wedding packages'],
    priority: 0.7,
    changefreq: 'monthly',
  },
};

/**
 * SEO guidelines for content creation
 */
export const CONTENT_GUIDELINES = {
  headings: {
    h1: {
      count: 1,
      minWords: 4,
      maxWords: 10,
      description: 'Main page topic - use once per page',
    },
    h2: {
      count: '2-4',
      minWords: 3,
      maxWords: 8,
      description: 'Section headers - support H1',
    },
    h3: {
      count: '3-10',
      minWords: 3,
      maxWords: 8,
      description: 'Sub-section headers',
    },
  },

  content: {
    minWords: {
      homepage: 250,
      aboutPage: 500,
      servicePage: 400,
      blogPost: 1000,
    },
    keywordDensity: '1-2%',
    longTailKeywords: 'Include 5-10 per page',
    internalLinks: 'Link to 3-5 related pages',
    externalLinks: 'Link to 2-3 authoritative sources',
  },

  images: {
    altText: 'Descriptive, 100-125 characters',
    compression: 'Use AVIF/WebP when possible',
    sizes: 'Optimize for responsive design',
    responsive: 'Use srcSet for multiple sizes',
  },

  videos: {
    schema: 'Use VideoObject schema',
    transcript: 'Provide for accessibility',
    captions: 'Add for engagement',
    thumbnail: 'Custom high-quality thumbnail',
  },
};

/**
 * Keyword research framework
 */
export const KEYWORD_FRAMEWORK = {
  categories: {
    primary: 'Main business keyword - 1 per page',
    secondary: 'Related keywords - 2-3 per page',
    longTail: 'Specific, low-competition - 3-5 per page',
    semantic: 'LSI keywords for context',
  },

  targetKeywords: {
    high: 'wedding videographer, wedding cinematography',
    medium: 'cinematic wedding videos, wedding content creator',
    long: 'luxury destination wedding videographer india, cinematic wedding reels',
    local: 'wedding videographer delhi, wedding cinematographer mumbai',
  },

  researchTools: [
    'Google Search Console',
    'Google Trends',
    'SEMrush',
    'Ahrefs',
    'Moz Keyword Explorer',
    'AnswerThePublic',
    'UberSuggest',
  ],
};

/**
 * Link building strategy
 */
export const LINK_BUILDING = {
  internalStrategy: {
    pillarPages: 'Homepage, Portfolio, Services',
    clusterContent: 'Blog posts around main topics',
    breadcrumbs: 'Navigation hierarchy visible',
    contextualLinks: '2-3 links per page naturally',
  },

  externalStrategy: {
    partnershipTarget: 'Wedding planners, venue owners, photographers',
    directorySubmission: 'Wedding industry directories',
    guestPosting: 'Wedding blogs and publications',
    publicRelations: 'Press releases for major updates',
    communityEngagement: 'Wedding forums and Q&A sites',
  },
};

/**
 * Local SEO strategy
 */
export const LOCAL_SEO = {
  googleBusiness: {
    profile: 'Complete and verified',
    categories: 'Video Production Service',
    service_area: 'Pan-India',
    phone: 'Consistent format',
    website: 'Linked to homepage',
  },

  citations: [
    'JustDial',
    'IndiaMART',
    'Yellow Pages India',
    'Local wedding directories',
    'Chamber of commerce listings',
  ],

  reviews: {
    target: '4.8+ rating',
    collectionPlaces: 'Google, Facebook, Instagram, WeddingWire',
    responseTime: 'Within 24 hours',
  },
};

/**
 * Competitive analysis framework
 */
export const COMPETITOR_ANALYSIS = {
  competitors: [
    'Top 5 wedding cinematography studios in India',
    'Top 5 BTS video production services',
  ],

  metrics: [
    'Domain Authority',
    'Backlink profile',
    'Top ranking keywords',
    'Content strategy',
    'Social presence',
    'Review ratings',
    'Services offered',
    'Pricing strategy',
  ],

  advantages: [
    'Luxury focus',
    'Cinematic quality',
    'Real-time editing',
    'Destination weddings',
    'Premium positioning',
  ],
};

/**
 * Analytics & tracking
 */
export const ANALYTICS_SETUP = {
  platforms: {
    googleAnalytics: {
      version: 'GA4',
      propertyId: 'G-XXXXXXXXXX',
      events: [
        'page_view',
        'contact_form_submission',
        'portfolio_click',
        'booking_inquiry',
        'download_brochure',
      ],
    },
    
    searchConsole: {
      verification: 'DNS, HTML file, or meta tag',
      monitor: [
        'Click-through rate',
        'Average position',
        'Search impressions',
        'Mobile usability',
      ],
    },

    bingWebmaster: {
      monitor: [
        'Crawl stats',
        'Keyword stats',
        'Backlinks',
        'Malware warnings',
      ],
    },

    metaBusinessSuite: {
      track: [
        'Link clicks',
        'Page views',
        'Conversions',
        'Form submissions',
      ],
    },
  },

  reportingMetrics: [
    'Organic traffic',
    'Keyword rankings',
    'Conversion rate',
    'Bounce rate',
    'Average session duration',
    'Pages per session',
    'Click-through rate',
    'Backlink growth',
  ],
};

export default SEO_CONFIG;
