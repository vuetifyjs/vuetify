<template>
  <div>
    <app-title
      v-if="title"
      :path="title"
      class="mb-0 ps-1"
    />

    <v-item-group
      class="mx-auto"
      mandatory
      :multiple="multiple"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <v-row>
        <v-col
          v-for="({ icon, text }) in items"
          :key="text"
          cols="6"
        >
          <v-item :value="text">
            <template #default="{ isSelected, toggle }">
              <v-card
                :ref="'item-' + text"
                :color="isSelected ? 'primary' : `grey-${isDark ? 'darken' : 'lighten'}-3`"
                class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center"
                rounded
                variant="flat"
                @click="toggle"
              >
                {{ t(text) }}

                <v-spacer />

                <v-icon :icon="icon" />
              </v-card>
            </template>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, PropType } from 'vue'

  defineProps({
    title: String,
    modelValue: null,
    items: Array as PropType<{ icon: string, text: string }[]>,
    multiple: Boolean,
  })

  defineEmits({
    'update:modelValue': (value: string) => true,
  })

  const { t } = useI18n()
  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)
</script>

<style lang="sass">
  // Bug in Vuetify, ripple isn't inheriting border-radius
  .v-card--group::before
    border-radius: inherit
</style>
