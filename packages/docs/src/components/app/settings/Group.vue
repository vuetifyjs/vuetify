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
          <v-item v-slot="{ isSelected, toggle }" :value="text">
            <v-btn
              :ref="'item-' + text"
              :color="isSelected ? 'primary' : `grey-${isDark ? 'darken' : 'lighten'}-3`"
              :append-icon="icon"
              class="px-4 text-capitalize justify-space-between"
              block
              variant="flat"
              size="large"
              @click="toggle"
            >
              {{ t(text) }}
            </v-btn>
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
