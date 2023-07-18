// Imports
import { createBucketClient } from '@cosmicjs/sdk'

export function useCosmic<T> (
  bucketSlug = import.meta.env.VITE_COSMIC_2_BUCKET_SLUG as string | undefined,
  readKey = import.meta.env.VITE_COSMIC_2_BUCKET_READ_KEY as string | undefined,
) {
  return {
    bucket: (readKey && bucketSlug)
      ? createBucketClient({ bucketSlug, readKey })
      : undefined,
  }
}
