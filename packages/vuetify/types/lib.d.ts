declare module 'vuetify/lib' {
  import Vuetify from 'vuetify'
  import { Colors } from 'vuetify/lib/util/colors'

  export default Vuetify

  const colors: Colors

  export {
    colors,
  }
  export * from 'vuetify/lib/components'
  export * from 'vuetify/lib/directives'
}

declare module 'vuetify/lib/components' {
  import { VueConstructor } from 'vue'

  const VApp: VueConstructor
  const VAppBar: VueConstructor
  const VAppBarNavIcon: VueConstructor
  const VAppBarTitle: VueConstructor
  const VAlert: VueConstructor
  const VAutocomplete: VueConstructor
  const VAvatar: VueConstructor
  const VBadge: VueConstructor
  const VBanner: VueConstructor
  const VBottomNavigation: VueConstructor
  const VBottomSheet: VueConstructor
  const VBreadcrumbs: VueConstructor
  const VBreadcrumbsItem: VueConstructor
  const VBreadcrumbsDivider: VueConstructor
  const VBtn: VueConstructor
  const VBtnToggle: VueConstructor
  const VCalendar: VueConstructor
  const VCalendarCategory: VueConstructor
  const VCalendarDaily: VueConstructor
  const VCalendarWeekly: VueConstructor
  const VCalendarMonthly: VueConstructor
  const VCard: VueConstructor
  const VCardTitle: VueConstructor
  const VCardSubtitle: VueConstructor
  const VCardActions: VueConstructor
  const VCardText: VueConstructor
  const VCarousel: VueConstructor
  const VCarouselItem: VueConstructor
  const VCheckbox: VueConstructor
  const VSimpleCheckbox: VueConstructor
  const VChip: VueConstructor
  const VChipGroup: VueConstructor
  const VColorPicker: VueConstructor
  const VColorPickerSwatches: VueConstructor
  const VColorPickerCanvas: VueConstructor
  const VContent: VueConstructor
  const VCombobox: VueConstructor
  const VCounter: VueConstructor
  const VData: VueConstructor
  const VDataIterator: VueConstructor
  const VDataFooter: VueConstructor
  const VDataTable: VueConstructor
  const VEditDialog: VueConstructor
  const VTableOverflow: VueConstructor
  const VDataTableHeader: VueConstructor
  const VSimpleTable: VueConstructor
  const VVirtualTable: VueConstructor
  const VVirtualScroll: VueConstructor
  const VDatePicker: VueConstructor
  const VDatePickerTitle: VueConstructor
  const VDatePickerHeader: VueConstructor
  const VDatePickerDateTable: VueConstructor
  const VDatePickerMonthTable: VueConstructor
  const VDatePickerYears: VueConstructor
  const VDialog: VueConstructor
  const VDivider: VueConstructor
  const VExpansionPanels: VueConstructor
  const VExpansionPanel: VueConstructor
  const VExpansionPanelHeader: VueConstructor
  const VExpansionPanelContent: VueConstructor
  const VFileInput: VueConstructor
  const VFooter: VueConstructor
  const VForm: VueConstructor
  const VContainer: VueConstructor
  const VCol: VueConstructor
  const VRow: VueConstructor
  const VSpacer: VueConstructor
  const VLayout: VueConstructor
  const VFlex: VueConstructor
  const VHover: VueConstructor
  const VIcon: VueConstructor
  const VImg: VueConstructor
  const VInput: VueConstructor
  const VItem: VueConstructor
  const VItemGroup: VueConstructor
  const VLabel: VueConstructor
  const VLazy: VueConstructor
  const VListItemActionText: VueConstructor
  const VListItemContent: VueConstructor
  const VListItemTitle: VueConstructor
  const VListItemSubtitle: VueConstructor
  const VList: VueConstructor
  const VListGroup: VueConstructor
  const VListItem: VueConstructor
  const VListItemAction: VueConstructor
  const VListItemAvatar: VueConstructor
  const VListItemIcon: VueConstructor
  const VListItemGroup: VueConstructor
  const VMain: VueConstructor
  const VMenu: VueConstructor
  const VMessages: VueConstructor
  const VNavigationDrawer: VueConstructor
  const VOverflowBtn: VueConstructor
  const VOverlay: VueConstructor
  const VOtpInput: VueConstructor
  const VPagination: VueConstructor
  const VSheet: VueConstructor
  const VParallax: VueConstructor
  const VPicker: VueConstructor
  const VProgressCircular: VueConstructor
  const VProgressLinear: VueConstructor
  const VRadioGroup: VueConstructor
  const VRadio: VueConstructor
  const VRangeSlider: VueConstructor
  const VRating: VueConstructor
  const VResponsive: VueConstructor
  const VSelect: VueConstructor
  const VSkeletonLoader: VueConstructor
  const VSlider: VueConstructor
  const VSlideGroup: VueConstructor
  const VSlideItem: VueConstructor
  const VSnackbar: VueConstructor
  const VSparkline: VueConstructor
  const VSpeedDial: VueConstructor
  const VStepper: VueConstructor
  const VStepperContent: VueConstructor
  const VStepperStep: VueConstructor
  const VStepperHeader: VueConstructor
  const VStepperItems: VueConstructor
  const VSubheader: VueConstructor
  const VSwitch: VueConstructor
  const VSystemBar: VueConstructor
  const VTabs: VueConstructor
  const VTab: VueConstructor
  const VTabItem: VueConstructor
  const VTabsItems: VueConstructor
  const VTabsSlider: VueConstructor
  const VTextarea: VueConstructor
  const VTextField: VueConstructor
  const VThemeProvider: VueConstructor
  const VTimeline: VueConstructor
  const VTimelineItem: VueConstructor
  const VTimePicker: VueConstructor
  const VTimePickerClock: VueConstructor
  const VTimePickerTitle: VueConstructor
  const VToolbar: VueConstructor
  const VToolbarItems: VueConstructor
  const VToolbarTitle: VueConstructor
  const VTooltip: VueConstructor
  const VTreeview: VueConstructor
  const VTreeviewNode: VueConstructor
  const VWindow: VueConstructor
  const VWindowItem: VueConstructor
  const VCarouselTransition: VueConstructor
  const VCarouselReverseTransition: VueConstructor
  const VTabTransition: VueConstructor
  const VTabReverseTransition: VueConstructor
  const VMenuTransition: VueConstructor
  const VFabTransition: VueConstructor
  const VDialogTransition: VueConstructor
  const VDialogBottomTransition: VueConstructor
  const VDialogTopTransition: VueConstructor
  const VFadeTransition: VueConstructor
  const VScaleTransition: VueConstructor
  const VScrollXTransition: VueConstructor
  const VScrollXReverseTransition: VueConstructor
  const VScrollYTransition: VueConstructor
  const VScrollYReverseTransition: VueConstructor
  const VSlideXTransition: VueConstructor
  const VSlideXReverseTransition: VueConstructor
  const VSlideYTransition: VueConstructor
  const VSlideYReverseTransition: VueConstructor
  const VExpandTransition: VueConstructor
  const VExpandXTransition: VueConstructor

