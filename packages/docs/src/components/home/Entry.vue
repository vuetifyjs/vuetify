<template>
  <v-responsive class="pb-5">
    <v-container class="text-left position-relative">
      <v-row
        class="py-16 align-center justify-center"
      >
        <v-col cols="12" md="6">
          <v-chip color="primary">
            {{ t('home.entry.chip') }}
          </v-chip>

          <h1 class="text-display-medium text-md-display-large font-weight-bold my-5">
            {{ t('home.entry.title-prefix') }} <br class="d-none d-md-block"> <span class="text-primary">{{ t('home.entry.title-highlight') }}</span> {{ t('home.entry.title-suffix') }}
          </h1>

          <h2 class="text-title-large font-weight-regular text-medium-emphasis my-5">
            {{ t('home.entry.subtitle') }}
          </h2>

          <div class="d-flex flex-wrap ga-4 justify-start my-5">
            <v-btn
              :text="t('home.get-started')"
              :to="rpath('/getting-started/installation/')"
              class="text-none"
              color="primary"
              rounded="lg"
              size="large"
              flat
            />

            <v-btn
              :text="t('home.why-vuetify')"
              :to="rpath('/getting-started/why-vuetify')"
              append-icon="$vuetify-outline"
              class="text-none"
              color="primary"
              rounded="lg"
              size="large"
              variant="tonal"
              flat
            />
          </div>

          <div class="d-flex flex-wrap ga-4 align-center">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="px-2 py-2 d-inline-flex align-center text-mono text-body-medium text-no-wrap"
                color="surface"
                rounded="lg"
                border
                v-bind="props"
              >

                <v-menu offset="4">
                  <template #activator="{ props: iconProps, isActive }">
                    <v-icon-btn
                      v-bind="iconProps"
                      :rotate="isActive ? 180 : 0"
                      class="mr-2"
                      color="primary"
                      cursor="pointer"
                      height="20"
                      icon="mdi-chevron-down"
                      icon-size="16"
                      rounded="lg"
                      variant="text"
                      width="20"
                    />
                  </template>

                  <v-list density="compact" rounded="lg">
                    <v-list-item
                      v-for="manager in packageManagers"
                      :key="manager"
                      :title="manager"
                      :value="manager"
                      @click="selectedPackageManager = manager"
                    />
                  </v-list>
                </v-menu>

                {{ commands[selectedPackageManager] }}

                <span class="text-primary font-weight-medium ms-2">
                  vuetify
                </span>

                <v-icon
                  :color="isCopying ? 'success' : 'medium-emphasis'"
                  :icon="isCopying ? 'mdi-check' : 'mdi-clipboard-text-outline'"
                  :style="{
                    opacity: isHovering || isCopying ? 1 : 0,
                  }"
                  class="ms-auto"
                  size="17"
                  @click="copy"
                />
              </v-sheet>
            </v-hover>

            <v-sheet
              class="pa-1 ps-3 d-inline-flex align-center justify-space-between"
              color="surface"
              rounded="lg"
              border
            >
              <span class="text-body-medium me-2">{{ t('home.entry.latest') }}</span>

              <AppVersionBtn />
            </v-sheet>
          </div>

        </v-col>

        <v-col class="d-md-block d-none" cols="12" md="6">
          <v-sheet class="rounded-lg elevation-10" theme="dark">
            <AppMarkup
              :code="code"
              class="rounded-lg pa-5 bg-black"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <HomeCommonGradient color="primary" />
  </v-responsive>
</template>

<script setup lang="ts">
  const { t } = useI18n()

  const code = computed(() => [
    {
      name: 'template',
      content: `<template>
  <v-app>
    <v-container>
      <v-btn color="primary">
        ${t('home.entry.hello-vuetify')}
      </v-btn>
    </v-container>
  </v-app>
</template>`,
      language: 'html',
    },
  ])

  const packageManagers = ['npm', 'pnpm', 'yarn', 'bun']
  const randomPackageManager = packageManagers[Math.floor(Math.random() * packageManagers.length)]

  const commands: Record<string, string> = {
    pnpm: 'pnpm create',
    yarn: 'yarn create',
    npm: 'npm create',
    bun: 'bun create',
  }

  const isCopying = shallowRef(false)
  const selectedPackageManager = shallowRef(randomPackageManager)

  function copy () {
    isCopying.value = true

    navigator.clipboard.writeText(`${commands[selectedPackageManager.value]} vuetify`)

    setTimeout(() => {
      isCopying.value = false
    }, 1000)
  }
</script>

<style lang="sass" scoped>
  @use 'sass:map'
  @use 'vuetify/settings'

  .code-shadow
    box-shadow: 10px 10px 100px -5px #00000044

  .font-weight-bold
    font-weight: map.get(settings.$font-weights, 'bold') !important
</style>
