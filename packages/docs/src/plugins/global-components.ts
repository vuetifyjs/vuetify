import AppBtn from '@/components/app/Btn.vue'
import AppTitle from '@/components/app/Title.vue'
import AppHeading from '@/components/app/Heading.vue'
import AppHeadline from '@/components/app/Headline.vue'
import AppLink from '@/components/app/Link.vue'
import AppMarkdown from '@/components/app/Markdown.vue'
import AppMarkup from '@/components/app/Markup.vue'
import AppSheet from '@/components/app/Sheet.vue'
import AppTable from '@/components/app/Table.vue'
import AppCaption from '@/components/app/Caption.vue'
import AppDivider from '@/components/app/Divider.vue'
import AppImg from '@/components/app/Img.vue'
import Alert from '@/components/Alert.vue'
import ApiLinks from '@/components/api/Links.vue'
import ApiSection from '@/components/api/Section.vue'
import ApiTable from '@/components/api/Table.vue'
import ApiInline from '@/components/api/Inline.vue'
import Backmatter from '@/components/Backmatter.vue'
import InlineAd from '@/components/ads/Inline.vue'
import DiscoveryAd from '@/components/ads/Discovery.vue'
import RandomAd from '@/components/ads/Random.vue'
import EntryAd from '@/components/ads/Entry.vue'
import PromotedAd from '@/components/ads/Promoted.vue'
import VuetifyAd from '@/components/ads/Vuetify.vue'
import CarbonAd from '@/components/ads/Carbon.vue'
import PageComponent from '@/components/PageComponent.vue'
import Example from '@/components/examples/Example.vue'
import Usage from '@/components/examples/Usage.vue'

import type { GlobalComponentsPlugin } from '@/types'

export const useGlobalComponents: GlobalComponentsPlugin = ({ app }) => {
  app.component('AppBtn', AppBtn)
  app.component('AppTitle', AppTitle)
  app.component('AppHeading', AppHeading)
  app.component('AppHeadline', AppHeadline)
  app.component('AppLink', AppLink)
  app.component('AppMarkdown', AppMarkdown)
  app.component('AppMarkup', AppMarkup)
  app.component('AppSheet', AppSheet)
  app.component('AppTable', AppTable)
  app.component('AppCaption', AppCaption)
  app.component('AppDivider', AppDivider)

  // Used by markdown files
  app.component('AppImg', AppImg)
  app.component('Alert', Alert)
  app.component('ApiLinks', ApiLinks)
  app.component('ApiSection', ApiSection)
  app.component('ApiTable', ApiTable)
  app.component('ApiInline', ApiInline)
  app.component('Backmatter', Backmatter)
  app.component('InlineAd', InlineAd)
  app.component('DiscoveryAd', DiscoveryAd)
  app.component('RandomAd', RandomAd)
  app.component('CarbonAd', CarbonAd)
  app.component('VuetifyAd', VuetifyAd)
  app.component('PromotedAd', PromotedAd)
  app.component('PageComponent', PageComponent)
  app.component('EntryAd', EntryAd)
  app.component('Example', Example)
  app.component('Usage', Usage)
}
