<template>
  <div>
    <v-toolbar
      border="b"
      color="surface"
      density="compact"
      flat
    >
      <v-slide-group
        v-model="model"
        class="flex-grow-1"
        mandatory
        show-arrows="always"
      >
        <v-slide-group-item value="default">
          <template #default="{ isSelected, toggle }">
            <v-btn
              :active="isSelected"
              height="56"
              @click="toggle"
            >
              Default
            </v-btn>
          </template>
        </v-slide-group-item>

        <v-slide-group-item
          v-for="(option, i) in options"
          :key="i"
          :value="option"
        >
          <template #default="{ isSelected, toggle }">
            <v-btn
              :active="isSelected"
              height="56"
              @click="toggle"
            >
              {{ option }}
            </v-btn>
          </template>
        </v-slide-group-item>
      </v-slide-group>

      <v-responsive
        class="border-s align-center bg-surface"
        height="48"
        max-width="250"
      >
        <div class="d-flex align-center justify-space-between">
          <div class="ml-4">
            <app-headline
              v-show="tune"
              path="options"
            />
          </div>

          <div>
            <v-tooltip location="bottom">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  :icon="!show ? 'mdi-code-tags' : 'mdi-chevron-up'"
                  class="mr-1 text-medium-emphasis"
                  density="comfortable"
                  v-bind="activatorProps"
                  @click="show = !show"
                />
              </template>

              <span>{{ show ? 'Hide code' : 'Show code' }}</span>
            </v-tooltip>
          </div>
        </div>
      </v-responsive>
    </v-toolbar>

    <v-layout>
      <v-main>
        <v-sheet
          class="pa-14 d-flex align-center"
          min-height="300"
          rounded="0"
        >
          <div class="flex-fill">
            <slot />
          </div>
        </v-sheet>
      </v-main>

      <v-navigation-drawer
        v-model="tune"
        permanent
        name="tune"
        location="right"
        width="250"
      >
        <v-list>
          <div class="px-4 usage-example pt-2">
            <v-defaults-provider
              :defaults="{
                global: {
                  density: 'compact',
                  hideDetails: true,
                }
              }"
            >
              <slot name="configuration" />
            </v-defaults-provider>
          </div>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <v-expand-transition>
      <div v-if="show">
        <div class="pa-3">
          <app-markup :code="code" />
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'

  const props = defineProps({
    name: String,
    code: String,
    options: {
      type: Array,
      default: () => ([]),
    },
    modelValue: {
      type: [Array, String],
      default: () => ([]),
      required: true,
    },
  })

  const emit = defineEmits({
    'update:modelValue': val => val,
    'update:tuneValue': val => val,
  })

  const tune = ref(true)
  const show = ref(true)
  const model = computed({
    get () {
      return props.modelValue
    },
    set (val) {
      emit('update:modelValue', val)
    },
  })
</script>

<style lang="sass">
  .usage-example
    .v-text-field
      margin-bottom: 8px
</style>
