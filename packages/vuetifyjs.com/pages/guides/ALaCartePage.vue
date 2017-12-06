<template lang="pug">
  doc-view
    input(
      :style="{ position: 'absolute', left: '-1000px', top: '-1000px' }"
      :value="copy"
      ref="copy"
    )
    section#application
      section-head(value="Guides.ALaCarte.applicationHeader")
      section-text(value="Guides.ALaCarte.applicationText1")
      section-text(value="Guides.ALaCarte.applicationText2")
      markup(lang="js")
       | import Vue from 'vue'
       | import {
       |   Vuetify,
       |   VApp,
       |   VNavigationDrawer,
       |   VFooter,
       |   VToolbar,
       |   transitions
       | } from 'vuetify'
       | import App from './App.vue'

       | Vue.use(Vuetify, {
       |   components: {
       |     VApp,
       |     VNavigationDrawer,
       |     VFooter,
       |     VToolbar,
       |     transitions
       |   },
       | });

    section#component-name-list
      section-head(value="Guides.ALaCarte.componentNameListHeader")
      section-text(value="Guides.ALaCarte.componentNameListText1")
      v-card
        v-card-title
          v-spacer
          v-text-field(
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          )
        v-data-table(
            :headers="headers"
            :items="items"
            :customFilter="customFilter"
            :search="search"
            v-model="selected"
            item-key="name"
            select-all
            class="elevation-1"
          )
          template(slot="headerCell" slot-scope="props")
            v-tooltip(bottom)
              span(slot="activator") {{ props.header.text }}
              span {{ props.header.text }}
          template(slot="items" slot-scope="props")
            td
              v-checkbox(
                primary
                hide-details
                v-model="props.selected"
              )
            td(class="text-xs-right") {{ props.item.name }}
            td(class="text-xs-right") {{ props.item.component }}
            td(class="text-xs-right") {{ props.item.group }}
          template(slot="footer")
            td(colspan="100%")
              v-tooltip(
                right
                debounce="300"
                dark
              )
                  v-btn(
                    icon
                    color="primary"
                    dark
                    @click="copyMarkup"
                    slot="activator"
                  )
                    v-icon content_copy
                  span Copy components
</template>

