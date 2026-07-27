<template>
  <div>
    <div class="d-flex justify-center">
      <v-btn-toggle
        density="comfortable"
        rounded="lg"
        border
        divided
      >
        <v-btn
          :active="Array.isArray(disabled) && disabled?.includes('cancel')"
          text="Toggle cancel"
          @click="onClick('cancel')"
        ></v-btn>

        <v-btn
          :active="Array.isArray(disabled) && disabled?.includes('save')"
          text="Toggle save"
          @click="onClick('save')"
        ></v-btn>

        <v-btn
          :active="typeof disabled === 'boolean'"
          text="Toggle Boolean"
          @click="disabled = !disabled"
        ></v-btn>

        <v-btn
          :active="disabled === undefined"
          text="Default"
          @click="disabled = undefined"
        ></v-btn>
      </v-btn-toggle>
    </div>

    <div class="d-flex justify-center align-center py-4 ga-2">
      <strong>Disabled:</strong>
      <span
        class="bg-surface-light rounded rounded-md pa-1"
        size="small"
        v-text="disabled === undefined ? 'undefined' : disabled"
      ></span>
    </div>

    <v-sheet
      class="pa-4"
      color="surface-light"
      rounded="lg"
    >
      <v-confirm-edit
        v-slot="{ model: proxyModel, actions }"
        v-model="value"
        :disabled="disabled"
      >
        <v-card class="mx-auto" max-width="400" rounded="lg" title="Update Field">
          <template v-slot:text>
            <v-text-field
              v-model="proxyModel.value"
              label="Name"
              prepend-icon="$vuetify"
              variant="outlined"
            ></v-text-field>
          </template>

          <v-divider></v-divider>

          <template v-slot:actions>
            <v-spacer></v-spacer>

            <component :is="actions"></component>
          </template>
        </v-card>
      </v-confirm-edit>
    </v-sheet>
  </div>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'

  const disabled = ref([])
  const value = shallowRef('My Beach Vacation')

  function onClick (action) {
    if (!Array.isArray(disabled.value)) {
      disabled.value = []
    }

    if (disabled.value.includes(action)) {
      disabled.value = disabled.value.filter(item => item !== action)
    } else {
      disabled.value.push(action)
    }
  }
</script>

<script>
  export default {
    data () {
      return {
        disabled: [],
        value: 'My Beach Vacation',
      }
    },

    methods: {
      onClick (action) {
        if (!Array.isArray(this.disabled)) {
          this.disabled = []
        }

        if (this.disabled.includes(action)) {
          this.disabled = this.disabled.filter(item => item !== action)
        } else {
          this.disabled.push(action)
        }
      },
    },
  }
</script>
