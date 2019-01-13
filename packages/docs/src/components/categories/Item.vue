<template>
  <v-card
    :to="value.to"
    hover
    @click.native="$ga.event('categories', 'click', $route.path, value.text)"
  >
    <v-card-title class="title pb-0 align-center">
      <span v-text="value.title" />
      <template v-if="icon">
        <v-spacer />
        <v-icon
          size="28"
          v-text="icon"
        />
      </template>
    </v-card-title>
    <v-card-text
      class="grey--text text--darken-1"
      v-text="value.text"
    />
  </v-card>
</template>

<script>
  // Utilities
  import camelCase from 'lodash/camelCase'

  const ICON_MAP = {
    autocomplete: 'mdi-format-list-checks',
    badge: 'mdi-tag',
    bottomSheet: 'mdi-view-split-horizontal',
    button: 'mdi-card',
    buttonToggle: 'mdi-apple-keyboard-option',
    card: 'mdi-card',
    checkbox: 'mdi-format-list-checkbox',
    chip: 'mdi-account-circle',
    dataIterator: 'mdi-table-edit',
    datepicker: 'mdi-calendar-range',
    dialog: 'mdi-open-in-new',
    divider: 'mdi-view-headline',
    expansionPanel: 'mdi-view-day',
    forms: 'mdi-format-list-bulleted-type',
    gridList: 'mdi-view-dashboard',
    icon: 'mdi-material-design',
    input: 'mdi-format-title',
    list: 'mdi-format-list-numbered',
    menu: 'mdi-format-float-center',
    navigationDrawer: 'mdi-view-quilt',
    paginator: 'mdi-page-next',
    progressBar: 'mdi-minus',
    progressSpinner: 'mdi-refresh',
    radioButton: 'mdi-format-list-bulleted',
    select: 'mdi-format-float-right',
    slider: 'mdi-drag-vertical',
    slideToggle: 'mdi-toggle-switch',
    snackbar: 'mdi-format-line-style',
    stepper: 'mdi-debug-step-over',
    table: 'mdi-table-search',
    tabs: 'mdi-table-row',
    toolbar: 'mdi-format-float-left',
    tooltip: 'mdi-information',
    tree: 'mdi-file-tree'
  }

  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },

    computed: {
      icon () {
        return ICON_MAP[camelCase(this.value.title)]
      }
    }
  }
</script>
