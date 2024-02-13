<template>
  <v-container class="pt-12">
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <HomeLogo size="300" />
      </v-col>

      <v-col cols="auto" class="text-center text-lg-start">
        <h1 class="text-h2 font-weight-medium mb-3 ms-n1">
          Vue Component Framework
        </h1>

        <p class="mb-10 mx-auto ms-lg-0" style="max-width: 568px;">
          Vuetify is a no design skills required Open Source UI Library with beautifully handcrafted Vue Components.
        </p>

        <HomeActionBtns />

        <br>

        <v-hover>
          <template #default="{ isHovering, props }">
            <v-sheet
              border
              class="px-2 py-2 d-inline-flex align-center text-mono text-body-2 text-no-wrap"
              color="surface"
              rounded
              width="215"
              v-bind="props"
            >
              <v-icon
                class="me-1"
                color="medium-emphasis"
                icon="mdi-chevron-right"
                size="16"
              />

              yarn create

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
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const isCopying = shallowRef(false)

  function copy () {
    isCopying.value = true

    navigator.clipboard.writeText('yarn create vuetify')

    setTimeout(() => {
      isCopying.value = false
    }, 1000)
  }
</script>
