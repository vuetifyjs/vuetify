<template>
  <div class="d-flex flex-column ga-4">
    <div>
      <div class="text-caption mb-1">Bare v-input (no visible floating label)</div>
      <v-input>
        Default slot only — use v-field when you need a floating label
      </v-input>
    </div>

    <div>
      <div class="text-caption mb-1">v-input + v-field with label</div>
      <v-input>
        <v-field
          label="Display name"
          variant="outlined"
          :dirty="!!value"
          :active="focused || !!value"
        >
          <template #default="{ props: fieldProps, focus, blur }">
            <input
              v-model="value"
              v-bind="fieldProps"
              @focus="onFocus(focus)"
              @blur="onBlur(blur)"
            >
          </template>
        </v-field>
      </v-input>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const focused = ref(false)

  function onFocus (focus) {
    focused.value = true
    focus()
  }

  function onBlur (blur) {
    focused.value = false
    blur()
  }
</script>
