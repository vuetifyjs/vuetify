import Cosmic from 'cosmicjs'

export const useCosmic = () => {
  const api = Cosmic()
  // eslint-disable-next-line camelcase
  const read_key = import.meta.env.VITE_COSMIC_BUCKET_READ_KEY
  const slug = import.meta.env.VITE_COSMIC_BUCKET_SLUG
  const bucket = api.bucket({ slug, read_key })

  return { bucket }
}
