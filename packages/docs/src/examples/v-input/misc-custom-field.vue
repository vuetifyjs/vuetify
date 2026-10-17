<template>
  <v-input
    v-model="teamName"
    :focused="focused"
    :rules="rules"
  >
    <template v-slot:default="{ id, isDirty, isDisabled, isReadonly, isValid, hasDetails }">
      <v-field
        :id="id.value"
        v-model:focused="focused"
        :active="focused || isDirty.value"
        :details="hasDetails.value"
        :dirty="isDirty.value"
        :disabled="isDisabled.value"
        :error="isValid.value === false"
        label="Team name"
      >
        <template v-slot:default="{ props, controlRef, focus, blur }">
          <input
            :ref="controlRef"
            v-bind="props"
            v-model="teamName"
            :disabled="isDisabled.value"
            :readonly="isReadonly.value"
            autocomplete="organization"
            name="team-name"
            @blur="blur"
            @focus="focus"
          >
        </template>
      </v-field>
    </template>
  </v-input>
</template>

<script setup>
  import { ref } from 'vue'

  const focused = ref(false)
  const teamName = ref('')
  const rules = [
    value => !!value || 'A team name is required.',
    value => (value || '').length >= 3 || 'Use at least 3 characters.',
  ]
</script>
