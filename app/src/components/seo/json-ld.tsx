/**
 * Renders JSON-LD into the document.
 *
 * The payload always comes from a typed builder in lib/seo/jsonld.ts, generated from
 * application data - never from user input - which is what makes the innerHTML write safe.
 * If a future feature ever renders user-supplied text through here, it must be escaped first.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escaping `<` prevents a `</script>` sequence inside any string value from
        // terminating the tag early.
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
