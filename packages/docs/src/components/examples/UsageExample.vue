<template>
  <div>
    <v-toolbar
      border="b"
      class="ps-2 pe-2"
      density="compact"
      flat
    >
      <v-btn-toggle
        v-model="model"
        class="py-2"
        color="primary"
        mandatory
      >
        <v-btn value="default" rounded="tl">Default</v-btn>

        <v-btn
          v-for="(option, i) in options"
          :key="i"
          :value="option"
          class="text-uppercase"
        >
          {{ option }}
        </v-btn>
      </v-btn-toggle>

      <v-spacer />

      <v-tooltip location="bottom">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-code-tags"
            class="mr-1 text-medium-emphasis"
            density="comfortable"
            v-bind="activatorProps"
            @click="show = !show"
          />
        </template>

        <span>Show code</span>
      </v-tooltip>

      <v-tooltip location="bottom">
        <template #activator="{ props }">
          <v-btn
            icon="mdi-tune"
            class="mr-1 text-medium-emphasis"
            density="comfortable"
            v-bind="props"
            @click="tune = !tune"
          />
        </template>

        <span>Configure more options</span>
      </v-tooltip>
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
          <v-list-subheader>Configuration</v-list-subheader>

          <div class="px-4 usage-example">
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
  import { computed, ref } from 'vue'

  const props = defineProps({
    name: String,
    code: String,
    options: {
      type: Array,
      default: () => ([]),
    },
    modelValue: {
      type: [Object, String],
      default: () => ({}),
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
