<template>
  <v-toolbar>
    <v-spacer></v-spacer>

    <v-btn-toggle
      v-model="toggleMultiple"
      color="primary"
      variant="plain"
      multiple
    >
      <v-btn
        :value="1"
        icon="mdi-format-bold"
      ></v-btn>

      <v-btn
        :value="2"
        icon="mdi-format-italic"
      ></v-btn>

      <v-btn
        :value="3"
        icon="mdi-format-underline"
      ></v-btn>

      <v-btn
        :value="4"
        icon="mdi-format-color-fill"
      ></v-btn>
    </v-btn-toggle>

    <div class="mx-4"></div>

    <v-btn-toggle
      v-model="toggleExclusive"
      color="primary"
      density="compact"
      variant="plain"
    >
      <v-btn
        :value="1"
        icon="mdi-format-align-left"
      ></v-btn>

      <v-btn
        :value="2"
        icon="mdi-format-align-center"
      ></v-btn>

      <v-btn
        :value="3"
        icon="mdi-format-align-right"
      ></v-btn>

      <v-btn
        :value="4"
        icon="mdi-format-align-justify"
      ></v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script setup>
  import { ref } from 'vue'

  const toggleExclusive = ref(2)
  const toggleMultiple = ref([1, 2, 3])
</script>

<script>
  export default {
    data () {
      return {
        toggleExclusive: 2,
        toggleMultiple: [1, 2, 3],
      }
    },
  }
</script>
