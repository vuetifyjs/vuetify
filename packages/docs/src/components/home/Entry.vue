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

      <HomeSpecialSponsor />
    </v-container>

    <HomeBgGradient color="primary" />
  </v-responsive>
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
  .code-shadow {
    box-shadow: 10px 10px 100px -5px #00000044;
  }
</style>
