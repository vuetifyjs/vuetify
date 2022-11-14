// @ts-nocheck
/* eslint-disable camelcase */
// Imports
import Cosmic from 'cosmicjs'

// Types
import type { Bucket } from 'cosmicjs'

export function useCosmic<T> () {
  const api = Cosmic<T>()
  const read_key = import.meta.env.VITE_COSMIC_BUCKET_READ_KEY as string | undefined
  const slug = import.meta.env.VITE_COSMIC_BUCKET_SLUG as string | undefined

  let bucket: Bucket<T> | undefined

  if (read_key && slug) bucket = api.bucket({ slug, read_key })

  return { bucket }
}
