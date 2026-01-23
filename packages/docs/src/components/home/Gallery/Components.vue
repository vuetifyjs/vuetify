<template>
  <v-theme-provider :theme="currentTheme">
    <v-defaults-provider :defaults="defaults">
      <v-card class="py-16" color="background" elevation="0">
        <v-container class="pt-0">
          <HomeCommonTitle
            :description="t('home.gallery.description')"
            :title="t('home.gallery.title')"
            class="mb-10"
          />

          <v-sheet class="mx-auto" color="transparent" max-width="1200">
            <v-card
              class="my-1"
              color="transparent"
              elevation="0"
              rounded="lg"
            >
              <div class="d-flex flex-wrap align-center justify-center ga-2 mb-2">
                <div
                  v-for="(config, themeName) in themeConfigs"
                  :key="themeName"
                  class="d-flex flex-column align-center justify-center"
                >
                  <v-avatar
                    :color="config.theme.colors.primary as string"
                    class="d-flex align-center justify-center cursor-pointer"
                    height="32"
                    size="32"
                    width="32"
                    @click="currentTheme = themeName"
                  >
                    <v-icon v-if="currentTheme === themeName" icon="mdi-check" />
                  </v-avatar>
                </div>

                <v-divider class="mx-2 align-self-center" length="18" vertical />

                <v-avatar
                  class="cursor-pointer"
                  size="32"
                  border
                  v-tooltip:top="density"
                  @click="cycleDensity"
                >
                  <v-icon :icon="densityIcon" size="small" />
                </v-avatar>
              </div>
            </v-card>

            <v-card class="text-left" elevation="5" rounded="lg">
              <v-layout height="700">
                <v-system-bar class="justify-center" theme="dark" window>
                  <div class="position-absolute left-0 ml-3">
                    <v-avatar class="mx-1" color="error" size="12" />
                    <v-avatar class="mx-1" color="warning" size="12" />
                    <v-avatar class="mx-1" color="success" size="12" />
                  </div>

                  <v-icon class="mx-2" icon="mdi-earth" />

                  <span>{{ t('home.gallery.system-bar') }}</span>
                </v-system-bar>

                <v-app-bar
                  v-if="!selectedComponent.isNavigationHiden"
                  class="ps-4"
                  color="primary"
                  elevation="0"
                  flat
                >
                  <v-app-bar-nav-icon class="mr-3" @click="drawer = !drawer" />

                  <v-avatar
                    class="pa-1"
                    color="surface"
                    image="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
                    size="40"
                  />

                  <v-app-bar-title>Vuetify</v-app-bar-title>

                  <template #append>
                    <v-btn class="text-none me-1 px-3" height="48" slim>
                      <template #prepend>
                        <v-avatar color="surface-light" image="https://cdn.vuetifyjs.com/docs/images/team/john.png" size="32" start />
                      </template>

                      <span class="hidden-sm-and-down">John Leider</span>

                      <v-menu activator="parent">
                        <v-list density="compact" nav>
                          <v-list-item :title="t('home.gallery.settings')" link @click="selectedComponent = settingsComponent" />

                          <v-list-item :title="t('home.gallery.logout')" @click="selectedComponent = loginComponent" />
                        </v-list>
                      </v-menu>

                      <template #append>
                        <v-icon icon="mdi-chevron-down" />
                      </template>
                    </v-btn>
                  </template>
                </v-app-bar>

                <v-navigation-drawer
                  v-if="!selectedComponent.isNavigationHiden"
                  v-model="drawer"
                  :rail="selectedComponent.hasRailsDrawer"
                  color="surface"
                >
                  <v-list
                    :items="components"
                    nav
                    slim
                  >
                    <v-list-subheader v-if="!selectedComponent.hasRailsDrawer">
                      {{ t('home.gallery.application') }}
                    </v-list-subheader>

                    <v-list-item
                      v-for="(item, i) in components"
                      :key="i"
                      v-bind="item"
                      :active="item.title === selectedComponent.title"
                      active-class="text-primary"
                      nav
                      @click="selectedComponent = item"
                    />
                  </v-list>

                  <template #append>
                    <v-list-item
                      :active="selectedComponent.title === 'Settings'"
                      :title="t('home.gallery.settings')"
                      active-class="text-primary"
                      class="ma-2"
                      prepend-icon="mdi-cog-outline"
                      link
                      nav
                      slim
                      @click="selectedComponent = settingsComponent"
                    />
                  </template>
                </v-navigation-drawer>

                <v-main scrollable>
                  <v-slide-x-transition mode="out-in">
                    <component
                      :is="selectedComponent.component"
                      @login="selectedComponent = components[0]"
                    />
                  </v-slide-x-transition>
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

  const { t } = useI18n()

  interface SelectedComponent {
    title: string
    prependIcon?: string
    component: Component
    hasRailsDrawer?: boolean
    link?: boolean
    isNavigationHiden?: boolean
  }

  const Settings = defineAsyncComponent(() => import('@/components/home/Gallery/Settings.vue'))
  const Dashboard = defineAsyncComponent(() => import('@/components/home/Gallery/Dashboard.vue'))
  const Chat = defineAsyncComponent(() => import('@/components/home/Gallery/Chat/Chat.vue'))
  const Analytics = defineAsyncComponent(() => import('@/components/home/Gallery/Analytics.vue'))
  const Login = defineAsyncComponent(() => import('@/components/home/Gallery/Login.vue'))

  type Density = 'default' | 'comfortable' | 'compact'

  const theme = useTheme()

  const themeConfigs = {
    light: { theme: theme.computedThemes.value.light, density: 'default' as Density },
    dark: { theme: theme.computedThemes.value.dark, density: 'default' as Density },
    blackguard: { theme: theme.computedThemes.value.blackguard, density: 'comfortable' as Density },
    polaris: { theme: theme.computedThemes.value.polaris, density: 'comfortable' as Density },
    nebula: { theme: theme.computedThemes.value.nebula, density: 'compact' as Density },
    odyssey: { theme: theme.computedThemes.value.odyssey, density: 'compact' as Density },
  }

  const drawer = ref(true)
  const currentTheme = ref(theme.name.value)
  const density = shallowRef<Density>('default')

  const densities: Density[] = ['default', 'comfortable', 'compact']

  const densityIcon = computed(() => {
    const icons: Record<Density, string> = {
      default: 'mdi-unfold-more-horizontal',
      comfortable: 'mdi-unfold-less-horizontal',
      compact: 'mdi-arrow-collapse-vertical',
    }
    return icons[density.value]
  })

  function cycleDensity () {
    const index = densities.indexOf(density.value)
    density.value = densities[(index + 1) % densities.length]
  }

  const defaults = computed(() => {
    const isCompact = density.value === 'compact'

    return {
      global: { density: density.value },
      VCard: { elevation: 5 },
      VAvatar: isCompact ? { size: 32 } : {},
    }
  })

  const loginComponent: SelectedComponent = {
    title: 'Login',
    component: Login,
    isNavigationHiden: true,
  }

  const settingsComponent: SelectedComponent = {
    title: 'Settings',
    prependIcon: 'mdi-cog-outline',
    link: true,
    component: Settings,
  }

  const components: SelectedComponent[] = [
    {
      title: 'Dashboard',
      prependIcon: 'mdi-view-dashboard-outline',
      link: true,
      component: Dashboard,
    },
    {
      title: 'Analytics',
      prependIcon: 'mdi-chart-line',
      link: true,
      component: Analytics,
    },
    {
      title: 'Chat',
      component: Chat,
      link: true,
      prependIcon: 'mdi-message-outline',
      hasRailsDrawer: true,
    },
  ]

  const selectedComponent = shallowRef<SelectedComponent>(components[0])
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
