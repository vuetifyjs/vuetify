<template>
  <app-sheet class="mb-12 overflow-hidden">
    <v-simple-table>
      <i18n
        class="pa-4"
        path="breakpoints-table.caption"
        tag="caption"
      />

      <thead>
        <tr class="text-left">
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="breakpoint in breakpoints"
          :key="breakpoint.device"
        >
          <td>
            <v-icon
              left
              v-text="breakpoint.icon"
            />

            <i18n
              :path="breakpoint.device"
              tag="span"
            />
          </td>

          <td>
            <strong v-text="breakpoint.code" />
          </td>

          <i18n
            :path="breakpoint.type"
            tag="td"
          />

          <td v-text="breakpoint.range" />
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td
            class="caption text-center grey--text"
            colspan="4"
          >
            <i18n
              path="breakpoints-table.footer"
              tag="em"
            >
              <template #size>
                * -16px
              </template>
            </i18n>
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
                >
                  $mdiMaterialDesign
                </v-icon>

                <i18n path="breakpoints-table.spec" />
              </a>
            </small>
          </td>
        </tr>
      </tfoot>
    </v-simple-table>
  </app-sheet>
</template>

<script>
  export default {
    name: 'BreakpointsTable',

    data: () => ({
      breakpoints: [
        {
          icon: '$mdiCellphoneIphone',
          device: 'extra-small',
          code: 'xs',
          type: 'breakpoints-table.small-to-large-handset',
          range: '< 600px',
        },
        {
          icon: '$mdiTablet',
          device: 'small',
          code: 'sm',
          type: 'breakpoints-table.small-to-medium-tablet',
          range: '600px > < 960px',
        },
        {
          icon: '$mdiLaptop',
          device: 'medium',
          code: 'md',
          type: 'breakpoints-table.large-tablet-to-laptop',
          range: '960px > < 1264px*',
        },
        {
          icon: '$mdiMonitor',
          device: 'large',
          code: 'lg',
          type: 'desktop',
          range: '1264px > < 1904px*',
        },
        {
          icon: '$mdiTelevision',
          device: 'extra-large',
          code: 'xl',
          type: 'breakpoints-table.large-to-extra-large',
          range: '> 1904px*',
        },
      ],
    }),
    computed: {
      headers () {
        return [
          this.$t('device'),
          this.$t('code'),
          this.$tc('type', 1),
          this.$t('range'),
        ]
      },
    },
  }
</script>
