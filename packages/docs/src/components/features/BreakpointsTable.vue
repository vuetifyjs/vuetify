<template>
  <app-sheet class="mb-12 overflow-hidden">
    <v-table>
      <caption class="pa-4">{{ t('breakpoints-table.caption') }}</caption>

      <thead>
        <tr class="text-start">
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
              :icon="breakpoint.icon"
              color="medium-emphasis"
              start
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
            class="text-end text-medium-emphasis"
            colspan="4"
          >
            <small class="d-block me-n1 mb-n6">
              <a
                class="text-decoration-none d-inline-flex align-center"
                href="https://material.io/design/layout/responsive-layout-grid.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                <v-icon
                  class="me-1"
                  icon="mdi-material-design"
                  size="small"
                  style="color: inherit;"
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

<script setup>
  // Composables
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
      range: '960px > < 1280px',
    },
    {
      icon: 'mdi-monitor-small',
      device: 'large',
      code: 'lg',
      type: 'breakpoints-table.desktop',
      range: '1280px > < 1920px',
    },
    {
      icon: 'mdi-monitor',
      device: 'extra-large',
      code: 'xl',
      type: 'breakpoints-table.large-to-extra-large',
      range: '1920px > < 2560px',
    },
    {
      icon: 'mdi-monitor-screenshot',
      device: 'extra-extra-large',
      code: 'xxl',
      type: 'breakpoints-table.extra-large-to-extra-extra-large',
      range: '> 2560px',
    },
  ]

  const headers = [
    'device',
    'code',
    'type',
    'range',
  ]

  const { t } = useI18n()
</script>
