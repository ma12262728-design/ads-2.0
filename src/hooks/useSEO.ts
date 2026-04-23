import { useEffect } from 'react';

export function useSEO(
  title: string, 
  description: string, 
  type: string = 'website',
  image: string = 'https://ammardigital.shop/og-image.jpg',
  schema?: Record<string, any>,
  noindex?: boolean
) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);

    // Indexing Control
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow');
    }

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', window.location.href);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
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
      let script = document.querySelector('#schema-org-jsonld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'schema-org-jsonld';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
      const script = document.querySelector('#schema-org-jsonld');
      if (script) script.remove();
    }

  }, [title, description, type, image, schema, noindex]);
}
