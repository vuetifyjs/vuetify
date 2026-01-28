<template>
  <v-responsive class="py-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container>
      <HomeCommonTitle
        :description="t('home.tooling.description')"
        :subtitle="t('home.tooling.subtitle')"
        :title="t('home.tooling.title')"
        class="mb-10"
      >

        <template #top>
          <v-img :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/vloader.png`" class="mb-4" height="64" />
        </template>
      </HomeCommonTitle>

      <v-card class="mx-auto" max-width="900" rounded="xl" border flat>
        <v-table density="comfortable" hover>
          <thead>
            <tr>
              <th class="text-left">{{ t('home.tooling.headers.tool') }}</th>
              <th class="text-left">{{ t('home.tooling.headers.type') }}</th>
              <th class="text-left d-none d-sm-table-cell">{{ t('home.tooling.headers.description') }}</th>
            </tr>
          </thead>

          <tbody class="text-start">
            <v-hover v-for="(item, i) in tools" :key="i">
              <template #default="{ isHovering, props: hoverProps }">
                <tr v-bind="hoverProps">
                  <td>
                    <div class="d-flex align-center ga-3 py-2">
                      <v-avatar :color="item.color" rounded="xl" variant="tonal">
                        <v-icon :icon="item.icon" />
                      </v-avatar>

                      <div>
                        <a
                          :href="item.href"
                          class="font-weight-medium inline-block on-surface text-decoration-none"
                          rel="noopener"
                          target="_blank"
                        >
                          {{ item.title }}

                          <v-icon :class="isHovering ? 'opacity-100' : 'opacity-0'" icon="mdi-open-in-new" size="xs" />
                        </a>
                        <div class="text-body-small text-medium-emphasis d-sm-none">{{ item.type }}</div>
                      </div>
                    </div>
                  </td>

                  <td class="text-no-wrap">
                    <v-chip :color="item.color" :text="item.type" size="small" variant="tonal" />
                  </td>

                  <td class="text-medium-emphasis d-none d-sm-table-cell">
                    {{ item.description }}
                  </td>
                </tr>
              </template></v-hover>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const { t } = useI18n()

  const tools = computed(() => [
    {
      title: t('home.tooling.tools.create.title'),
      icon: '$vuetify-create',
      type: t('home.tooling.tools.create.type'),
      color: 'info',
      description: t('home.tooling.tools.create.description'),
      href: 'https://github.com/vuetifyjs/create/',
    },
    {
      title: t('home.tooling.tools.cli.title'),
      // TODO: update once cli icon added to @vuetify/one
      // icon: '$vuetify-cli',
      icon: 'mdi-console',
      type: t('home.tooling.tools.cli.type'),
      color: 'info',
      description: t('home.tooling.tools.cli.description'),
      href: 'https://github.com/vuetifyjs/cli/',
    },
    {
      title: t('home.tooling.tools.uikit.title'),
      icon: '$vuetify-figma',
      type: t('home.tooling.tools.uikit.type'),
      color: 'purple',
      description: t('home.tooling.tools.uikit.description'),
      href: 'https://store.vuetifyjs.com/products/vuetify-ui-kit-figma',
    },
    {
      title: t('home.tooling.tools.eslint-config.title'),
      icon: 'mdi-code-tags-check',
      type: t('home.tooling.tools.eslint-config.type'),
      color: 'success',
      description: t('home.tooling.tools.eslint-config.description'),
      href: 'https://github.com/vuetifyjs/eslint-config-vuetify',
    },
    {
      title: t('home.tooling.tools.eslint-plugin.title'),
      icon: 'mdi-arrow-up-bold-circle-outline',
      type: t('home.tooling.tools.eslint-plugin.type'),
      color: 'info',
      description: t('home.tooling.tools.eslint-plugin.description'),
      href: 'https://github.com/vuetifyjs/eslint-plugin-vuetify',
    },
    {
      title: t('home.tooling.tools.loader.title'),
      icon: 'mdi-package-variant-closed',
      type: t('home.tooling.tools.loader.type'),
      color: 'warning',
      description: t('home.tooling.tools.loader.description'),
      href: 'https://github.com/vuetifyjs/vuetify-loader',
    },
  ])
</script>
