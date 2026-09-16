interface Metadata {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

export function genAppMetaInfo (defaults: {
  title: string
  description?: string
  keywords?: string | readonly string[]
  assets?: string[] | readonly string[]
  ogImage?: string
}) {
  const metadata = genMetaInfo(
    defaults.title,
    defaults.description ?? '',
    String(defaults.keywords ?? ''),
    [...(defaults.assets ?? [])],
    defaults.ogImage,
  )

  metadata.link.push(...genLink())

  return metadata
}

export function genMetaInfo (
  title: string,
  description: string,
  keywords: string,
  assets: string[] = [],
  ogImage?: string,
) {
  const length = (description ?? '').length

  description = length <= 117
    ? description
    : `${description.slice(0, 116)}...`

  const options: Metadata = {
    description,
    keywords,
    title,
    ogImage,
  }

  return {
    link: assets.map(href => ({ rel: 'stylesheet', href })),
    meta: [
      { key: 'description', name: 'description', content: description },
      { key: 'keywords', name: 'keywords', content: keywords },
      ...genFacebookMetaInfo(),
      ...genOpenGraphMetaInfo(options),
      ...genTwitterMetaInfo(ogImage),
    ] as (Record<string, any>[]),
    title,
  }
}

function genFacebookMetaInfo () {
  return parseMeta('fb', { app_id: '542948969434243' })
}

function genLink () {
  const rels = ['preconnect', 'dns-prefetch']
  const hrefs = [
    'https://api.cosmicjs.com/',
    'https://cdn.carbonads.com/',
    'https://srv.carbonads.net/',
    'https://www.google-analytics.com/',
  ]
  const link = [
    { rel: 'shortcut icon', href: '/favicon.ico' },
    // { rel: 'manifest', href: '/manifest.json' },
    {
      rel: 'search',
      type: 'application/opensearchdescription+xml',
      href: '/search.xml',
      title: 'Vuetify',
    },
  ]

  for (const rel of rels) {
    for (const href of hrefs) {
      link.push({ rel, href })
    }
  }

  return link
}

function genOpenGraphMetaInfo (args: Metadata) {
  return parseMeta('og', {
    description: args.description,
    image: args.ogImage ?? 'https://cdn.vuetifyjs.com/docs/images/graphics/og-image.png',
    site_name: 'Vuetify',
    title: args.title,
    type: 'website',
  })
}

function parseMeta (
  prefix: string,
  metadata: Record<string, string>,
) {
  const meta = []

  for (const key in metadata) {
    const content = metadata[key]
    const property = `${prefix}:${key}`

    meta.push({
      key: property,
      property,
      content,
    })
  }

  return meta
}

function genTwitterMetaInfo (ogImage?: string) {
  return parseMeta('twitter', {
    image: ogImage ?? 'https://cdn.vuetifyjs.com/docs/images/graphics/og-image.png',
    card: 'summary_large_image',
    domain: 'https://vuetifyjs.com/',
    site: '@vuetifyjs',
  })
}
