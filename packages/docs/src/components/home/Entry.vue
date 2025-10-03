<template>
  <v-container class="text-left position-relative">
    <v-row
      :class="mdAndDown ? 'h-auto py-10' : 'h-screen mt-n16'"
      align="center"
      justify="center"
    >

      <v-col cols="12" md="6">
        <v-chip color="primary">
          #1 Vue UI Library
        </v-chip>

        <h1 class="text-h3 text-md-h2 font-weight-bold my-5">
          A complete <br class="d-none d-md-block"> <span class="text-primary">design system</span> that works.
        </h1>

        <h2 class="text-h6  text-medium-emphasis my-5">
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

        <div class="d-flex flex-wrap ga-4 align-center my-5">
          <v-hover v-slot="{ isHovering, props }">
            <v-sheet
              class="px-2 py-2 d-inline-flex align-center text-mono text-body-2 text-no-wrap"
              color="surface"
              border
              rounded
              v-bind="props"
            >
              <v-icon
                class="me-1"
                color="medium-emphasis"
                icon="mdi-chevron-right"
                size="16"
              />

              {{ randomPackage }} create

              <span class="text-primary font-weight-medium ms-2">
                vuetify
              </span>

              <v-icon
                :icon="isCopying ? 'mdi-check' : 'mdi-clipboard-text-outline'"
                :style="{
                  opacity: isHovering || isCopying ? 1 : 0,
                }"
                class="ms-auto"
                color="medium-emphasis"
                size="17"
                @click="copy"
              />
            </v-sheet>
          </v-hover>

          <v-sheet
            class="pa-1 ps-3 d-inline-flex align-center justify-space-between text-caption"
            color="surface"
            border
            rounded
          >
            <span class="me-2">Latest</span>

            <AppVersionBtn />
          </v-sheet>
        </div>

      </v-col>

      <v-col class="d-md-block d-none" cols="12" md="6">
        <v-sheet class="rounded-lg bg-surface elevation-10">
          <AppMarkup :code="code" class="bg-black rounded-lg" />
        </v-sheet>

      </v-col>
    </v-row>

    <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
      <div aria-hidden="true" class="overflow-hidden opacity-20 w-100 h-100" />
    </div>
  </v-container>
</template>

<script setup>
  const code = `
      <template>
        <v-app>
          <v-container>
            <v-btn color="primary">
              Hello Vuetify!
            </v-btn>
          </v-container>
        </v-app>
      </template>
    `

  const isCopying = shallowRef(false)

  const { mdAndDown } = useDisplay()
  const packages = ['pnpm', 'yarn', 'npm', 'bun']
  const randomPackage = packages[Math.floor(Math.random() * packages.length)]

  function copy () {
    isCopying.value = true

    navigator.clipboard.writeText(`${randomPackage} create vuetify`)

    setTimeout(() => {
      isCopying.value = false
    }, 1000)
  }
</script>

<style scoped>
  .v-bg {
    filter: blur(200px);
    pointer-events: none;
  }

  .v-bg > div {
    background: rgb(var(--v-theme-primary));
    z-index: -10;
    clip-path: polygon(5% 20%, 15% 10%, 30% 15%, 40% 5%, 50% 25%, 60% 15%, 75% 30%, 85% 20%, 90% 40%, 70% 50%, 85% 70%, 65% 60%, 50% 85%, 35% 70%, 20% 80%, 10% 60%, 5% 40%);
  }

  .code-shadow {
    box-shadow: 10px 10px 100px -5px #00000044;
  }
</style>
