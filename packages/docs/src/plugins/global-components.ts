// Components
import AboutTeamMembers from '@/components/about/TeamMembers.vue'
import Alert from '@/components/Alert.vue'
import ApiInline from '@/components/api/Inline.vue'
import ApiSearch from '@/components/api/Search.vue'
import ApiSection from '@/components/api/Section.vue'
import AppDivider from '@/components/app/Divider.vue'
import AppHeading from '@/components/app/Heading.vue'
import AppFigure from '@/components/app/Figure.vue'
import AppMarkup from '@/components/app/Markup.vue'
import AppSettingsAdvancedOptions from '@/components/app/settings/AdvancedOptions.vue'
import AppSettingsOptions from '@/components/app/settings/Options.vue'
import AppSettingsPerksOptions from '@/components/app/settings/PerksOptions.vue'
import AppLink from '@/components/app/Link.vue'
import AppTable from '@/components/app/Table.vue'
import ComponentsListItem from '@/components/components/ListItem.vue'
import DocExplorer from '@/components/doc/Explorer.vue'
import DocIconList from '@/components/doc/IconList.vue'
import DocIconTable from '@/components/doc/IconTable.vue'
import DocTabs from '@/components/doc/Tabs.vue'
import DocVueJobs from '@/components/doc/VueJobs.vue'
import DocMadeWithVueAttribution from '@/components/doc/MadeWithVueAttribution.vue'
import DocMadeWithVuetifyGallery from '@/components/doc/MadeWithVuetifyGallery.vue'
import DocMadeWithVuetifyLink from '@/components/doc/MadeWithVuetifyLink.vue'
import DocPremiumThemesGallery from '@/components/doc/PremiumThemesGallery.vue'
import DocReleases from '@/components/doc/Releases.vue'
import DocThemeVendor from '@/components/doc/ThemeVendor.vue'
import ExamplesExample from '@/components/examples/Example.vue'
import ExamplesUsage from '@/components/examples/Usage.vue'
import FeaturesBreakpointsTable from '@/components/features/BreakpointsTable.vue'
import FeaturesColorPalette from '@/components/features/ColorPalette.vue'
import FeaturesSassApi from '@/components/features/SassApi.vue'
import GettingStartedWireframeExamples from '@/components/getting-started/WireframeExamples.vue'
import HomeEntry from '@/components/home/Entry.vue'
import HomeFeatures from '@/components/home/Features.vue'
import HomeSpecialSponsor from '@/components/home/SpecialSponsor.vue'
import HomeSponsors from '@/components/home/Sponsors.vue'
import IntroductionDiscordDeck from '@/components/introduction/DiscordDeck.vue'
import IntroductionEnterpriseDeck from '@/components/introduction/EnterpriseDeck.vue'
import PageFeatures from '@/components/PageFeatures.vue'
import PromotedEntry from '@/components/promoted/Entry.vue'
import PromotedPromoted from '@/components/promoted/Promoted.vue'
import PromotedRandom from '@/components/promoted/Random.vue'
import ResourcesColorPalette from '@/components/resources/ColorPalette.vue'
import ResourcesLogos from '@/components/resources/Logos.vue'
import SponserSponsors from '@/components/sponsor/Sponsors.vue'

// Types
import type { App } from 'vue'

export function installGlobalComponents (app: App) {
  app
    // Used by markdown-it to gen api pages, and needed to be globally loaded to work
    .component('AboutTeamMembers', AboutTeamMembers)
    .component('Alert', Alert)
    .component('ApiInline', ApiInline)
    .component('ApiSearch', ApiSearch)
    .component('ApiSection', ApiSection)
    .component('AppDivider', AppDivider)
    .component('AppFigure', AppFigure)
    .component('AppHeading', AppHeading)
    .component('AppLink', AppLink)
    .component('AppMarkup', AppMarkup)
    .component('AppTable', AppTable)
    .component('AppSettingsAdvancedOptions', AppSettingsAdvancedOptions)
    .component('AppSettingsOptions', AppSettingsOptions)
    .component('AppSettingsPerksOptions', AppSettingsPerksOptions)
    .component('ComponentsListItem', ComponentsListItem)
    .component('DocExplorer', DocExplorer)
    .component('DocIconList', DocIconList)
    .component('DocIconTable', DocIconTable)
    .component('DocTabs', DocTabs)
    .component('DocVueJobs', DocVueJobs)
    .component('DocMadeWithVueAttribution', DocMadeWithVueAttribution)
    .component('DocMadeWithVuetifyGallery', DocMadeWithVuetifyGallery)
    .component('DocMadeWithVuetifyLink', DocMadeWithVuetifyLink)
    .component('DocPremiumThemesGallery', DocPremiumThemesGallery)
    .component('DocReleases', DocReleases)
    .component('DocThemeVendor', DocThemeVendor)
    .component('ExamplesExample', ExamplesExample)
    .component('ExamplesUsage', ExamplesUsage)
    .component('FeaturesBreakpointsTable', FeaturesBreakpointsTable)
    .component('FeaturesColorPalette', FeaturesColorPalette)
    .component('FeaturesSassApi', FeaturesSassApi)
    .component('GettingStartedWireframeExamples', GettingStartedWireframeExamples)
    .component('HomeEntry', HomeEntry)
    .component('HomeFeatures', HomeFeatures)
    .component('HomeSpecialSponsor', HomeSpecialSponsor)
    .component('HomeSponsors', HomeSponsors)
    .component('IntroductionDiscordDeck', IntroductionDiscordDeck)
    .component('IntroductionEnterpriseDeck', IntroductionEnterpriseDeck)
    .component('PageFeatures', PageFeatures)
    .component('PromotedEntry', PromotedEntry)
    .component('PromotedPromoted', PromotedPromoted)
    .component('PromotedRandom', PromotedRandom)
    .component('ResourcesColorPalette', ResourcesColorPalette)
    .component('ResourcesLogos', ResourcesLogos)
    .component('SponserSponsors', SponserSponsors)
    .component('UnwrapMarkdown', (props, { slots }) => slots.default?.()?.[0].children)
}
