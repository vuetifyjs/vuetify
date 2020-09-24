export function genTwitterMetaInfo () {
  return parseMetaData('twitter', {
    domain: 'https://vuetifyjs.com/',
    site: 'vuetifyjs',
  })
}

export function genOpenGraphMetaInfo (args) {
  return parseMetaData('og', {
    description: args.description,
    site_name: 'Vuetify',
    title: args.title,
  })
}

export function parseMetaData (
  prefix,
  metadata,
) {
  const meta = []

  for (const key in metadata) {
    const content = metadata[key]

    meta.push({
      content,
      property: `${prefix}:${key}`,
    })
  }

  return meta
}

export function genMetaData (
  title,
  description,
  keywords,
) {
  const length = description.length

  description = length <= 117
    ? description
    : `${description.slice(0, 116)}...`

  const options = {
    description,
    keywords,
    title,
  }

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      ...genOpenGraphMetaInfo(options),
      ...genTwitterMetaInfo(options),
    ],
  }
}
