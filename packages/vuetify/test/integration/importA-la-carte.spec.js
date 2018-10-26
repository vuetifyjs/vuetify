import Vue from 'vue'
import * as allComponents from '@/components'
import VAlert from '@/components/VAlert'
import VApp from '@/components/VApp'
import VAutocomplete from '@/components/VAutocomplete'
import VAvatar from '@/components/VAvatar'
import VBadge from '@/components/VBadge'
import VBottomNav from '@/components/VBottomNav'
import VBottomSheet from '@/components/VBottomSheet'
import VBreadcrumbs from '@/components/VBreadcrumbs'
import VBtn from '@/components/VBtn'
import VBtnToggle from '@/components/VBtnToggle'
import VCard from '@/components/VCard'
import VCarousel from '@/components/VCarousel'
import VCheckbox from '@/components/VCheckbox'
import VChip from '@/components/VChip'
import VCombobox from '@/components/VCombobox'
import VCounter from '@/components/VCounter'
import VDataIterator from '@/components/VDataIterator'
import VDataTable from '@/components/VDataTable'
import VDatePicker from '@/components/VDatePicker'
import VDialog from '@/components/VDialog'
import VDivider from '@/components/VDivider'
import VExpansionPanel from '@/components/VExpansionPanel'
import VFooter from '@/components/VFooter'
import VForm from '@/components/VForm'
import VGrid from '@/components/VGrid'
import VHover from '@/components/VHover'
import VIcon from '@/components/VIcon'
import VImg from '@/components/VImg'
import VInput from '@/components/VInput'
import VItemGroup from '@/components/VItemGroup'
import VJumbotron from '@/components/VJumbotron'
import VLabel from '@/components/VLabel'
import VList from '@/components/VList'
import VMenu from '@/components/VMenu'
import VMessages from '@/components/VMessages'
import VNavigationDrawer from '@/components/VNavigationDrawer'
import VOverflowBtn from '@/components/VOverflowBtn'
import VPagination from '@/components/VPagination'
import VPaper from '@/components/VPaper'
import VParallax from '@/components/VParallax'
import VPicker from '@/components/VPicker'
import VProgressCircular from '@/components/VProgressCircular'
import VProgressLinear from '@/components/VProgressLinear'
import VRating from '@/components/VRating'
import VRadioGroup from '@/components/VRadioGroup'
import VRangeSlider from '@/components/VRangeSlider'
import VResponsive from '@/components/VResponsive'
import VSelect from '@/components/VSelect'
import VSlider from '@/components/VSlider'
import VSnackbar from '@/components/VSnackbar'
import VSpeedDial from '@/components/VSpeedDial'
import VStepper from '@/components/VStepper'
import VSubheader from '@/components/VSubheader'
import VSwitch from '@/components/VSwitch'
import VSystemBar from '@/components/VSystemBar'
import VTabs from '@/components/VTabs'
import VTextarea from '@/components/VTextarea'
import VTextField from '@/components/VTextField'
import VTimeline from '@/components/VTimeline'
import VTimePicker from '@/components/VTimePicker'
import VToolbar from '@/components/VToolbar'
import VTooltip from '@/components/VTooltip'
import VTreeview from '@/components/VTreeview'
import VWindow from '@/components/VWindow'
import Transitions from '@/components/transitions'
import Vuetify from '@/components/Vuetify'

const components = {
  VAlert,
  VApp,
  VAutocomplete,
  VAvatar,
  VBadge,
  VBottomNav,
  VBottomSheet,
  VBreadcrumbs,
  VBtn,
  VBtnToggle,
  VCard,
  VCarousel,
  VCheckbox,
  VChip,
  VCombobox,
  VCounter,
  VDataIterator,
  VDataTable,
  VDatePicker,
  VDialog,
  VDivider,
  VExpansionPanel,
  VFooter,
  VForm,
  VGrid,
  VHover,
  VIcon,
  VImg,
  VInput,
  VItemGroup,
  VJumbotron,
  VLabel,
  VList,
  VMenu,
  VMessages,
  VNavigationDrawer,
  VOverflowBtn,
  VPagination,
  VPaper,
  VParallax,
  VPicker,
  VProgressCircular,
  VProgressLinear,
  VRating,
  VRadioGroup,
  VRangeSlider,
  VResponsive,
  VSelect,
  VSlider,
  VSnackbar,
  VSpeedDial,
  VStepper,
  VSubheader,
  VSwitch,
  VSystemBar,
  VTabs,
  VTextarea,
  VTextField,
  VTimeline,
  VTimePicker,
  VToolbar,
  VTooltip,
  VTreeview,
  VWindow,
  Transitions
}

delete allComponents.default // TODO: update ts-jest

describe('a-la-carte import - direct', () => {
  Vue.use(Vuetify, {
    components
  })
  const registeredComponents = Object.keys(Vue.options.components).sort()

  // remove vue builtins
  registeredComponents.splice(0, 3)

  it('should register all subcomponents', () => {
    expect(registeredComponents).toMatchSnapshot()
  })

  it('should register all names in PascalCase', () => {
    registeredComponents.forEach(name =>
      expect(name).toMatch(/^(?:[A-Z][a-z]*)+$/)
    )
  })

  it('should check all components', () => {
    expect(registeredComponents).toEqual(Object.keys(allComponents).sort())
  })
})
