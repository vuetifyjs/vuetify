import Vue from 'vue'

// noinspection JSUnresolvedFunction
Vue.component('v-app', {
  props: {
    dark: Boolean,
    id: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-alert', {
  props: {
    color: String,
    dismissible: Boolean,
    icon: String,
    mode: String,
    origin: String,
    outline: Boolean,
    transition: String,
    type: String,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-avatar', {
  props: {
    color: String,
    size: [Number,String],
    tile: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-badge', {
  props: {
    bottom: Boolean,
    color: String,
    left: Boolean,
    mode: String,
    origin: String,
    overlap: Boolean,
    transition: String,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-bottom-nav', {
  props: {
    absolute: Boolean,
    active: [Number,String],
    app: Boolean,
    color: String,
    fixed: Boolean,
    height: [Number,String],
    shift: Boolean,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-bottom-sheet', {
  props: {
    disabled: Boolean,
    fullWidth: Boolean,
    hideOverlay: Boolean,
    inset: Boolean,
    lazy: Boolean,
    maxWidth: [String,Number],
    persistent: Boolean,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-breadcrumbs', {
  props: {
    divider: String,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    large: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-breadcrumbs-item', {
  props: {
    to: [String,Object],
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    href: [String,Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean,Object],
    tag: String,
    target: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-btn', {
  props: {
    right: Boolean,
    color: String,
    append: Boolean,
    block: Boolean,
    activeClass: String,
    bottom: Boolean,
    absolute: Boolean,
    light: Boolean,
    to: [String,Object],
    replace: Boolean,
    ripple: [Boolean,Object],
    tag: String,
    target: String,
    href: [String,Object],
    exactActiveClass: String,
    fixed: Boolean,
    left: Boolean,
    exact: Boolean,
    small: Boolean,
    dark: Boolean,
    nuxt: Boolean,
    inputValue: null,
    disabled: Boolean,
    depressed: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    round: Boolean,
    top: Boolean,
    type: String,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-btn-toggle', {
  props: {
    dark: Boolean,
    inputValue: null,
    light: Boolean,
    mandatory: Boolean,
    multiple: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-card', {
  props: {
    tag: String,
    color: String,
    append: Boolean,
    activeClass: String,
    dark: Boolean,
    exact: Boolean,
    disabled: Boolean,
    light: Boolean,
    to: [String,Object],
    replace: Boolean,
    ripple: [Boolean,Object],
    href: [String,Object],
    target: String,
    exactActiveClass: String,
    nuxt: Boolean,
    flat: Boolean,
    height: String,
    hover: Boolean,
    img: String,
    raised: Boolean,
    tile: Boolean,
    width: [String,Number]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-card-media', {
  props: {
    contain: Boolean,
    height: [Number,String],
    src: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-card-title', {
  props: {
    primaryTitle: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-card-actions', {})
// noinspection JSUnresolvedFunction
Vue.component('v-card-text', {})
// noinspection JSUnresolvedFunction
Vue.component('v-carousel', {
  props: {
    hideControls: Boolean,
    lazy: Boolean,
    interval: [Number,String],
    cycle: Boolean,
    delimiterIcon: String,
    dark: Boolean,
    hideDelimiters: Boolean,
    light: Boolean,
    nextIcon: [Boolean,String],
    prevIcon: [Boolean,String],
    value: Number
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-carousel-item', {
  props: {
    reverseTransition: String,
    transition: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-checkbox', {
  props: {
    persistentHint: Boolean,
    indeterminate: Boolean,
    dark: Boolean,
    falseValue: null,
    error: Boolean,
    errorMessages: [String,Array],
    id: String,
    color: String,
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    toggleKeys: Array,
    label: String,
    inputValue: null,
    value: null,
    prependIcon: String,
    light: Boolean,
    placeholder: String,
    loading: [Boolean,String],
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    ripple: [Boolean,Object],
    rules: Array,
    tabindex: null,
    trueValue: null,
    validateOnBlur: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-chip', {
  props: {
    disabled: Boolean,
    color: String,
    close: Boolean,
    dark: Boolean,
    label: Boolean,
    light: Boolean,
    outline: Boolean,
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-data-iterator', {
  props: {
    selectAll: [Boolean,String],
    contentClass: String,
    search: null,
    dark: Boolean,
    contentProps: Object,
    contentTag: String,
    customSort: Function,
    customFilter: Function,
    disableInitialSort: Boolean,
    noDataText: String,
    expand: Boolean,
    hideActions: Boolean,
    itemKey: String,
    loading: [Boolean,String],
    light: Boolean,
    filter: Function,
    mustSort: Boolean,
    nextIcon: String,
    items: Array,
    noResultsText: String,
    pagination: Object,
    prevIcon: String,
    rowsPerPageItems: Array,
    rowsPerPageText: String,
    totalItems: Number,
    value: Array
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-data-table', {
  props: {
    selectAll: [Boolean,String],
    hideHeaders: Boolean,
    dark: Boolean,
    headerText: String,
    expand: Boolean,
    hideActions: Boolean,
    disableInitialSort: Boolean,
    headers: Array,
    customSort: Function,
    customFilter: Function,
    filter: Function,
    items: Array,
    noDataText: String,
    loading: [Boolean,String],
    light: Boolean,
    mustSort: Boolean,
    nextIcon: String,
    itemKey: String,
    noResultsText: String,
    pagination: Object,
    prevIcon: String,
    rowsPerPageItems: Array,
    rowsPerPageText: String,
    search: null,
    sortIcon: String,
    totalItems: Number,
    value: Array
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-edit-dialog', {
  props: {
    cancelText: null,
    large: Boolean,
    lazy: Boolean,
    persistent: Boolean,
    returnValue: null,
    saveText: null,
    transition: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-table-overflow', {})
// noinspection JSUnresolvedFunction
Vue.component('v-date-picker', {
  props: {
    max: String,
    color: String,
    allowedDates: Function,
    min: String,
    fullWidth: Boolean,
    dark: Boolean,
    firstDayOfWeek: [String,Number],
    eventColor: [String,Function,Object],
    events: [Array,Object,Function],
    dayFormat: Function,
    prevIcon: String,
    light: Boolean,
    headerColor: String,
    headerDateFormat: Function,
    landscape: Boolean,
    readonly: Boolean,
    locale: String,
    scrollable: Boolean,
    monthFormat: Function,
    showCurrent: [Boolean,String],
    pickerDate: String,
    nextIcon: String,
    noTitle: Boolean,
    reactive: Boolean,
    titleDateFormat: Function,
    type: String,
    value: String,
    width: [Number,String],
    yearFormat: Function,
    yearIcon: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-date-picker-title', {
  props: {
    date: String,
    selectingYear: Boolean,
    value: String,
    year: [Number,String],
    yearIcon: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-date-picker-header', {
  props: {
    color: String,
    disabled: Boolean,
    format: Function,
    locale: String,
    max: String,
    min: String,
    nextIcon: String,
    prevIcon: String,
    value: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-date-picker-date-table', {
  props: {
    max: String,
    color: String,
    allowedDates: Function,
    tableDate: String,
    disabled: Boolean,
    current: String,
    eventColor: [String,Function,Object],
    events: [Array,Object,Function],
    firstDayOfWeek: [String,Number],
    format: Function,
    locale: String,
    min: String,
    scrollable: Boolean,
    value: String,
    weekdayFormat: Function
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-date-picker-month-table', {
  props: {
    locale: String,
    color: String,
    allowedDates: Function,
    current: String,
    disabled: Boolean,
    format: Function,
    max: String,
    min: String,
    scrollable: Boolean,
    tableDate: String,
    value: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-date-picker-years', {
  props: {
    color: String,
    format: Function,
    locale: String,
    max: [Number,String],
    min: [Number,String],
    value: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-dialog', {
  props: {
    persistent: Boolean,
    lazy: Boolean,
    contentClass: null,
    hideOverlay: Boolean,
    fullWidth: Boolean,
    fullscreen: Boolean,
    disabled: Boolean,
    attach: null,
    maxWidth: [String,Number],
    origin: String,
    returnValue: null,
    scrollable: Boolean,
    transition: [String,Boolean],
    value: null,
    width: [String,Number]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-divider', {
  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-expansion-panel', {
  props: {
    dark: Boolean,
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    light: Boolean,
    popout: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-expansion-panel-content', {
  props: {
    expandIcon: String,
    hideActions: Boolean,
    lazy: Boolean,
    ripple: [Boolean,Object],
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-footer', {
  props: {
    absolute: Boolean,
    app: Boolean,
    color: String,
    dark: Boolean,
    fixed: Boolean,
    height: [Number,String],
    inset: Boolean,
    light: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-form', {
  props: {
    lazyValidation: Boolean,
    value: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-content', {
  props: {
    tag: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-container', {
  props: {
    id: String,
    tag: String,
    'grid-list-{xs through xl}': Boolean,
    fluid: Boolean,
    alignBaseline: Boolean,
    alignCenter: Boolean,
    alignContentCenter: Boolean,
    alignContentEnd: Boolean,
    alignContentSpaceAround: Boolean,
    alignContentSpaceBetween: Boolean,
    alignContentStart: Boolean,
    alignEnd: Boolean,
    alignStart: Boolean,
    'd-{type}': Boolean,
    fillHeight: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,
    justifyStart: Boolean,
    reverse: Boolean,
    wrap: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-flex', {
  props: {
    id: String,
    tag: String,
    'offset-(size)(0-12)': Boolean,
    'order-(size)(0-12)': Boolean,
    '(size)(1-12)': Boolean,
    alignBaseline: Boolean,
    alignCenter: Boolean,
    alignContentCenter: Boolean,
    alignContentEnd: Boolean,
    alignContentSpaceAround: Boolean,
    alignContentSpaceBetween: Boolean,
    alignContentStart: Boolean,
    alignEnd: Boolean,
    alignStart: Boolean,
    'd-{type}': Boolean,
    fillHeight: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,
    justifyStart: Boolean,
    reverse: Boolean,
    wrap: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-layout', {
  props: {
    id: String,
    tag: String,
    row: Boolean,
    column: Boolean,
    alignBaseline: Boolean,
    alignCenter: Boolean,
    alignContentCenter: Boolean,
    alignContentEnd: Boolean,
    alignContentSpaceAround: Boolean,
    alignContentSpaceBetween: Boolean,
    alignContentStart: Boolean,
    alignEnd: Boolean,
    alignStart: Boolean,
    'd-{type}': Boolean,
    fillHeight: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,
    justifyStart: Boolean,
    reverse: Boolean,
    wrap: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-spacer', {})
// noinspection JSUnresolvedFunction
Vue.component('v-icon', {
  props: {
    left: Boolean,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    large: Boolean,
    light: Boolean,
    medium: Boolean,
    right: Boolean,
    size: [Number,String],
    small: Boolean,
    xLarge: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-jumbotron', {
  props: {
    replace: Boolean,
    color: String,
    append: Boolean,
    activeClass: String,
    tag: String,
    exact: Boolean,
    dark: Boolean,
    disabled: Boolean,
    exactActiveClass: String,
    gradient: String,
    height: [Number,String],
    href: [String,Object],
    light: Boolean,
    nuxt: Boolean,
    ripple: [Boolean,Object],
    src: String,
    target: String,
    to: [String,Object]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-list', {
  props: {
    dark: Boolean,
    dense: Boolean,
    expand: Boolean,
    light: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-list-group', {
  props: {
    activeClass: String,
    appendIcon: String,
    disabled: Boolean,
    group: String,
    lazy: Boolean,
    noAction: Boolean,
    prependIcon: String,
    subGroup: Boolean,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile', {
  props: {
    nuxt: Boolean,
    color: String,
    append: Boolean,
    avatar: Boolean,
    activeClass: String,
    ripple: [Boolean,Object],
    exactActiveClass: String,
    disabled: Boolean,
    exact: Boolean,
    href: [String,Object],
    inactive: Boolean,
    replace: Boolean,
    tag: String,
    target: String,
    to: [String,Object],
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile-action', {})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile-action-text', {})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile-avatar', {
  props: {
    color: String,
    size: [Number,String],
    tile: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile-content', {})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile-sub-title', {})
// noinspection JSUnresolvedFunction
Vue.component('v-list-tile-title', {})
// noinspection JSUnresolvedFunction
Vue.component('v-menu', {
  props: {
    nudgeTop: [Number,String],
    openDelay: [Number,String],
    lazy: Boolean,
    attach: null,
    contentClass: null,
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    offsetY: Boolean,
    offsetX: Boolean,
    dark: Boolean,
    light: Boolean,
    activator: null,
    allowOverflow: Boolean,
    maxWidth: [Number,String],
    minWidth: [Number,String],
    nudgeBottom: Number,
    nudgeLeft: [Number,String],
    nudgeRight: [Number,String],
    closeDelay: [Number,String],
    nudgeWidth: [Number,String],
    offsetOverflow: Boolean,
    maxHeight: null,
    fullWidth: Boolean,
    disabled: Boolean,
    closeOnContentClick: Boolean,
    closeOnClick: Boolean,
    auto: Boolean,
    top: Boolean,
    transition: [Boolean,String],
    origin: String,
    positionY: Number,
    positionX: Number,
    returnValue: null,
    right: Boolean,
    openOnClick: Boolean,
    openOnHover: Boolean,
    value: null,
    zIndex: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-navigation-drawer', {
  props: {
    floating: Boolean,
    absolute: Boolean,
    miniVariant: Boolean,
    app: Boolean,
    miniVariantWidth: [Number,String],
    dark: Boolean,
    clipped: Boolean,
    permanent: Boolean,
    disableRouteWatcher: Boolean,
    disableResizeWatcher: Boolean,
    right: Boolean,
    fixed: Boolean,
    height: [Number,String],
    hideOverlay: Boolean,
    light: Boolean,
    mobileBreakPoint: [Number,String],
    stateless: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    value: null,
    width: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-pagination', {
  props: {
    circle: Boolean,
    color: String,
    disabled: Boolean,
    length: Number,
    nextIcon: String,
    prevIcon: String,
    totalVisible: [Number,String],
    value: Number
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-parallax', {
  props: {
    alt: String,
    height: [String,Number],
    src: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-picker', {
  props: {
    color: String,
    dark: Boolean,
    fullWidth: Boolean,
    landscape: Boolean,
    light: Boolean,
    transition: String,
    width: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-progress-circular', {
  props: {
    button: Boolean,
    color: String,
    indeterminate: Boolean,
    rotate: Number,
    size: [Number,String],
    value: Number,
    width: Number
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-progress-linear', {
  props: {
    active: Boolean,
    backgroundColor: String,
    backgroundOpacity: [Number,String],
    bufferValue: [Number,String],
    color: String,
    height: [Number,String],
    indeterminate: Boolean,
    query: Boolean,
    value: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-radio-group', {
  props: {
    persistentHint: Boolean,
    loading: [Boolean,String],
    light: Boolean,
    error: Boolean,
    errorMessages: [String,Array],
    inputValue: null,
    column: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    dark: Boolean,
    toggleKeys: Array,
    placeholder: String,
    name: String,
    mandatory: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    row: Boolean,
    rules: Array,
    tabindex: null,
    validateOnBlur: Boolean,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-radio', {
  props: {
    color: String,
    dark: Boolean,
    disabled: Boolean,
    label: String,
    light: Boolean,
    ripple: [Boolean,Object],
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-select', {
  props: {
    autocomplete: Boolean,
    filter: Function,
    editable: Boolean,
    dense: Boolean,
    dark: Boolean,
    deletableChips: Boolean,
    error: Boolean,
    errorMessages: [String,Array],
    contentClass: String,
    combobox: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    clearable: Boolean,
    chips: Boolean,
    cacheItems: Boolean,
    browserAutocomplete: String,
    color: String,
    auto: Boolean,
    attach: Boolean,
    dontFillMaskBlanks: Boolean,
    items: Array,
    required: Boolean,
    flat: Boolean,
    overflow: Boolean,
    readonly: Boolean,
    mask: [Object,String],
    openOnClear: Boolean,
    prependIconCb: Function,
    prependIcon: String,
    placeholder: String,
    persistentHint: Boolean,
    label: String,
    hideDetails: Boolean,
    hint: String,
    multiLine: Boolean,
    multiple: Boolean,
    light: Boolean,
    loading: [Boolean,String],
    noDataText: String,
    hideSelected: Boolean,
    minWidth: [Boolean,Number,String],
    itemAvatar: String,
    itemDisabled: String,
    itemText: String,
    itemValue: String,
    maxHeight: [Number,String],
    segmented: Boolean,
    solo: Boolean,
    singleLine: Boolean,
    returnMaskedValue: Boolean,
    rules: Array,
    returnObject: Boolean,
    searchInput: null,
    soloInverted: Boolean,
    tabindex: null,
    tags: Boolean,
    toggleKeys: Array,
    validateOnBlur: Boolean,
    value: null,
    valueComparator: Function
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-slider', {
  props: {
    placeholder: String,
    color: String,
    appendIconCb: Function,
    appendIcon: String,
    prependIconCb: Function,
    error: Boolean,
    disabled: Boolean,
    dark: Boolean,
    required: Boolean,
    light: Boolean,
    errorMessages: [String,Array],
    hint: String,
    hideDetails: Boolean,
    label: String,
    value: [Number,String],
    persistentHint: Boolean,
    max: [Number,String],
    min: [Number,String],
    loading: [Boolean,String],
    prependIcon: String,
    trackColor: String,
    toggleKeys: Array,
    readonly: Boolean,
    rules: Array,
    tabindex: null,
    step: [Number,String],
    ticks: Boolean,
    thumbColor: String,
    thumbLabel: Boolean,
    validateOnBlur: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-snackbar', {
  props: {
    left: Boolean,
    color: String,
    absolute: Boolean,
    autoHeight: Boolean,
    bottom: Boolean,
    multiLine: Boolean,
    right: Boolean,
    timeout: Number,
    top: Boolean,
    value: null,
    vertical: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-speed-dial', {
  props: {
    value: null,
    absolute: Boolean,
    bottom: Boolean,
    direction: String,
    fixed: Boolean,
    left: Boolean,
    mode: String,
    openOnHover: Boolean,
    origin: String,
    right: Boolean,
    top: Boolean,
    transition: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-stepper', {
  props: {
    altLabels: Boolean,
    dark: Boolean,
    light: Boolean,
    nonLinear: Boolean,
    value: [Number,String],
    vertical: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-stepper-content', {
  props: {
    step: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-stepper-step', {
  props: {
    complete: Boolean,
    completeIcon: String,
    editIcon: String,
    editable: Boolean,
    errorIcon: String,
    rules: Array,
    step: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-stepper-header', {})
// noinspection JSUnresolvedFunction
Vue.component('v-stepper-items', {})
// noinspection JSUnresolvedFunction
Vue.component('v-subheader', {
  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-switch', {
  props: {
    persistentHint: Boolean,
    ripple: [Boolean,Object],
    dark: Boolean,
    light: Boolean,
    error: Boolean,
    errorMessages: [String,Array],
    falseValue: null,
    inputValue: null,
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    loading: [Boolean,String],
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    id: String,
    color: String,
    rules: Array,
    tabindex: null,
    toggleKeys: Array,
    trueValue: null,
    validateOnBlur: Boolean,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-system-bar', {
  props: {
    absolute: Boolean,
    app: Boolean,
    color: String,
    dark: Boolean,
    fixed: Boolean,
    height: [Number,String],
    light: Boolean,
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tabs', {
  props: {
    mobileBreakPoint: [Number,String],
    color: String,
    centered: Boolean,
    alignWithTitle: Boolean,
    prevIcon: String,
    grow: Boolean,
    dark: Boolean,
    fixedTabs: Boolean,
    height: [Number,String],
    hideSlider: Boolean,
    iconsAndText: Boolean,
    light: Boolean,
    nextIcon: String,
    right: Boolean,
    showArrows: Boolean,
    sliderColor: String,
    value: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tab', {
  props: {
    to: [String,Object],
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    href: [String,Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean,Object],
    tag: String,
    target: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tabs-items', {
  props: {
    cycle: Boolean,
    touchless: Boolean,
    value: [Number,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tab-item', {
  props: {
    id: String,
    lazy: Boolean,
    reverseTransition: [Boolean,String],
    transition: [Boolean,String]
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tabs-slider', {
  props: {
    color: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-text-field', {
  props: {
    value: null,
    color: String,
    clearable: Boolean,
    box: Boolean,
    autoGrow: Boolean,
    autofocus: Boolean,
    appendIconCb: Function,
    appendIcon: String,
    flat: Boolean,
    type: String,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: null,
    toggleKeys: Array,
    loading: [Boolean,String],
    dontFillMaskBlanks: Boolean,
    mask: [Object,String],
    returnMaskedValue: Boolean,
    rules: Array,
    soloInverted: Boolean,
    solo: Boolean,
    errorMessages: [String,Array],
    error: Boolean,
    light: Boolean,
    dark: Boolean,
    counter: [Boolean,Number,String],
    fullWidth: Boolean,
    multiLine: Boolean,
    noResize: Boolean,
    prefix: String,
    rowHeight: [Number,String],
    rows: [Number,String],
    singleLine: Boolean,
    suffix: String,
    textarea: Boolean,
    validateOnBlur: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-time-picker', {
  props: {
    width: [Number,String],
    color: String,
    allowedMinutes: Function,
    allowedHours: Function,
    light: Boolean,
    headerColor: String,
    format: String,
    dark: Boolean,
    fullWidth: Boolean,
    landscape: Boolean,
    max: String,
    min: String,
    noTitle: Boolean,
    scrollable: Boolean,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-time-picker-clock', {
  props: {
    max: Number,
    color: String,
    allowedValues: Function,
    dark: Boolean,
    double: Boolean,
    format: Function,
    light: Boolean,
    min: Number,
    rotate: Number,
    scrollable: Boolean,
    size: [Number,String],
    step: Number,
    value: Number
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-time-picker-title', {
  props: {
    ampm: Boolean,
    hour: Number,
    minute: Number,
    period: String,
    selectingHour: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-toolbar', {
  props: {
    extensionHeight: [Number,String],
    absolute: Boolean,
    flat: Boolean,
    app: Boolean,
    floating: Boolean,
    dark: Boolean,
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    color: String,
    manualScroll: Boolean,
    extended: Boolean,
    dense: Boolean,
    fixed: Boolean,
    height: [Number,String],
    invertedScroll: Boolean,
    light: Boolean,
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: Number,
    tabs: Boolean
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-toolbar-items', {})
// noinspection JSUnresolvedFunction
Vue.component('v-toolbar-title', {})
// noinspection JSUnresolvedFunction
Vue.component('v-toolbar-side-icon', {})
// noinspection JSUnresolvedFunction
Vue.component('v-tooltip', {
  props: {
    maxWidth: [Number,String],
    color: String,
    closeDelay: [Number,String],
    allowOverflow: Boolean,
    attach: null,
    activator: null,
    absolute: Boolean,
    bottom: Boolean,
    nudgeRight: [Number,String],
    fixed: Boolean,
    disabled: Boolean,
    debounce: [Number,String],
    dark: Boolean,
    contentClass: null,
    offsetOverflow: Boolean,
    light: Boolean,
    lazy: Boolean,
    left: Boolean,
    positionY: Number,
    nudgeBottom: Number,
    minWidth: [Number,String],
    zIndex: null,
    nudgeTop: [Number,String],
    nudgeLeft: [Number,String],
    nudgeWidth: [Number,String],
    openDelay: [Number,String],
    positionX: Number,
    right: Boolean,
    tag: String,
    top: Boolean,
    transition: String,
    value: null
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-bottom-sheet-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-carousel-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-carousel-reverse-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-dialog-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-dialog-bottom-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-fab-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-fade-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-menu-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-scale-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-slide-x-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-slide-x-reverse-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-slide-y-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-slide-y-reverse-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tab-reverse-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-tab-transition', {
  props: {
    origin: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-expand-transition', {
  props: {
    css: Boolean,
    mode: String
  }
})
// noinspection JSUnresolvedFunction
Vue.component('v-row-expand-transition', {
  props: {
    css: Boolean,
    mode: String
  }
})