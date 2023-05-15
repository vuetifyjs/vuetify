<template>
  <div>
    <v-toolbar
      :color="isDark ? '#1F1F1F' : 'grey-lighten-4'"
      border="b"
      class="ps-1"
      flat
      height="44"
    >
      <v-slide-group
        v-model="model"
        class="flex-grow-1"
        mandatory
        show-arrows
      >
        <v-slide-group-item value="default">
          <template #default="{ isSelected, toggle }">
            <v-btn
              :active="isSelected"
              class="ma-1 text-none"
              size="small"
              variant="text"
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
              class="ma-1 text-none"
              size="small"
              variant="text"
              @click="toggle"
            >
              {{ upperFirst(option) }}
            </v-btn>
          </template>
        </v-slide-group-item>
      </v-slide-group>

      <v-tooltip location="bottom">
        <template #activator="{ props: activatorProps }">
          <v-btn
            :icon="!show ? 'mdi-code-tags' : 'mdi-chevron-up'"
            class="me-1 text-medium-emphasis"
            density="comfortable"
            v-bind="activatorProps"
            @click="show = !show"
          />
        </template>

        <span>{{ show ? t('hide-source') : t('view-source') }}</span>
      </v-tooltip>
    </v-toolbar>

    <v-layout :class="['border-b', !show && 'border-opacity-0']">
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
        v-if="display.smAndUp.value && $slots.configuration"
        v-model="tune"
        location="right"
        name="tune"
        permanent
        touchless
        width="250"
      >
        <v-list>
          <div class="px-4 usage-example pt-2">
            <v-defaults-provider
              :defaults="{
                global: {
                  density: 'compact',
                  hideDetails: true,
                  step: 1,
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
      <div v-if="show && display.mdAndUp.value">
        <div class="pa-3">
          <app-markup :code="code" />
        </div>

        <div v-if="script" class="pa-3">
          <app-markup :code="script" language="js" />
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
  // Composables
  import { useDisplay, useTheme } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed, ref } from 'vue'
  import { upperFirst } from 'lodash-es'

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
    script: String,
  })
  const emit = defineEmits(['update:modelValue', 'update:tuneValue'])

  const display = useDisplay()
  const { t } = useI18n()
  const theme = useTheme()

  const tune = ref(true)
  const show = ref(true)
  const isDark = computed(() => {
    return theme.current.value.dark
  })

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

  // Hack to get around navigation-drawer default bgColor
  // TODO: find a better way
  .v-select__content .v-list
    background: rgb(var(--v-theme-surface)) !important
</style>
