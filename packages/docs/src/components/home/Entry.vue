<template>
  <v-container class="pt-12">
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <HomeLogo size="300" />
      </v-col>

      <v-col class="text-center text-lg-start" cols="auto">
        <h1 class="text-h2 font-weight-medium mb-3 ms-n1">
          Vue Component Framework
        </h1>

        <p class="mb-10 mx-auto ms-lg-0" style="max-width: 568px;">
          Vuetify is a no design skills required Open Source UI Library with beautifully handcrafted Vue Components.
        </p>

        <HomeActionBtns />

        <br>

        <v-row :justify="mdAndDown ? 'center' : undefined">
          <v-col cols="auto">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="px-2 py-2 d-inline-flex align-center text-mono text-body-2 text-no-wrap"
                color="surface"
                width="215"
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
          </v-col>

          <v-col cols="auto">
            <v-sheet
              class="pa-1 ps-3 d-inline-flex align-center justify-space-between text-caption"
              color="surface"
              width="215"
              border
              rounded
            >
              <span class="me-2">Latest Commit:</span>

              <AppCommitBtn />
            </v-sheet>
          </v-col>

          <v-col cols="auto">
            <v-sheet
              class="pa-1 ps-3 d-inline-flex align-center justify-space-between text-caption"
              color="surface"
              width="215"
              border
              rounded
            >
              <span class="me-2">Latest Release:</span>

              <AppVersionBtn />
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <VoPromotionsCardHighlight class="mb-n8" max-width="1096" slug="vuetify-snips" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
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

<style lang="sass" scoped>
  :deep(.v-card-item)
    max-width: 100%
</style>
