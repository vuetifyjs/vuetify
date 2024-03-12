<template>
  <v-app>
    <VoNotificationsBanner order="-1" />

    <AppSettingsDrawer />

    <AppBarBar />

    <AppDrawerDrawer />

    <AppToc />

    <AppBackToTop />

    <AppSnackbarQueue />

    <v-main>
      <slot>
        <v-container
          :style="style"
          class="pa-4 pa-sm-6 pa-md-8"
          tag="section"
          fluid
        >
          <router-view v-slot="{ Component }">
            <v-fade-transition hide-on-leave>
              <div :key="route.name">
                <component :is="Component" />
              </div>
            </v-fade-transition>
          </router-view>

          <Backmatter v-if="hasBackmatter" :key="route.name" />
        </v-container>
      </slot>
    </v-main>
  </v-app>
</template>

<script setup>
  const route = useRoute()

  const isApi = computed(() => route.meta?.category === 'api')
  const isDashboard = computed(() => route.meta?.category === 'user')
  const style = computed(() => ({ maxWidth: isApi.value || isDashboard.value ? '1368px' : '960px' }))
  const hasBackmatter = computed(() => !isApi.value && route.meta?.backmatter !== false)
</script>
