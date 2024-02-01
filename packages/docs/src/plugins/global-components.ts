// Components
import ApiSearch from '@/components/api/Search.vue'
import ApiSection from '@/components/api/Section.vue'
import AppHeading from '@/components/app/Heading.vue'
import AppLink from '@/components/app/Link.vue'
import PromotedEntry from '@/components/promoted/Entry.vue'
import PageFeatures from '@/components/PageFeatures.vue'
import SponserSponsors from '@/components/sponsor/Sponsors.vue'

// Types
import type { App } from 'vue'

export function installGlobalComponents (app: App) {
  app
    // Used by markdown-it to gen api pages, and needed to be globally loaded to work
    .component('ApiSearch', ApiSearch)
    .component('ApiSection', ApiSection)
    .component('AppHeading', AppHeading)
    .component('AppLink', AppLink)
    .component('PromotedEntry', PromotedEntry)
    .component('PageFeatures', PageFeatures)
    .component('SponserSponsors', SponserSponsors)
    .component('UnwrapMarkdown', (props, { slots }) => slots.default?.()?.[0].children)
}
