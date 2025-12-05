<template>
  <v-responsive class="py-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container>
      <HomeCommonTitle
        class="mb-10"
        description="Vuetify provides a suite of tools for managing your Vuetify projects."
        subtitle="Tools & Resources"
        title="Vuetify Tooling"
      >

        <template #top>
          <v-img :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/vloader.png`" class="mb-4" height="64" />
        </template>
      </HomeCommonTitle>

      <v-card class="mx-auto" max-width="900" rounded="xl" border flat>
        <v-table density="comfortable" hover>
          <thead>
            <tr>
              <th class="text-left">Tool</th>
              <th class="text-left">Type</th>
              <th class="text-left d-none d-sm-table-cell">Description</th>
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
                        <div class="text-caption text-medium-emphasis d-sm-none">{{ item.type }}</div>
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
  const tools = [
    {
      title: 'Vuetify Create',
      icon: 'mdi-console',
      type: 'CLI',
      color: 'success',
      description: 'Scaffold your next Vuetify application with just a few commands.',
      href: 'https://github.com/vuetifyjs/create/',
    },
    {
      title: 'Vuetify UI Kit',
      icon: 'mdi-palette-outline',
      type: 'Design',
      color: 'purple',
      description: 'Figma UI Kit based on Material Design for creating custom components.',
      href: 'https://github.com/vuetifyjs/create/',
    },
    {
      title: 'Vuetify ESLint Config',
      icon: 'mdi-code-tags-check',
      type: 'Linting',
      color: 'info',
      description: 'Opinionated ESLint config to keep your code clean and consistent.',
      href: 'https://github.com/vuetifyjs/eslint-config-vuetify',
    },
    {
      title: 'Vuetify ESLint Plugin',
      icon: 'mdi-arrow-up-bold-circle-outline',
      type: 'Linting',
      color: 'info',
      description: 'Automated version upgrade plugin for seamless migrations.',
      href: 'https://github.com/vuetifyjs/eslint-plugin-vuetify',
    },
    {
      title: 'Vuetify Loader',
      icon: 'mdi-package-variant-closed',
      type: 'Build',
      color: 'warning',
      description: 'Vite and Webpack loader for automatic component imports.',
      href: 'https://github.com/vuetifyjs/vuetify-loader',
    },
  ]
</script>
