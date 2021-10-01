<template>
  <div>
    <app-title
      v-if="title"
      :path="title"
      class="mb-0 pl-1"
    />

    <v-item-group
      class="mx-auto"
      mandatory
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
                :color="isSelected ? 'primary' : `grey-${dark ? 'darken' : 'lighten'}-3`"

                class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
                rounded
                flat
                @click="toggle"
              >
                {{ t(text) }}

                <v-icon :icon="icon" />
              </v-card>
            </template>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n'
  // :dark="!dark && active"
  export default {
    name: 'SettingsGroup',

    props: {
      title: String,
      modelValue: String,
      items: Array,
    },

    emits: {
      'update:modelValue': (value: string) => true,
    },

    setup () {
      const { t } = useI18n()

      return { t, dark: false }
    },
  }
</script>

<style lang="sass">
  // Bug in Vuetify, ripple isn't inheriting border-radius
  .v-card--group::before
    border-radius: inherit
</style>
