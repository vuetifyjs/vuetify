<template>
  <div>
    <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div>
    <v-menu
      ref="menu"
      v-model="menuActive"
      :close-on-content-click="false"
      min-width="auto"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        v-model:active-picker="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const menu = ref()

  const activePicker = ref(null)
  const date = ref(null)
  const menuActive = ref(false)

  watch(menuActive, val => {
    val && setTimeout(() => (activePicker.value = 'YEAR'))
  })

  function save (date) {
    menu.value.save(date)
  }
</script>

<script>
  export default {
    data: () => ({
      activePicker: null,
      date: null,
      menuActive: false,
    }),
    watch: {
      menuActive (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>
