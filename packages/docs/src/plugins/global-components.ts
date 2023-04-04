// Components
import Alert from '@/components/Alert.vue'
import ApiInline from '@/components/api/Inline.vue'
import ApiLinks from '@/components/api/Links.vue'
import ApiSection from '@/components/api/Section.vue'
import AppBtn from '@/components/app/Btn.vue'
import AppCaption from '@/components/app/Caption.vue'
import AppDivider from '@/components/app/Divider.vue'
import AppFigure from '@/components/app/Figure.vue'
import AppHeading from '@/components/app/Heading.vue'
import AppHeadline from '@/components/app/Headline.vue'
import AppLink from '@/components/app/Link.vue'
import AppMarkdown from '@/components/app/Markdown.vue'
import AppMenu from '@/components/app/menu/Menu.vue'
import AppMarkup from '@/components/app/Markup.vue'
import AppSheet from '@/components/app/Sheet.vue'
import AppTable from '@/components/app/Table.vue'
import AppTextField from '@/components/app/TextField.vue'
import AppTitle from '@/components/app/Title.vue'
import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
import Backmatter from '@/components/Backmatter.vue'
import BreakpointsTable from '@/components/features/BreakpointsTable.vue'
import Carbon from '@/components/promoted/Carbon.vue'
import ColorPalette from '@/components/features/ColorPalette.vue'
import Discovery from '@/components/promoted/Discovery.vue'
import Entry from '@/components/promoted/Entry.vue'
import Example from '@/components/examples/Example.vue'
import Inline from '@/components/promoted/Inline.vue'
import Promoted from '@/components/promoted/Promoted.vue'
import Random from '@/components/promoted/Random.vue'
import Sponsors from '@/components//sponsor/Sponsors.vue'
import TeamMembers from '@/components//about/TeamMembers.vue'
import Usage from '@/components/examples/Usage.vue'
import UsageExample from '@/components/examples/UsageExample.vue'
import VueFile from '@/components/examples/VueFile.vue'
import Vuetify from '@/components/promoted/Vuetify.vue'

// Types
import type { GlobalComponentsPlugin } from '@/types'

export const useGlobalComponents: GlobalComponentsPlugin = ({ app }) => {
  app
    .component('AppBtn', AppBtn)
    .component('AppCaption', AppCaption)
    .component('AppDivider', AppDivider)
    .component('AppHeading', AppHeading)
    .component('AppHeadline', AppHeadline)
    .component('AppLink', AppLink)
    .component('AppMarkdown', AppMarkdown)
    .component('AppMarkup', AppMarkup)
    .component('AppMenu', AppMenu)
    .component('AppSheet', AppSheet)
    .component('AppTable', AppTable)
    .component('AppTextField', AppTextField)
    .component('AppTitle', AppTitle)
    .component('AppTooltipBtn', AppTooltipBtn)
    .component('UnwrapMarkdown', (props, { slots }) => slots.default?.()?.[0].children)

    // Used by markdown files
    .component('Alert', Alert)
    .component('AppFigure', AppFigure)
    .component('ApiInline', ApiInline)
    .component('ApiLinks', ApiLinks)
    .component('ApiSection', ApiSection)
    .component('Backmatter', Backmatter)
    .component('BreakpointsTable', BreakpointsTable)
    .component('ColorPalette', ColorPalette)
    .component('Carbon', Carbon)
    .component('Discovery', Discovery)
    .component('Entry', Entry)
    .component('Example', Example)
    .component('Inline', Inline)
    .component('Promoted', Promoted)
    .component('Random', Random)
    .component('Sponsors', Sponsors)
    .component('TeamMembers', TeamMembers)
    .component('Usage', Usage)
    .component('UsageExample', UsageExample)
    .component('VueFile', VueFile)
    .component('Vuetify', Vuetify)
}