<script>
export default {
  data() {
    return {
      search: '',
      pagination: {},
      selected: [],
      components: '',
      headers: [
        { text: 'Markup', value: 'markup' },
        { text: 'Component Name', value: 'component' },
        { text: 'Component Group', value: 'group' },
      ],
      // component list.
      items: [
        { value: false, name: 'v-alert', component: 'VAlert', group: 'VAlert' },
        { value: false, name: 'v-app', component: 'VApp', group: 'VApp' },
        { value: false, name: 'v-avatar', component: 'VAvatar', group: 'VAvatar' },
        { value: false, name: 'v-badge', component: 'VBadge', group: 'VBadge' },
        { value: false, name: 'v-bottom-nav', component: 'VBottomNav', group: 'VBottomNav' },
        { value: false, name: 'v-bottom-sheet', component: 'VBottomSheet', group: 'VBottomSheet' },
        { value: false, name: 'v-breadcrumbs', component: 'VBreadcrumbs', group: 'VBreadcrumbs' },
        { value: false, name: 'v-breadcrumbs-item', component: 'VBreadcrumbs', group: 'VBreadcrumbs' },
        { value: false, name: 'v-btn', component: 'VBtn', group: 'VBtn' },
        { value: false, name: 'v-btn-toggle', component: 'VBtnToggle', group: 'VBtnToggle' },
        { value: false, name: 'v-card', component: 'VCard', group: 'VCard' },
        { value: false, name: 'v-card-title', component: 'VCard', group: 'VCard' },
        { value: false, name: 'v-card-media', component: 'VCard', group: 'VCard' },
        { value: false, name: 'v-carousel', component: 'VCarousel', group: 'VCarousel' },
        { value: false, name: 'v-checkbox', component: 'VCheckbox', group: 'VCheckbox' },
        { value: false, name: 'v-chip', component: 'VChip', group: 'VChip' },
        { value: false, name: 'v-data-table', component: 'VDataTable', group: 'VDataTable' },
        { value: false, name: 'v-edit-dialog', component: 'VDataTable', group: 'VDataTable' },
        { value: false, name: 'v-date-picker', component: 'VDatePicker', group: 'VDatePicker' },
        { value: false, name: 'v-dialog', component: 'VDialog', group: 'VDialog' },
        { value: false, name: 'v-divider', component: 'VDivider', group: 'VDivider' },
        { value: false, name: 'v-expansion-panel', component: 'VExpansionPanel', group: 'VExpansionPanel' },
        { value: false, name: 'v-expansion-panel-content', component: 'VExpansionPanel', group: 'VExpansionPanel' },
        { value: false, name: 'v-footer', component: 'VFooter', group: 'VFooter' },
        { value: false, name: 'v-form', component: 'VForm', group: 'VForm' },
        { value: false, name: 'v-footer', component: 'VFooter', group: 'VFooter' },
        { value: false, name: 'v-layout', component: 'VGrid', group: 'VGrid' },
        { value: false, name: 'v-flex', component: 'VGrid', group: 'VGrid' },
        { value: false, name: 'v-container', component: 'VGrid', group: 'VGrid' },
        { value: false, name: 'v-content', component: 'VGrid', group: 'VGrid' },
        { value: false, name: 'v-icon', component: 'VIcon', group: 'VIcon' },
        { value: false, name: 'v-list', component: 'VList', group: 'VList' },
        { value: false, name: 'v-list-group', component: 'VList', group: 'VList' },
        { value: false, name: 'v-list-tile', component: 'VList', group: 'VList' },
        { value: false, name: 'v-list-tile-action', component: 'VList', group: 'VList' },
        { value: false, name: 'v-menu', component: 'VMenu', group: 'VMenu' },
        { value: false, name: 'v-navigation-drawer', component: 'VNavigationDrawer', group: 'VNavigationDrawer' },
        { value: false, name: 'v-pagination', component: 'VPagination', group: 'VPagination' },
        { value: false, name: 'v-parallax', component: 'VParallax', group: 'VParallax' },
        { value: false, name: 'v-progress-circular', component: 'VProgressCircular', group: 'VProgressCircular' },
        { value: false, name: 'v-progress-linear', component: 'VProgressLinear', group: 'VProgressLinear' },
        { value: false, name: 'v-radio', component: 'VRadioGroup', group: 'VRadioGroup' },
        { value: false, name: 'v-radio-group', component: 'VRadioGroup', group: 'VRadioGroup' },
        { value: false, name: 'v-select', component: 'VSelect', group: 'VSelect' },
        { value: false, name: 'v-slider', component: 'VSlider', group: 'VSlider' },
        { value: false, name: 'v-snackbar', component: 'VSnackbar', group: 'VSnackbar' },
        { value: false, name: 'v-speed-dial', component: 'VSpeedDial', group: 'VSpeedDial' },
        { value: false, name: 'v-stepper', component: 'VStepper', group: 'VStepper' },
        { value: false, name: 'v-stepper-content', component: 'VStepper', group: 'VStepper' },
        { value: false, name: 'v-stepper-step', component: 'VStepper', group: 'VStepper' },
        { value: false, name: 'v-subheader', component: 'VSubheader', group: 'VSubheader' },
        { value: false, name: 'v-switch', component: 'VSwitch', group: 'VSwitch' },
        { value: false, name: 'v-system-bar', component: 'VSystemBar', group: 'VSystemBar' },
        { value: false, name: 'v-tabs', component: 'VTabs', group: 'VTabs' },
        { value: false, name: 'v-tabs-bar', component: 'VTabs', group: 'VTabs' },
        { value: false, name: 'v-tabs-content', component: 'VTabs', group: 'VTabs' },
        { value: false, name: 'v-tabs-item', component: 'VTabs', group: 'VTabs' },
        { value: false, name: 'v-tabs-items', component: 'VTabs', group: 'VTabs' },
        { value: false, name: 'v-tabs-slider', component: 'VTabs', group: 'VTabs' },
        { value: false, name: 'v-text-field', component: 'VTextField', group: 'VTextField' },
        { value: false, name: 'v-time-picker', component: 'VTimePicker', group: 'VTimePicker' },
        { value: false, name: 'v-toolbar', component: 'VToolbar', group: 'VToolbar' },
        { value: false, name: 'v-toolbar-side-icon', component: 'VToolbar', group: 'VToolbar' },
        { value: false, name: 'v-tooltip', component: 'VTooltip', group: 'VTooltip' },
        { value: false, name: 'transitions', component: 'transitions', group: 'transitions' },
      ],
    };
  },
  computed: {
    copy() {
      return this.generateCustomComponent();
    },
  },
  methods: {
    customFilter(items, search, filter) {
      if (!search) return items;
      search = search.toString().toLowerCase()
      return items.filter(item => filter(item['name'], search) || filter(item['component'], search)) || filter(item['group'], search);
    },
    generateCustomComponent() {
      this.components = '';
      const unique = [...(new Set(this.selected.map(({ component }) => component)))];
      unique.forEach(element => this.components += `${element}, `);
      return `import Vue from 'vue'; import { Vuetify, ${this.components}transitions } from 'vuetify'; import App from './App.vue'; Vue.use(Vuetify, { components: { ${this.components}transitions }, });`;
    },
    copyMarkup () {
      this.$refs.copy.select();
      document.execCommand('copy');
    }
  }
};
</script>