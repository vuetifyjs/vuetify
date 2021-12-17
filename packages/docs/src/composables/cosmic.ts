/* eslint-disable camelcase */
import Cosmic from 'cosmicjs'

export const useCosmic = () => {
  const api = Cosmic()
  const read_key = import.meta.env.VITE_COSMIC_BUCKET_READ_KEY as string | undefined
  const slug = import.meta.env.VITE_COSMIC_BUCKET_SLUG as string | undefined

  const bucket = read_key && slug
    ? api.bucket({ slug, read_key })
    : { getObjects: () => Promise.resolve([]) } as never

  return { bucket }
}
