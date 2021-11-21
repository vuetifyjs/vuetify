import AppBtn from '@/components-v3/app/Btn.vue'
import AppTitle from '@/components-v3/app/Title.vue'
import AppHeading from '@/components-v3/app/Heading.vue'
import AppHeadline from '@/components-v3/app/Headline.vue'
import AppLink from '@/components-v3/app/Link.vue'
import AppMarkdown from '@/components-v3/app/Markdown.vue'
import AppMarkup from '@/components-v3/app/Markup.vue'
import AppSheet from '@/components-v3/app/Sheet.vue'
import AppTable from '@/components-v3/app/Table.vue'
import AppCaption from '@/components-v3/app/Caption.vue'
import AppDivider from '@/components-v3/app/Divider.vue'
import Image from '@/components-v3/Image.vue'
import Example from '@/components-v3/example/index.vue'
import Alert from '@/components-v3/Alert.vue'
import ApiLinks from '@/components-v3/api/Links.vue'
import ApiSection from '@/components-v3/api/Section.vue'
import ApiTable from '@/components-v3/api/Table.vue'
import ApiInline from '@/components-v3/api/Inline.vue'
import Backmatter from '@/components-v3/Backmatter.vue'
import InlineAd from '@/components-v3/ads/Inline.vue'
import RandomAd from '@/components-v3/ads/Random.vue'
import EntryAd from '@/components-v3/ads/Entry.vue'
import PromotedAd from '@/components-v3/ads/Promoted.vue'
import VuetifyAd from '@/components-v3/ads/Vuetify.vue'
import CarbonAd from '@/components-v3/ads/Carbon.vue'
import PageComponent from '@/components-v3/PageComponent.vue'

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
  app.component('Image', Image)
  app.component('Example', Example)
  app.component('Alert', Alert)
  app.component('ApiLinks', ApiLinks)
  app.component('ApiSection', ApiSection)
  app.component('ApiTable', ApiTable)
  app.component('ApiInline', ApiInline)
  app.component('Backmatter', Backmatter)
  app.component('InlineAd', InlineAd)
  app.component('RandomAd', RandomAd)
  app.component('CarbonAd', CarbonAd)
  app.component('VuetifyAd', VuetifyAd)
  app.component('PromotedAd', PromotedAd)
  app.component('PageComponent', PageComponent)
  app.component('EntryAd', EntryAd)
}
