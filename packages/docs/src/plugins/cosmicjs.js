/* eslint-disable camelcase */

// Imports
import Cosmic from 'cosmicjs'

const api = Cosmic()
const read_key = process.env.VUE_APP_COSMIC_BUCKET_READ_KEY
const slug = process.env.VUE_APP_COSMIC_BUCKET_SLUG
const bucket = api.bucket({ slug, read_key })

bucket.available = Boolean(slug && read_key)

export default bucket
