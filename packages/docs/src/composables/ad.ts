// Composables
import { useAdsStore } from '@/store/ads'
import { useI18n } from 'vue-i18n'

// Utilities
import { computed } from 'vue'
import { kebabCase } from 'lodash-es'
import { leadingSlash, trailingSlash } from '@/util/routes'

export const createAdProps = () => ({
  medium: {
    type: String,
    default: 'docs',
  },
  slug: String,
  type: String,
  compact: Boolean,
})

export const useAd = (props: { medium: string, slug?: string, type?: string, compact?: boolean }) => {
  const { locale } = useI18n()
  const store = useAdsStore()

  const ads = computed(() => {
    return store.ads.filter(ad => ad.metadata?.discoverable && (props.type ? props.type === kebabCase(ad.metadata.type) : true))
  })

  const ad = computed(() => {
    if (props.slug) return store.ads?.find(ad => ad.slug === props.slug)

    return ads.value[Math.floor(Math.random() * ads.value.length)]
  })

  const href = computed(() => {
    if (!ad.value) return undefined

    const [url, query] = ad.value.metadata!.url.split('?')

    if (!url.startsWith('http')) {
      return leadingSlash(trailingSlash(`${locale.value}${url}`))
    }

    if (query && query.indexOf('utm_source') !== -1) {
      return `${url}?${query}`
    }

    return `${url}?utm_source=vuetifyads&utm_medium=${props.medium}` + (query ? `&${query}` : '')
  })

  const isSponsored = computed(() => {
    return ad.value?.metadata?.sponsored
  })

  const attrs = computed(() => {
    if (!ad.value) return undefined

    return {
      class: 'text-decoration-none',
      href: href.value,
      rel: `noopener${isSponsored.value ? ' sponsored' : ''}`,
      target: '_blank',
    }
  })

  const description = computed(() => {
    return ad.value?.metadata!.description
  })

  const src = computed(() => {
    if (props.compact) return undefined

    return (
      ad.value?.metadata?.images?.logo?.url ||
      ad.value?.metadata?.src
    )
  })

  return { ad, attrs, description, src }
}
