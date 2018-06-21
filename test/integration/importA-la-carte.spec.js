import Vue from 'vue'
import VAlert from '../../src/components/VAlert'
import VApp from '../../src/components/VApp'
import VAutocomplete from '../../src/components/VAutocomplete'
import VAvatar from '../../src/components/VAvatar'
import VBadge from '../../src/components/VBadge'
import VBottomNav from '../../src/components/VBottomNav'
import VBottomSheet from '../../src/components/VBottomSheet'
import VBreadcrumbs from '../../src/components/VBreadcrumbs'
import VBtn from '../../src/components/VBtn'
import VBtnToggle from '../../src/components/VBtnToggle'
import VCard from '../../src/components/VCard'
import VCarousel from '../../src/components/VCarousel'
import VCheckbox from '../../src/components/VCheckbox'
import VChip from '../../src/components/VChip'
import VCombobox from '../../src/components/VCombobox'
import VCounter from '../../src/components/VCounter'
import VDataIterator from '../../src/components/VDataIterator'
import VDataTable from '../../src/components/VDataTable'
import VDatePicker from '../../src/components/VDatePicker'
import VDialog from '../../src/components/VDialog'
import VDivider from '../../src/components/VDivider'
import VExpansionPanel from '../../src/components/VExpansionPanel'
import VFooter from '../../src/components/VFooter'
import VForm from '../../src/components/VForm'
import VGrid from '../../src/components/VGrid'
import VIcon from '../../src/components/VIcon'
import VInput from '../../src/components/VInput'
import VJumbotron from '../../src/components/VJumbotron'
import VLabel from '../../src/components/VLabel'
import VList from '../../src/components/VList'
import VMenu from '../../src/components/VMenu'
import VMessages from '../../src/components/VMessages'
import VNavigationDrawer from '../../src/components/VNavigationDrawer'
import VOverflowBtn from '../../src/components/VOverflowBtn'
import VPagination from '../../src/components/VPagination'
import VParallax from '../../src/components/VParallax'
import VPicker from '../../src/components/VPicker'
import VProgressCircular from '../../src/components/VProgressCircular'
import VProgressLinear from '../../src/components/VProgressLinear'
import VRadioGroup from '../../src/components/VRadioGroup'
import VRangeSlider from '../../src/components/VRangeSlider'
import VSelect from '../../src/components/VSelect'
import VSlider from '../../src/components/VSlider'
import VSnackbar from '../../src/components/VSnackbar'
import VSpeedDial from '../../src/components/VSpeedDial'
import VStepper from '../../src/components/VStepper'
import VSubheader from '../../src/components/VSubheader'
import VSwitch from '../../src/components/VSwitch'
import VSystemBar from '../../src/components/VSystemBar'
import VTabs from '../../src/components/VTabs'
import VTextarea from '../../src/components/VTextarea'
import VTextField from '../../src/components/VTextField'
import VTimePicker from '../../src/components/VTimePicker'
import VToolbar from '../../src/components/VToolbar'
import VTooltip from '../../src/components/VTooltip'
import Vuetify from '../../src/components/Vuetify'
import { mount } from 'avoriaz'
import { test } from './describe'
import { kebabSink, pascalSink } from './fixtures/fixtures'

test('a-la-carte import', () => {
  Vue.use(Vuetify, {
    components: {
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
      VIcon,
      VInput,
      VJumbotron,
      VLabel,
      VList,
      VMenu,
      VMessages,
      VNavigationDrawer,
      VOverflowBtn,
      VPagination,
      VParallax,
      VPicker,
      VProgressCircular,
      VProgressLinear,
      VRadioGroup,
      VRangeSlider,
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
      VTimePicker,
      VToolbar,
      VTooltip
    }
  })
  it('should render kebab sink', async () => {
    const { render } = await kebabSink
    const app = Vue.extend({ render })
    mount(app)
  })
  it('should render pascal sink', async () => {
    const { render } = await pascalSink
    const app = Vue.extend({ render })
    mount(app)
  })
})