  export {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VAppBarTitle,
    VAlert,
    VAutocomplete,
    VAvatar,
    VBadge,
    VBanner,
    VBottomNavigation,
    VBottomSheet,
    VBreadcrumbs,
    VBreadcrumbsItem,
    VBreadcrumbsDivider,
    VBtn,
    VBtnToggle,
    VCalendar,
    VCalendarCategory,
    VCalendarDaily,
    VCalendarWeekly,
    VCalendarMonthly,
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardActions,
    VCardText,
    VCarousel,
    VCarouselItem,
    VCheckbox,
    VSimpleCheckbox,
    VChip,
    VChipGroup,
    VColorPicker,
    VColorPickerSwatches,
    VColorPickerCanvas,
    VContent,
    VCombobox,
    VCounter,
    VData,
    VDataIterator,
    VDataFooter,
    VDataTable,
    VEditDialog,
    VTableOverflow,
    VDataTableHeader,
    VSimpleTable,
    VVirtualTable,
    VVirtualScroll,
    VDatePicker,
    VDatePickerTitle,
    VDatePickerHeader,
    VDatePickerDateTable,
    VDatePickerMonthTable,
    VDatePickerYears,
    VDialog,
    VDivider,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VFileInput,
    VFooter,
    VForm,
    VContainer,
    VCol,
    VRow,
    VSpacer,
    VLayout,
    VFlex,
    VHover,
    VIcon,
    VImg,
    VInput,
    VItem,
    VItemGroup,
    VLabel,
    VLazy,
    VListItemActionText,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VList,
    VListGroup,
    VListItem,
    VListItemAction,
    VListItemAvatar,
    VListItemIcon,
    VListItemGroup,
    VMain,
    VMenu,
    VMessages,
    VNavigationDrawer,
    VOverflowBtn,
    VOverlay,
    VOtpInput,
    VPagination,
    VSheet,
    VParallax,
    VPicker,
    VProgressCircular,
    VProgressLinear,
    VRadioGroup,
    VRadio,
    VRangeSlider,
    VRating,
    VResponsive,
    VSelect,
    VSkeletonLoader,
    VSlider,
    VSlideGroup,
    VSlideItem,
    VSnackbar,
    VSparkline,
    VSpeedDial,
    VStepper,
    VStepperContent,
    VStepperStep,
    VStepperHeader,
    VStepperItems,
    VSubheader,
    VSwitch,
    VSystemBar,
    VTabs,
    VTab,
    VTabItem,
    VTabsItems,
    VTabsSlider,
    VTextarea,
    VTextField,
    VThemeProvider,
    VTimeline,
    VTimelineItem,
    VTimePicker,
    VTimePickerClock,
    VTimePickerTitle,
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VTooltip,
    VTreeview,
    VTreeviewNode,
    VWindow,
    VWindowItem,
    VCarouselTransition,
    VCarouselReverseTransition,
    VTabTransition,
    VTabReverseTransition,
    VMenuTransition,
    VFabTransition,
    VDialogTransition,
    VDialogBottomTransition,
    VDialogTopTransition,
    VFadeTransition,
    VScaleTransition,
    VScrollXTransition,
    VScrollXReverseTransition,
    VScrollYTransition,
    VScrollYReverseTransition,
    VSlideXTransition,
    VSlideXReverseTransition,
    VSlideYTransition,
    VSlideYReverseTransition,
    VExpandTransition,
    VExpandXTransition,
  }
}

declare module 'vuetify/lib/directives' {
  import { DirectiveOptions } from 'vue'

  const ClickOutside: DirectiveOptions
  const Intersect: DirectiveOptions
  const Mutate: DirectiveOptions
  const Resize: DirectiveOptions
  const Ripple: DirectiveOptions
  const Scroll: DirectiveOptions
  const Touch: DirectiveOptions

  export {
    ClickOutside,
    Intersect,
    Mutate,
    Ripple,
    Resize,
    Scroll,
    Touch,
  }
}

declare module 'vuetify/lib/services/goto' {
  import { GoToOptions, VuetifyGoToTarget } from 'vuetify/types/services/goto'

  export default function goTo(target: VuetifyGoToTarget, options?: Partial<GoToOptions>): Promise<number>
}
