import { useEffect } from 'react';

export function useSEO(
  title: string, 
  description: string, 
  type: string = 'website',
  image: string = 'https://ammardigital.shop/og-image.jpg',
  schema?: Record<string, any>,
  noindex?: boolean,
  keywords?: string,
  author: string = 'Muhammad Ammar Shahid'
) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string | undefined | null) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      
      if (!content) {
        // If we deliberately pass empty/null, we could remove it, but generally we want to keep defaults
        return;
      }
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag('name', 'author', author);

    // Indexing Control
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:site_name', 'Ammar Digital');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@AmmarDigital');
    setMetaTag('name', 'twitter:creator', '@AmmarDigital');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.id = 'canonical-link';
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

    // Schema.org Structured Data
    if (schema) {
      let script = document.querySelector('#dynamic-schema-org-jsonld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'dynamic-schema-org-jsonld';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
      const script = document.querySelector('#dynamic-schema-org-jsonld');
      if (script) script.remove();
    }

  }, [title, description, type, image, schema, noindex, keywords, author]);
}

