<template>
  <app-sheet class="mb-12 overflow-hidden">
    <v-table>
      <caption class="pa-4">{{ t('breakpoints-table.caption') }}</caption>

      <thead>
        <tr class="text-left">
          <th v-for="header in headers" :key="header">{{ t(header) }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="breakpoint in breakpoints"
          :key="breakpoint.device"
        >
          <td>
            <v-icon
              start
              :icon="breakpoint.icon"
            />

            <span>{{ t(breakpoint.device) }}</span>
          </td>

          <td>
            <strong v-text="breakpoint.code" />
          </td>

          <td>{{ t(breakpoint.type) }}</td>

          <td>{{ breakpoint.range }}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td
            class="text-caption text-center grey--text"
            colspan="4"
          >
            <em>{{ t('breakpoints-table.footer', { size: '* -16px' }) }}</em>
          </td>
        </tr>

        <tr>
          <td
            class="text-right text--secondary"
            colspan="4"
          >
            <small class="d-block mr-n1 mb-n6">
              <a
                class="text-decoration-none d-inline-flex align-center"
                href="https://material.io/design/layout/responsive-layout-grid.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                <v-icon
                  class="mr-1"
                  small
                  style="color: inherit;"
                  icon="mdi-material-design"
                />

                {{ t('breakpoints-table.spec') }}
              </a>
            </small>
          </td>
        </tr>
      </tfoot>
    </v-table>
  </app-sheet>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  const breakpoints = [
    {
      icon: 'mdi-cellphone',
      device: 'extra-small',
      code: 'xs',
      type: 'breakpoints-table.small-to-large-handset',
      range: '< 600px',
    },
    {
      icon: 'mdi-tablet',
      device: 'small',
      code: 'sm',
      type: 'breakpoints-table.small-to-medium-tablet',
      range: '600px > < 960px',
    },
    {
      icon: 'mdi-laptop',
      device: 'medium',
      code: 'md',
      type: 'breakpoints-table.large-tablet-to-laptop',
      range: '960px > < 1264px*',
    },
    {
      icon: 'mdi-monitor',
      device: 'large',
      code: 'lg',
      type: 'desktop',
      range: '1264px > < 1904px*',
    },
    {
      icon: 'mdi-television',
      device: 'extra-large',
      code: 'xl',
      type: 'breakpoints-table.large-to-extra-large',
      range: '> 1904px*',
    },
  ]

  const headers = [
    'device',
    'code',
    'type',
    'range',
  ]

  export default defineComponent({
    name: 'BreakpointsTable',

    setup () {
      const { t } = useI18n()

      return {
        breakpoints,
        headers,
        t,
      }
    },
  })
</script>
