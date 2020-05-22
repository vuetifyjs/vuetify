// Imports
import Cosmic from 'cosmicjs'

const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.VUE_APP_COSMIC_BUCKET_SLUG,
  read_key: process.env.VUE_APP_COSMIC_BUCKET_READ_KEY,
})

export default bucket
