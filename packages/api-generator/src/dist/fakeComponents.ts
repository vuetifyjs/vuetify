import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

Vue.component('v-app', {
  props: {
    dark: Boolean,
    id: String,
    light: Boolean
  }
})
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
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-autocomplete', {
  props: {
    allowOverflow: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    appendOuterIcon: String,
    appendOuterIconCb: Function,
    attach: null as any as PropValidator<any>,
    autofocus: Boolean,
    backgroundColor: String,
    box: Boolean,
    browserAutocomplete: String,
    cacheItems: Boolean,
    chips: Boolean,
    clearIcon: String,
    clearIconCb: Function,
    clearable: Boolean,
    color: String,
    counter: [Boolean,Number,String],
    dark: Boolean,
    deletableChips: Boolean,
    dense: Boolean,
    disabled: Boolean,
    dontFillMaskBlanks: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    filter: Function,
    flat: Boolean,
    fullWidth: Boolean,
    height: [Number,String],
    hideDetails: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    hint: String,
    itemAvatar: [String,Array,Function],
    itemDisabled: [String,Array,Function],
    itemText: [String,Array,Function],
    itemValue: [String,Array,Function],
    items: Array,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    mask: [Object,String],
    menuProps: [String,Array,Object],
    messages: [String,Array],
    multiple: Boolean,
    noDataText: String,
    noFilter: Boolean,
    openOnClear: Boolean,
    outline: Boolean,
    persistentHint: Boolean,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    prependIconCb: Function,
    prependInnerIcon: String,
    prependInnerIconCb: Function,
    readonly: Boolean,
    returnMaskedValue: Boolean,
    returnObject: Boolean,
    reverse: Boolean,
    rules: Array,
    searchInput: null as any as PropValidator<any>,
    singleLine: Boolean,
    smallChips: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    success: Boolean,
    successMessages: [String,Array],
    suffix: String,
    textarea: Boolean,
    type: String,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
Vue.component('v-avatar', {
  props: {
    color: String,
    size: [Number,String],
    tile: Boolean
  }
})
Vue.component('v-badge', {
  props: {
    bottom: Boolean,
    color: String,
    left: Boolean,
    mode: String,
    origin: String,
    overlap: Boolean,
    transition: String,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-bottom-nav', {
  props: {
    absolute: Boolean,
    active: [Number,String],
    app: Boolean,
    color: String,
    fixed: Boolean,
    height: [Number,String],
    mandatory: Boolean,
    shift: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-bottom-sheet', {
  props: {
    disabled: Boolean,
    fullWidth: Boolean,
    hideOverlay: Boolean,
    inset: Boolean,
    lazy: Boolean,
    maxWidth: [String,Number],
    persistent: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-breadcrumbs', {
  props: {
    dark: Boolean,
    divider: String,
    items: Array,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    large: Boolean,
    light: Boolean
  }
})
Vue.component('v-breadcrumbs-item', {
  props: {
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
    target: String,
    to: [String,Object]
  }
})
Vue.component('v-breadcrumbs-divider', {})
Vue.component('v-btn', {
  props: {
    absolute: Boolean,
    activeClass: String,
    append: Boolean,
    block: Boolean,
    bottom: Boolean,
    color: String,
    dark: Boolean,
    depressed: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    fab: Boolean,
    fixed: Boolean,
    flat: Boolean,
    href: [String,Object],
    icon: Boolean,
    inputValue: null as any as PropValidator<any>,
    large: Boolean,
    left: Boolean,
    light: Boolean,
    loading: Boolean,
    nuxt: Boolean,
    outline: Boolean,
    replace: Boolean,
    right: Boolean,
    ripple: [Boolean,Object],
    round: Boolean,
    small: Boolean,
    tag: String,
    target: String,
    to: [String,Object],
    top: Boolean,
    type: String,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-btn-toggle', {
  props: {
    activeClass: String,
    dark: Boolean,
    light: Boolean,
    mandatory: Boolean,
    max: [Number,String],
    multiple: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-card', {
  props: {
    activeClass: String,
    append: Boolean,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    flat: Boolean,
    height: [Number,String],
    hover: Boolean,
    href: [String,Object],
    img: String,
    light: Boolean,
    maxHeight: [Number,String],
    maxWidth: [Number,String],
    nuxt: Boolean,
    raised: Boolean,
    replace: Boolean,
    ripple: [Boolean,Object],
    tag: String,
    target: String,
    tile: Boolean,
    to: [String,Object],
    width: [Number,String]
  }
})
Vue.component('v-card-media', {
  props: {
    alt: String,
    aspectRatio: [String,Number],
    contain: Boolean,
    gradient: String,
    height: [Number,String],
    lazySrc: String,
    maxHeight: [Number,String],
    maxWidth: [Number,String],
    position: String,
    sizes: String,
    src: [String,Object],
    srcset: String,
    transition: [Boolean,String],
    width: [Number,String]
  }
})
Vue.component('v-card-title', {
  props: {
    primaryTitle: Boolean
  }
})
Vue.component('v-card-actions', {})
Vue.component('v-card-text', {})
Vue.component('v-carousel', {
  props: {
    activeClass: String,
    cycle: Boolean,
    dark: Boolean,
    delimiterIcon: String,
    height: [Number,String],
    hideControls: Boolean,
    hideDelimiters: Boolean,
    interval: [Number,String],
    light: Boolean,
    mandatory: Boolean,
    max: [Number,String],
    multiple: Boolean,
    nextIcon: [Boolean,String],
    prevIcon: [Boolean,String],
    reverse: Boolean,
    touch: Object,
    touchless: Boolean,
    value: null as any as PropValidator<any>,
    vertical: Boolean
  }
})
Vue.component('v-carousel-item', {
  props: {
    activeClass: String,
    disabled: Boolean,
    lazy: Boolean,
    reverseTransition: [Boolean,String],
    transition: [Boolean,String],
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-checkbox', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    backgroundColor: String,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    falseValue: null as any as PropValidator<any>,
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    id: String,
    indeterminate: Boolean,
    indeterminateIcon: String,
    inputValue: null as any as PropValidator<any>,
    label: String,
    light: Boolean,
    messages: [String,Array],
    multiple: Boolean,
    offIcon: String,
    onIcon: String,
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    ripple: [Boolean,Object],
    rules: Array,
    success: Boolean,
    successMessages: [String,Array],
    trueValue: null as any as PropValidator<any>,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
Vue.component('v-chip', {
  props: {
    close: Boolean,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    label: Boolean,
    light: Boolean,
    outline: Boolean,
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: Boolean
  }
})
Vue.component('v-combobox', {
  props: {
    allowOverflow: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    appendOuterIcon: String,
    appendOuterIconCb: Function,
    attach: null as any as PropValidator<any>,
    autofocus: Boolean,
    backgroundColor: String,
    box: Boolean,
    browserAutocomplete: String,
    cacheItems: Boolean,
    chips: Boolean,
    clearIcon: String,
    clearIconCb: Function,
    clearable: Boolean,
    color: String,
    counter: [Boolean,Number,String],
    dark: Boolean,
    deletableChips: Boolean,
    delimiters: Array,
    dense: Boolean,
    disabled: Boolean,
    dontFillMaskBlanks: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    filter: Function,
    flat: Boolean,
    fullWidth: Boolean,
    height: [Number,String],
    hideDetails: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    hint: String,
    itemAvatar: [String,Array,Function],
    itemDisabled: [String,Array,Function],
    itemText: [String,Array,Function],
    itemValue: [String,Array,Function],
    items: Array,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    mask: [Object,String],
    menuProps: [String,Array,Object],
    messages: [String,Array],
    multiple: Boolean,
    noDataText: String,
    noFilter: Boolean,
    openOnClear: Boolean,
    outline: Boolean,
    persistentHint: Boolean,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    prependIconCb: Function,
    prependInnerIcon: String,
    prependInnerIconCb: Function,
    readonly: Boolean,
    returnMaskedValue: Boolean,
    returnObject: Boolean,
    reverse: Boolean,
    rules: Array,
    searchInput: null as any as PropValidator<any>,
    singleLine: Boolean,
    smallChips: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    success: Boolean,
    successMessages: [String,Array],
    suffix: String,
    textarea: Boolean,
    type: String,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
Vue.component('v-counter', {
  props: {
    dark: Boolean,
    light: Boolean,
    max: [Number,String],
    value: [Number,String]
  }
})
Vue.component('v-data-iterator', {
  props: {
    contentClass: String,
    contentProps: Object,
    contentTag: String,
    customFilter: Function,
    customSort: Function,
    dark: Boolean,
    disableInitialSort: Boolean,
    expand: Boolean,
    filter: Function,
    hideActions: Boolean,
    itemKey: String,
    items: Array,
    light: Boolean,
    loading: [Boolean,String],
    mustSort: Boolean,
    nextIcon: String,
    noDataText: String,
    noResultsText: String,
    pagination: Object,
    prevIcon: String,
    rowsPerPageItems: Array,
    rowsPerPageText: String,
    search: null as any as PropValidator<any>,
    selectAll: [Boolean,String],
    totalItems: Number,
    value: Array
  }
})
Vue.component('v-data-table', {
  props: {
    customFilter: Function,
    customSort: Function,
    dark: Boolean,
    disableInitialSort: Boolean,
    expand: Boolean,
    filter: Function,
    headerKey: String,
    headerText: String,
    headers: Array,
    headersLength: Number,
    hideActions: Boolean,
    hideHeaders: Boolean,
    itemKey: String,
    items: Array,
    light: Boolean,
    loading: [Boolean,String],
    mustSort: Boolean,
    nextIcon: String,
    noDataText: String,
    noResultsText: String,
    pagination: Object,
    prevIcon: String,
    rowsPerPageItems: Array,
    rowsPerPageText: String,
    search: null as any as PropValidator<any>,
    selectAll: [Boolean,String],
    sortIcon: String,
    totalItems: Number,
    value: Array
  }
})
Vue.component('v-edit-dialog', {
  props: {
    cancelText: null as any as PropValidator<any>,
    dark: Boolean,
    large: Boolean,
    lazy: Boolean,
    light: Boolean,
    persistent: Boolean,
    returnValue: null as any as PropValidator<any>,
    saveText: null as any as PropValidator<any>,
    transition: String
  }
})
Vue.component('v-table-overflow', {})
Vue.component('v-date-picker', {
  props: {
    allowedDates: Function,
    color: String,
    dark: Boolean,
    dayFormat: Function,
    eventColor: [String,Function,Object],
    events: [Array,Object,Function],
    firstDayOfWeek: [String,Number],
    fullWidth: Boolean,
    headerColor: String,
    headerDateFormat: Function,
    landscape: Boolean,
    light: Boolean,
    locale: String,
    max: String,
    min: String,
    monthFormat: Function,
    multiple: Boolean,
    nextIcon: String,
    noTitle: Boolean,
    pickerDate: String,
    prevIcon: String,
    reactive: Boolean,
    readonly: Boolean,
    scrollable: Boolean,
    showCurrent: [Boolean,String],
    titleDateFormat: Function,
    type: String,
    value: [Array,String],
    weekdayFormat: Function,
    width: [Number,String],
    yearFormat: Function,
    yearIcon: String
  }
})
Vue.component('v-date-picker-title', {
  props: {
    date: String,
    selectingYear: Boolean,
    value: String,
    year: [Number,String],
    yearIcon: String
  }
})
Vue.component('v-date-picker-header', {
  props: {
    color: String,
    dark: Boolean,
    disabled: Boolean,
    format: Function,
    light: Boolean,
    locale: String,
    max: String,
    min: String,
    nextIcon: String,
    prevIcon: String,
    value: [Number,String]
  }
})
Vue.component('v-date-picker-date-table', {
  props: {
    allowedDates: Function,
    color: String,
    current: String,
    dark: Boolean,
    disabled: Boolean,
    eventColor: [String,Function,Object],
    events: [Array,Object,Function],
    firstDayOfWeek: [String,Number],
    format: Function,
    light: Boolean,
    locale: String,
    max: String,
    min: String,
    scrollable: Boolean,
    tableDate: String,
    value: [String,Array],
    weekdayFormat: Function
  }
})
Vue.component('v-date-picker-month-table', {
  props: {
    allowedDates: Function,
    color: String,
    current: String,
    dark: Boolean,
    disabled: Boolean,
    format: Function,
    light: Boolean,
    locale: String,
    max: String,
    min: String,
    scrollable: Boolean,
    tableDate: String,
    value: [String,Array]
  }
})
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
Vue.component('v-dialog', {
  props: {
    attach: null as any as PropValidator<any>,
    contentClass: null as any as PropValidator<any>,
    dark: Boolean,
    disabled: Boolean,
    fullWidth: Boolean,
    fullscreen: Boolean,
    hideOverlay: Boolean,
    lazy: Boolean,
    light: Boolean,
    maxWidth: [String,Number],
    noClickAnimation: Boolean,
    origin: String,
    persistent: Boolean,
    returnValue: null as any as PropValidator<any>,
    scrollable: Boolean,
    transition: [String,Boolean],
    value: null as any as PropValidator<any>,
    width: [String,Number]
  }
})
Vue.component('v-divider', {
  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean,
    vertical: Boolean
  }
})
Vue.component('v-expansion-panel', {
  props: {
    dark: Boolean,
    disabled: Boolean,
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    light: Boolean,
    popout: Boolean,
    readonly: Boolean,
    value: [Number,Array]
  }
})
Vue.component('v-expansion-panel-content', {
  props: {
    disabled: Boolean,
    expandIcon: String,
    hideActions: Boolean,
    lazy: Boolean,
    readonly: Boolean,
    ripple: [Boolean,Object],
    value: null as any as PropValidator<any>
  }
})
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
Vue.component('v-form', {
  props: {
    lazyValidation: Boolean,
    value: Boolean
  }
})
Vue.component('v-container', {
  props: {
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
    fluid: Boolean,
    'grid-list-{xs through xl}': Boolean,
    id: String,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,
    justifyStart: Boolean,
    reverse: Boolean,
    tag: String,
    wrap: Boolean
  }
})
Vue.component('v-content', {
  props: {
    tag: String
  }
})
Vue.component('v-flex', {
  props: {
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
    id: String,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,
    justifyStart: Boolean,
    'offset-(size)(0-12)': Boolean,
    'order-(size)(0-12)': Boolean,
    reverse: Boolean,
    tag: String,
    wrap: Boolean
  }
})
Vue.component('v-layout', {
  props: {
    alignBaseline: Boolean,
    alignCenter: Boolean,
    alignContentCenter: Boolean,
    alignContentEnd: Boolean,
    alignContentSpaceAround: Boolean,
    alignContentSpaceBetween: Boolean,
    alignContentStart: Boolean,
    alignEnd: Boolean,
    alignStart: Boolean,
    column: Boolean,
    'd-{type}': Boolean,
    fillHeight: Boolean,
    id: String,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    justifySpaceAround: Boolean,
    justifySpaceBetween: Boolean,
    justifyStart: Boolean,
    reverse: Boolean,
    row: Boolean,
    tag: String,
    wrap: Boolean
  }
})
Vue.component('v-spacer', {})
Vue.component('v-hover', {
  props: {
    closeDelay: [Number,String],
    disabled: Boolean,
    openDelay: [Number,String],
    value: Boolean
  }
})
Vue.component('v-icon', {
  props: {
    color: String,
    dark: Boolean,
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    light: Boolean,
    medium: Boolean,
    right: Boolean,
    size: [Number,String],
    small: Boolean,
    xLarge: Boolean
  }
})
Vue.component('v-img', {
  props: {
    alt: String,
    aspectRatio: [String,Number],
    contain: Boolean,
    gradient: String,
    height: [Number,String],
    lazySrc: String,
    maxHeight: [Number,String],
    maxWidth: [Number,String],
    position: String,
    sizes: String,
    src: [String,Object],
    srcset: String,
    transition: [Boolean,String],
    width: [Number,String]
  }
})
Vue.component('v-input', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    backgroundColor: String,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    label: String,
    light: Boolean,
    messages: [String,Array],
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    rules: Array,
    success: Boolean,
    successMessages: [String,Array],
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-item', {
  props: {
    activeClass: String,
    disabled: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-item-group', {
  props: {
    activeClass: String,
    dark: Boolean,
    light: Boolean,
    mandatory: Boolean,
    max: [Number,String],
    multiple: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-jumbotron', {
  props: {
    activeClass: String,
    append: Boolean,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    gradient: String,
    height: [Number,String],
    href: [String,Object],
    light: Boolean,
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean,Object],
    src: String,
    tag: String,
    target: String,
    to: [String,Object]
  }
})
Vue.component('v-label', {
  props: {
    absolute: Boolean,
    color: [Boolean,String],
    dark: Boolean,
    disabled: Boolean,
    focused: Boolean,
    for: String,
    left: [Number,String],
    light: Boolean,
    right: [Number,String],
    value: Boolean
  }
})
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
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-list-tile', {
  props: {
    activeClass: String,
    append: Boolean,
    avatar: Boolean,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    href: [String,Object],
    inactive: Boolean,
    light: Boolean,
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean,Object],
    tag: String,
    target: String,
    to: [String,Object],
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-list-tile-action', {})
Vue.component('v-list-tile-avatar', {
  props: {
    color: String,
    size: [Number,String],
    tile: Boolean
  }
})
Vue.component('v-list-tile-action-text', {})
Vue.component('v-list-tile-content', {})
Vue.component('v-list-tile-title', {})
Vue.component('v-list-tile-sub-title', {})
Vue.component('v-menu', {
  props: {
    absolute: Boolean,
    activator: null as any as PropValidator<any>,
    allowOverflow: Boolean,
    attach: null as any as PropValidator<any>,
    auto: Boolean,
    bottom: Boolean,
    closeDelay: [Number,String],
    closeOnClick: Boolean,
    closeOnContentClick: Boolean,
    contentClass: null as any as PropValidator<any>,
    dark: Boolean,
    disabled: Boolean,
    fixed: Boolean,
    fullWidth: Boolean,
    inputActivator: Boolean,
    lazy: Boolean,
    left: Boolean,
    light: Boolean,
    maxHeight: null as any as PropValidator<any>,
    maxWidth: [Number,String],
    minWidth: [Number,String],
    nudgeBottom: [Number,String],
    nudgeLeft: [Number,String],
    nudgeRight: [Number,String],
    nudgeTop: [Number,String],
    nudgeWidth: [Number,String],
    offsetOverflow: Boolean,
    offsetX: Boolean,
    offsetY: Boolean,
    openDelay: [Number,String],
    openOnClick: Boolean,
    openOnHover: Boolean,
    origin: String,
    positionX: Number,
    positionY: Number,
    returnValue: null as any as PropValidator<any>,
    right: Boolean,
    top: Boolean,
    transition: [Boolean,String],
    value: null as any as PropValidator<any>,
    zIndex: [Number,String]
  }
})
Vue.component('v-messages', {
  props: {
    color: String,
    dark: Boolean,
    light: Boolean,
    value: Array
  }
})
Vue.component('v-navigation-drawer', {
  props: {
    absolute: Boolean,
    app: Boolean,
    clipped: Boolean,
    dark: Boolean,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    fixed: Boolean,
    floating: Boolean,
    height: [Number,String],
    hideOverlay: Boolean,
    light: Boolean,
    miniVariant: Boolean,
    miniVariantWidth: [Number,String],
    mobileBreakPoint: [Number,String],
    permanent: Boolean,
    right: Boolean,
    stateless: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    value: null as any as PropValidator<any>,
    width: [Number,String]
  }
})
Vue.component('v-overflow-btn', {
  props: {
    allowOverflow: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    appendOuterIcon: String,
    appendOuterIconCb: Function,
    attach: null as any as PropValidator<any>,
    autofocus: Boolean,
    backgroundColor: String,
    box: Boolean,
    browserAutocomplete: String,
    cacheItems: Boolean,
    chips: Boolean,
    clearIcon: String,
    clearIconCb: Function,
    clearable: Boolean,
    color: String,
    counter: [Boolean,Number,String],
    dark: Boolean,
    deletableChips: Boolean,
    dense: Boolean,
    disabled: Boolean,
    dontFillMaskBlanks: Boolean,
    editable: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    filter: Function,
    flat: Boolean,
    fullWidth: Boolean,
    height: [Number,String],
    hideDetails: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    hint: String,
    itemAvatar: [String,Array,Function],
    itemDisabled: [String,Array,Function],
    itemText: [String,Array,Function],
    itemValue: [String,Array,Function],
    items: Array,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    mask: [Object,String],
    menuProps: [String,Array,Object],
    messages: [String,Array],
    multiple: Boolean,
    noDataText: String,
    noFilter: Boolean,
    openOnClear: Boolean,
    outline: Boolean,
    persistentHint: Boolean,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    prependIconCb: Function,
    prependInnerIcon: String,
    prependInnerIconCb: Function,
    readonly: Boolean,
    returnMaskedValue: Boolean,
    returnObject: Boolean,
    reverse: Boolean,
    rules: Array,
    searchInput: null as any as PropValidator<any>,
    segmented: Boolean,
    singleLine: Boolean,
    smallChips: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    success: Boolean,
    successMessages: [String,Array],
    suffix: String,
    textarea: Boolean,
    transition: null as any as PropValidator<any>,
    type: String,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
Vue.component('v-pagination', {
  props: {
    circle: Boolean,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    length: Number,
    light: Boolean,
    nextIcon: String,
    prevIcon: String,
    totalVisible: [Number,String],
    value: Number
  }
})
Vue.component('v-parallax', {
  props: {
    alt: String,
    height: [String,Number],
    src: String
  }
})
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
Vue.component('v-progress-circular', {
  props: {
    button: Boolean,
    color: String,
    indeterminate: Boolean,
    rotate: Number,
    size: [Number,String],
    value: [Number,String],
    width: Number
  }
})
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
Vue.component('v-radio-group', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    backgroundColor: String,
    color: String,
    column: Boolean,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    label: String,
    light: Boolean,
    mandatory: Boolean,
    messages: [String,Array],
    name: String,
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    row: Boolean,
    rules: Array,
    success: Boolean,
    successMessages: [String,Array],
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
Vue.component('v-radio', {
  props: {
    color: String,
    dark: Boolean,
    disabled: Boolean,
    label: String,
    light: Boolean,
    offIcon: String,
    onIcon: String,
    readonly: Boolean,
    ripple: [Boolean,Object],
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-range-slider', {
  props: {
    alwaysDirty: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    backgroundColor: String,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    inverseLabel: Boolean,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    max: [Number,String],
    messages: [String,Array],
    min: [Number,String],
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    range: Boolean,
    readonly: Boolean,
    rules: Array,
    step: [Number,String],
    success: Boolean,
    successMessages: [String,Array],
    thumbColor: String,
    thumbLabel: [Boolean,String],
    thumbSize: [Number,String],
    tickLabels: Array,
    tickSize: [Number,String],
    ticks: [Boolean,String],
    trackColor: String,
    validateOnBlur: Boolean,
    value: Array
  }
})
Vue.component('v-rating', {
  props: {
    backgroundColor: String,
    clearable: Boolean,
    closeDelay: [Number,String],
    color: String,
    dark: Boolean,
    dense: Boolean,
    emptyIcon: String,
    fullIcon: String,
    halfIcon: String,
    halfIncrements: Boolean,
    hover: Boolean,
    large: Boolean,
    length: [Number,String],
    light: Boolean,
    medium: Boolean,
    openDelay: [Number,String],
    readonly: Boolean,
    ripple: [Boolean,Object],
    size: [Number,String],
    small: Boolean,
    value: Number,
    xLarge: Boolean
  }
})
Vue.component('v-responsive', {
  props: {
    aspectRatio: [String,Number],
    height: [Number,String],
    maxHeight: [Number,String],
    maxWidth: [Number,String],
    width: [Number,String]
  }
})
Vue.component('v-select', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    appendOuterIcon: String,
    appendOuterIconCb: Function,
    attach: null as any as PropValidator<any>,
    autofocus: Boolean,
    backgroundColor: String,
    box: Boolean,
    browserAutocomplete: String,
    cacheItems: Boolean,
    chips: Boolean,
    clearIcon: String,
    clearIconCb: Function,
    clearable: Boolean,
    color: String,
    counter: [Boolean,Number,String],
    dark: Boolean,
    deletableChips: Boolean,
    dense: Boolean,
    disabled: Boolean,
    dontFillMaskBlanks: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    filter: null as any as PropValidator<any>,
    flat: Boolean,
    fullWidth: Boolean,
    height: [Number,String],
    hideDetails: Boolean,
    hideSelected: Boolean,
    hint: String,
    itemAvatar: [String,Array,Function],
    itemDisabled: [String,Array,Function],
    itemText: [String,Array,Function],
    itemValue: [String,Array,Function],
    items: Array,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    mask: [Object,String],
    menuProps: [String,Array,Object],
    messages: [String,Array],
    multiple: Boolean,
    noDataText: String,
    openOnClear: Boolean,
    outline: Boolean,
    persistentHint: Boolean,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    prependIconCb: Function,
    prependInnerIcon: String,
    prependInnerIconCb: Function,
    readonly: Boolean,
    returnMaskedValue: Boolean,
    returnObject: Boolean,
    reverse: Boolean,
    rules: Array,
    searchInput: null as any as PropValidator<any>,
    singleLine: Boolean,
    smallChips: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    success: Boolean,
    successMessages: [String,Array],
    suffix: String,
    textarea: Boolean,
    type: String,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
Vue.component('v-slider', {
  props: {
    alwaysDirty: Boolean,
    appendIcon: String,
    appendIconCb: Function,
    backgroundColor: String,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    inverseLabel: Boolean,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    max: [Number,String],
    messages: [String,Array],
    min: [Number,String],
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    range: Boolean,
    readonly: Boolean,
    rules: Array,
    step: [Number,String],
    success: Boolean,
    successMessages: [String,Array],
    thumbColor: String,
    thumbLabel: [Boolean,String],
    thumbSize: [Number,String],
    tickLabels: Array,
    tickSize: [Number,String],
    ticks: [Boolean,String],
    trackColor: String,
    validateOnBlur: Boolean,
    value: [Number,String]
  }
})
Vue.component('v-snackbar', {
  props: {
    absolute: Boolean,
    autoHeight: Boolean,
    bottom: Boolean,
    color: String,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    timeout: Number,
    top: Boolean,
    value: null as any as PropValidator<any>,
    vertical: Boolean
  }
})
Vue.component('v-speed-dial', {
  props: {
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
    transition: String,
    value: null as any as PropValidator<any>
  }
})
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
Vue.component('v-stepper-content', {
  props: {
    step: [Number,String]
  }
})
Vue.component('v-stepper-step', {
  props: {
    color: String,
    complete: Boolean,
    completeIcon: String,
    editIcon: String,
    editable: Boolean,
    errorIcon: String,
    rules: Array,
    step: [Number,String]
  }
})
Vue.component('v-stepper-header', {})
Vue.component('v-stepper-items', {})
Vue.component('v-subheader', {
  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean
  }
})
Vue.component('v-switch', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    backgroundColor: String,
    color: String,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    falseValue: null as any as PropValidator<any>,
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    id: String,
    inputValue: null as any as PropValidator<any>,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    messages: [String,Array],
    multiple: Boolean,
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    ripple: [Boolean,Object],
    rules: Array,
    success: Boolean,
    successMessages: [String,Array],
    trueValue: null as any as PropValidator<any>,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>,
    valueComparator: Function
  }
})
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
Vue.component('v-tabs', {
  props: {
    activeClass: String,
    alignWithTitle: Boolean,
    centered: Boolean,
    color: String,
    dark: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: [Number,String],
    hideSlider: Boolean,
    iconsAndText: Boolean,
    light: Boolean,
    mandatory: Boolean,
    max: [Number,String],
    mobileBreakPoint: [Number,String],
    multiple: Boolean,
    nextIcon: String,
    prevIcon: String,
    right: Boolean,
    showArrows: Boolean,
    sliderColor: String,
    value: [Number,String]
  }
})
Vue.component('v-tab', {
  props: {
    activeClass: String,
    append: Boolean,
    dark: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    href: [String,Object],
    light: Boolean,
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean,Object],
    tag: String,
    target: String,
    to: [String,Object]
  }
})
Vue.component('v-tab-item', {
  props: {
    activeClass: String,
    disabled: Boolean,
    id: String,
    lazy: Boolean,
    reverseTransition: [Boolean,String],
    transition: [Boolean,String],
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-tabs-items', {
  props: {
    activeClass: String,
    cycle: Boolean,
    dark: Boolean,
    light: Boolean,
    mandatory: Boolean,
    max: [Number,String],
    multiple: Boolean,
    reverse: Boolean,
    touch: Object,
    touchless: Boolean,
    value: null as any as PropValidator<any>,
    vertical: Boolean
  }
})
Vue.component('v-tabs-slider', {
  props: {
    color: String
  }
})
Vue.component('v-textarea', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    appendOuterIcon: String,
    appendOuterIconCb: Function,
    autoGrow: Boolean,
    autofocus: Boolean,
    backgroundColor: String,
    box: Boolean,
    browserAutocomplete: String,
    clearIcon: String,
    clearIconCb: Function,
    clearable: Boolean,
    color: String,
    counter: [Boolean,Number,String],
    dark: Boolean,
    disabled: Boolean,
    dontFillMaskBlanks: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    flat: Boolean,
    fullWidth: Boolean,
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    mask: [Object,String],
    messages: [String,Array],
    noResize: Boolean,
    outline: Boolean,
    persistentHint: Boolean,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    prependIconCb: Function,
    prependInnerIcon: String,
    prependInnerIconCb: Function,
    readonly: Boolean,
    returnMaskedValue: Boolean,
    reverse: Boolean,
    rowHeight: [Number,String],
    rows: [Number,String],
    rules: Array,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    success: Boolean,
    successMessages: [String,Array],
    suffix: String,
    textarea: Boolean,
    type: String,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-text-field', {
  props: {
    appendIcon: String,
    appendIconCb: Function,
    appendOuterIcon: String,
    appendOuterIconCb: Function,
    autofocus: Boolean,
    backgroundColor: String,
    box: Boolean,
    browserAutocomplete: String,
    clearIcon: String,
    clearIconCb: Function,
    clearable: Boolean,
    color: String,
    counter: [Boolean,Number,String],
    dark: Boolean,
    disabled: Boolean,
    dontFillMaskBlanks: Boolean,
    error: Boolean,
    errorCount: [Number,String],
    errorMessages: [String,Array],
    flat: Boolean,
    fullWidth: Boolean,
    height: [Number,String],
    hideDetails: Boolean,
    hint: String,
    label: String,
    light: Boolean,
    loading: [Boolean,String],
    mask: [Object,String],
    messages: [String,Array],
    outline: Boolean,
    persistentHint: Boolean,
    placeholder: String,
    prefix: String,
    prependIcon: String,
    prependIconCb: Function,
    prependInnerIcon: String,
    prependInnerIconCb: Function,
    readonly: Boolean,
    returnMaskedValue: Boolean,
    reverse: Boolean,
    rules: Array,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    success: Boolean,
    successMessages: [String,Array],
    suffix: String,
    textarea: Boolean,
    type: String,
    validateOnBlur: Boolean,
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-timeline', {
  props: {
    alignTop: Boolean,
    dark: Boolean,
    dense: Boolean,
    light: Boolean
  }
})
Vue.component('v-timeline-item', {
  props: {
    color: String,
    dark: Boolean,
    fillDot: Boolean,
    hideDot: Boolean,
    icon: String,
    iconColor: String,
    large: Boolean,
    left: Boolean,
    light: Boolean,
    right: Boolean,
    small: Boolean
  }
})
Vue.component('v-time-picker', {
  props: {
    allowedHours: Function,
    allowedMinutes: Function,
    color: String,
    dark: Boolean,
    format: String,
    fullWidth: Boolean,
    headerColor: String,
    landscape: Boolean,
    light: Boolean,
    max: String,
    min: String,
    noTitle: Boolean,
    readonly: Boolean,
    scrollable: Boolean,
    value: null as any as PropValidator<any>,
    width: [Number,String]
  }
})
Vue.component('v-time-picker-clock', {
  props: {
    allowedValues: Function,
    color: String,
    dark: Boolean,
    double: Boolean,
    format: Function,
    light: Boolean,
    max: Number,
    min: Number,
    readonly: Boolean,
    rotate: Number,
    scrollable: Boolean,
    step: Number,
    value: Number
  }
})
Vue.component('v-time-picker-title', {
  props: {
    ampm: Boolean,
    hour: Number,
    minute: Number,
    period: String,
    readonly: Boolean,
    selectingHour: Boolean
  }
})
Vue.component('v-toolbar', {
  props: {
    absolute: Boolean,
    app: Boolean,
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    color: String,
    dark: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: [Number,String],
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    height: [Number,String],
    invertedScroll: Boolean,
    light: Boolean,
    manualScroll: Boolean,
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: Number,
    scrollToolbarOffScreen: Boolean,
    tabs: Boolean
  }
})
Vue.component('v-toolbar-side-icon', {})
Vue.component('v-toolbar-title', {})
Vue.component('v-toolbar-items', {})
Vue.component('v-tooltip', {
  props: {
    absolute: Boolean,
    activator: null as any as PropValidator<any>,
    allowOverflow: Boolean,
    attach: null as any as PropValidator<any>,
    bottom: Boolean,
    closeDelay: [Number,String],
    color: String,
    contentClass: null as any as PropValidator<any>,
    dark: Boolean,
    debounce: [Number,String],
    disabled: Boolean,
    fixed: Boolean,
    inputActivator: Boolean,
    lazy: Boolean,
    left: Boolean,
    light: Boolean,
    maxWidth: [Number,String],
    minWidth: [Number,String],
    nudgeBottom: [Number,String],
    nudgeLeft: [Number,String],
    nudgeRight: [Number,String],
    nudgeTop: [Number,String],
    nudgeWidth: [Number,String],
    offsetOverflow: Boolean,
    openDelay: [Number,String],
    positionX: Number,
    positionY: Number,
    right: Boolean,
    tag: String,
    top: Boolean,
    transition: String,
    value: null as any as PropValidator<any>,
    zIndex: null as any as PropValidator<any>
  }
})
Vue.component('v-treeview', {
  props: {
    activatable: Boolean,
    active: Array,
    activeClass: String,
    dark: Boolean,
    expandIcon: String,
    hoverable: Boolean,
    indeterminateIcon: String,
    itemChildren: String,
    itemKey: String,
    itemText: String,
    items: Array,
    light: Boolean,
    loadChildren: Function,
    loadingIcon: String,
    multipleActive: Boolean,
    offIcon: String,
    onIcon: String,
    open: Array,
    openAll: Boolean,
    openOnClick: Boolean,
    selectable: Boolean,
    selectedColor: String,
    transition: Boolean,
    value: Array
  }
})
Vue.component('v-treeview-node', {
  props: {
    activatable: Boolean,
    activeClass: String,
    expandIcon: String,
    indeterminateIcon: String,
    item: Object,
    itemChildren: String,
    itemKey: String,
    itemText: String,
    loadChildren: Function,
    loadingIcon: String,
    offIcon: String,
    onIcon: String,
    openOnClick: Boolean,
    selectable: Boolean,
    selectedColor: String,
    transition: Boolean
  }
})
Vue.component('v-window', {
  props: {
    activeClass: String,
    dark: Boolean,
    light: Boolean,
    mandatory: Boolean,
    max: [Number,String],
    multiple: Boolean,
    reverse: Boolean,
    touch: Object,
    touchless: Boolean,
    value: null as any as PropValidator<any>,
    vertical: Boolean
  }
})
Vue.component('v-window-item', {
  props: {
    activeClass: String,
    disabled: Boolean,
    lazy: Boolean,
    reverseTransition: [Boolean,String],
    transition: [Boolean,String],
    value: null as any as PropValidator<any>
  }
})
Vue.component('v-bottom-sheet-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-carousel-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-carousel-reverse-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-tab-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-tab-reverse-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-menu-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-fab-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-dialog-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-dialog-bottom-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-fade-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-scale-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-scroll-x-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-scroll-x-reverse-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-scroll-y-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-scroll-y-reverse-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-slide-x-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-slide-x-reverse-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-slide-y-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-slide-y-reverse-transition', {
  props: {
    group: Boolean,
    hideOnLeave: Boolean,
    leaveAbsolute: Boolean,
    mode: String,
    origin: String
  }
})
Vue.component('v-expand-transition', {
  props: {
    mode: String
  }
})
Vue.component('v-row-expand-transition', {
  props: {
    mode: String
  }
})