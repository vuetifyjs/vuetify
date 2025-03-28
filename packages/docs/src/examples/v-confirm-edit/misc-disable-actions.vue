<template>
  <div>
    <v-btn-toggle>
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

    <div class="ma-3">
      disabled <pre>{{ disabled === undefined ? 'undefined' : disabled }}</pre>
    </div>

    <v-confirm-edit v-model="value" :disabled="disabled">
      <template v-slot:default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" title="Update Field">
          <template v-slot:text>
            <v-text-field v-model="proxyModel.value"></v-text-field>
          </template>

          <template v-slot:actions>
            <v-spacer></v-spacer>
            <component :is="actions"></component>
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabled = ref([])
const value = ref('Egg Plant')

const onClick = action => {
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
