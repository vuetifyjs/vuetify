<template>
  <form>
    <v-text-field
      v-model="state.name"
      :counter="10"
      :error-messages="r$.name.$errors"
      label="Name"
      required
      @blur="r$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="r$.email.$errors"
      label="E-mail"
      required
      @blur="r$.email.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :error-messages="r$.select.$errors"
      :items="items"
      label="Item"
      required
      @blur="r$.select.$touch"
    ></v-select>

    <v-checkbox
      v-model="state.checkbox"
      :error-messages="r$.checkbox.$errors"
      label="Do you agree?"
      required
      @blur="r$.checkbox.$touch"
    ></v-checkbox>

    <v-btn
      class="me-4"
      @click="r$.$validate"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script setup lang="ts">
  import { useRegle } from '@regle/core'
  import { checked, email, oneOf, required } from '@regle/rules'

  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ]

  const state = ref({
    name: '',
    email: '',
    select: null as string | null,
    checkbox: null as boolean | null,
  })

  const { r$ } = useRegle(state, {
    name: { required },
    email: { required, email },
    select: { required, oneOf: oneOf(items) },
    checkbox: { required, checked },
  })

  function clear () {
    r$.$reset({ toOriginalState: true })
  }
</script>

<playground-resources lang="json">
  {
    "imports": {
      "@regle/core": "https://www.unpkg.com/@regle/core@1.8.4/dist/regle-core.min.js",
      "@regle/rules": "https://www.unpkg.com/@regle/rules@1.8.4/dist/regle-rules.min.js"
    }
  }
</playground-resources>
