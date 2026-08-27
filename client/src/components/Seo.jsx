import { Helmet } from 'react-helmet-async';

/**
 * Drop this into any page to set that page's title, meta description,
 * canonical URL, Open Graph / Twitter Card tags, and optional JSON-LD
 * structured data — all in one place so no page ships without basic SEO.
 *
 * @param {string} title - Page-specific title. "Shalom Technologies" is appended automatically.
 * @param {string} description - 1-2 sentence meta description (aim for ~150-160 characters).
 * @param {string} [path] - Path for canonical URL, e.g. "/" or "/pricing".
 * @param {object} [structuredData] - Optional JSON-LD object to embed.
 */
function Seo({ title, description, path = '/', structuredData, noIndex = false }) {
  const siteUrl = 'https://www.shalomtechnologies.com'; // update once the real domain is live
  const fullTitle = `${title} | Shalom Technologies`;
  const canonicalUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Shalom Technologies" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

export default Seo;