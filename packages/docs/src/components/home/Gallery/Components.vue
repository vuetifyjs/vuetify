<template>
  <v-theme-provider :theme="currentTheme">
    <v-defaults-provider :defaults="defaults">
      <v-card class="py-16" elevation="0">
        <v-container class="pt-0">
          <HomeBgGradient />

          <h4 class="text-h4 font-weight-bold mb-5">
            Component Gallery
          </h4>

          <v-responsive class="mx-auto mb-10" max-width="700">
            <h6 class="text-h6 font-weight-regular text-medium-emphasis">
              Vuetify provides a comprehensive collection of components that can be used to build your application.
            </h6>
          </v-responsive>

          <v-sheet class="mx-auto" color="transparent" max-width="1200px">
            <v-card
              class="my-1"
              color="transparent"
              elevation="0"
              rounded="lg"
            >
              <div class="d-flex flex-wrap align-center justify-center">
                <div
                  v-for="(config, themeName) in themes"
                  :key="themeName"
                  class="d-flex flex-column align-center justify-center mr-3 my-3"
                >
                  <v-avatar
                    :color="config.colors.primary"
                    class="d-flex align-center justify-center cursor-pointer"
                    height="50"
                    width="50"
                    @click="currentTheme = themeName"
                  >
                    <v-icon v-if="currentTheme === themeName" icon="mdi-check" />
                  </v-avatar>
                </div>
              </div>
            </v-card>

            <v-card class="text-left" elevation="5" rounded="lg">
              <v-layout>
                <v-system-bar class="justify-center" theme="dark" window>
                  <div class="position-absolute left-0 ml-3">
                    <v-avatar class="mx-1" color="error" size="12" />
                    <v-avatar class="mx-1" color="warning" size="12" />
                    <v-avatar class="mx-1" color="success" size="12" />
                  </div>

                  <v-icon class="mx-2" icon="mdi-earth" />

                  <span>Vuetify Gallery</span>
                </v-system-bar>

                <v-app-bar class="ps-4" color="primary" elevation="0" flat>
                  <v-app-bar-nav-icon class="mr-3" @click="drawer = !drawer" />

                  <v-avatar
                    class="pa-1"
                    color="surface"
                    image="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
                    size="40"
                  />

                  <v-app-bar-title>Vuetify</v-app-bar-title>

                  <template #append>
                    <v-btn icon="mdi-bell-outline" />

                    <v-divider class="mx-4 align-self-center" length="40%" vertical />

                    <v-btn class="text-none me-1 px-3" height="48" slim>
                      <template #prepend>
                        <v-avatar color="surface-light" image="https://cdn.vuetifyjs.com/images/john.png" size="32" start />
                      </template>

                      <span class="hidden-sm-and-down">John Leider</span>

                      <v-menu activator="parent">
                        <v-list density="compact" nav>
                          <v-list-item title="Settings" link />

                          <v-list-item title="Logout" link />
                        </v-list>
                      </v-menu>

                      <template #append>
                        <v-icon icon="mdi-chevron-down" />
                      </template>
                    </v-btn>
                  </template>
                </v-app-bar>

                <v-navigation-drawer
                  v-model="drawer"
                  :rail="selectedComponentCategory.hasRailsDrawer"
                  color="surface-bright"
                >
                  <v-list
                    :items="components"
                    density="compact"
                    nav
                  >
                    <v-list-item
                      v-for="(item, i) in components"
                      :key="i"
                      v-bind="item"
                      :active="item.title === selectedComponentCategory.title"
                      active-class="text-primary"
                      nav
                      @click="selectedComponentCategory = item"
                    />
                  </v-list>

                  <template #append>
                    <v-list-item
                      class="ma-2"
                      prepend-icon="mdi-cog-outline"
                      title="Settings"
                      link
                      nav
                    />
                  </template>
                </v-navigation-drawer>

                <v-main>
                  <v-sheet
                    border="sm"
                    class="overflow-y-auto"
                    height="600"
                    max-width="100%"
                  >
                    <v-slide-x-transition>
                      <component
                        :is="selectedComponentCategory.component"
                      />
                    </v-slide-x-transition>
                  </v-sheet>
                </v-main>
              </v-layout>
            </v-card>
          </v-sheet>
        </v-container>
      </v-card>
    </v-defaults-provider>
  </v-theme-provider>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'

  const Form = defineAsyncComponent(() => import('@/components/home/Gallery/Form.vue'))
  const Data = defineAsyncComponent(() => import('@/components/home/Gallery/Data.vue'))
  const Chat = defineAsyncComponent(() => import('@/components/home/Gallery/Chat/Chat.vue'))

  const theme = useTheme()

  const defaults = {
    VCard: {
      elevation: 5,
    },
  }

  const themes = {
    light: theme.themes.value.light,
    dark: theme.themes.value.dark,
    nebula: theme.themes.value.nebula,
    odyssey: theme.themes.value.odyssey,
    blackguard: theme.themes.value.blackguard,
  }

  const drawer = ref(true)
  const currentTheme = ref(theme.name.value)

  const components: { title: string; prependIcon: string; component?: Component; hasRailsDrawer?: boolean, link?: boolean }[] = [
    {
      title: 'Dashboard',
      prependIcon: 'mdi-view-dashboard-outline',
      link: true,
      component: Data,
    },
    {
      title: 'Form',
      prependIcon: 'mdi-circle-edit-outline',
      link: true,
      component: Form,
    },
    {
      title: 'Chat',
      component: Chat,
      link: true,
      prependIcon: 'mdi-message-outline',
      hasRailsDrawer: true,
    },
  ]

  const selectedComponentCategory = ref(components[0])
</script>

<style scoped>
  /* Make scrollbar thinner */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(var(--v-theme-on-surface), 0.3) transparent;
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(var(--v-theme-on-surface), 0.3);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(var(--v-theme-on-surface), 0.5);
  }
</style>
