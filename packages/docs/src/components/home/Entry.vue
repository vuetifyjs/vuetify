<template>
  <v-responsive>
    <v-container class="text-left position-relative">
      <v-row
        align="center"
        class="py-16"
        justify="center"
      >
        <v-col cols="12" md="6">
          <v-chip color="primary">
            #1 Vue UI Library
          </v-chip>

          <h1 class="text-h3 text-md-h2 font-weight-bold my-5">
            A complete <br class="d-none d-md-block"> <span class="text-primary">design system</span> that works.
          </h1>

          <h2 class="text-h6 font-weight-regular text-medium-emphasis my-5">
            Built by the Vue Community, Backed by Sponsors.
          </h2>

          <div class="d-flex flex-wrap ga-4 justify-start my-5">
            <v-btn
              :to="rpath('/getting-started/installation/')"
              class="text-none"
              color="primary"
              rounded="lg"
              size="large"
              text="Get started"
              flat
            />

            <v-btn
              append-icon="mdi-chevron-right"
              class="text-none"
              color="primary"
              rounded="lg"
              size="large"
              text="Explore Ecosystem"
              variant="tonal"
              flat
            />
          </div>

          <div class="d-flex flex-wrap ga-4 align-center">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="px-2 py-2 d-inline-flex align-center text-mono text-body-2 text-no-wrap"
                color="surface"
                border
                rounded
                v-bind="props"
              >

                <v-menu offset="4">
                  <template #activator="{ props: iconProps }">
                    <v-icon-btn
                      v-bind="iconProps"
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
                      :value="manager"
                      @click="selectedPackageManager = manager"
                    >
                      <v-list-item-title>
                        {{ manager }}
                      </v-list-item-title>
                    </v-list-item>
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
              border
              rounded
            >
              <span class="text-body-2 me-2">Latest</span>

              <AppVersionBtn />
            </v-sheet>
          </div>

        </v-col>

        <v-col class="d-md-block d-none" cols="12" md="6">
          <v-sheet class="rounded-lg bg-surface elevation-10">
            <AppMarkup
              :code="code"
              class="bg-black rounded-lg pa-5"
              open-in-playground
            />
          </v-sheet>
        </v-col>
      </v-row>

      <HomeSpecialSponsor />
    </v-container>

    <HomeBgGradient color="primary" />
  </v-responsive>
</template>

<script setup lang="ts">
  const codeContent = `<template>
  <v-app>
    <v-container>
      <v-btn color="primary">
        Hello Vuetify!
      </v-btn>
    </v-container>
  </v-app>
</template>`

  const code = [
    {
      name: 'template',
      content: codeContent,
      language: 'html',
    },
  ]

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

<style scoped>
  .code-shadow {
    box-shadow: 10px 10px 100px -5px #00000044;
  }
</style>
