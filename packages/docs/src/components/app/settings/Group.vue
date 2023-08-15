<template>
  <div>
    <v-label
      v-if="title"
      :text="te(title) ? t(title) : title"
      class="mb-2 font-weight-medium"
    />

    <v-messages
      v-if="text"
      :messages="te(text) ? t(text) : text"
      active
      class="mb-4"
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
          v-for="({ icon, text: itext }) in items"
          :key="itext"
          cols="6"
        >
          <v-item v-slot="{ isSelected, toggle }" :value="itext">
            <v-btn
              :ref="'item-' + itext"
              :color="isSelected ? 'primary' : `grey-${isDark ? 'darken' : 'lighten'}-3`"
              :append-icon="icon"
              class="px-4 text-capitalize justify-space-between text-body-2"
              block
              variant="flat"
              size="large"
              @click="toggle"
            >
              {{ t(itext) }}
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
    text: String,
    modelValue: null,
    items: Array as PropType<{ icon: string, text: string }[]>,
    multiple: Boolean,
  })

  defineEmits({
    'update:modelValue': (value: string) => true,
  })

  const { t, te } = useI18n()
  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)
</script>
