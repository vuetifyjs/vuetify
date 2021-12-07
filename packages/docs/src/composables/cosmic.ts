/* eslint-disable camelcase */
import Cosmic from 'cosmicjs'

export const useCosmic = () => {
  const api = Cosmic()
  let bucket = { getObjects: () => Promise.resolve([]) }
  const read_key = import.meta.env.VITE_COSMIC_BUCKET_READ_KEY
  const slug = import.meta.env.VITE_COSMIC_BUCKET_SLUG

  if (read_key && slug) {
    bucket = api.bucket({ slug, read_key })
  }

  return { bucket }
}
