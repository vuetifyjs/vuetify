<template>
  <v-card
    title="SURVEY"
    text="How satisfied are you with developing using Vuetify?"
    max-width="300"
    class="px-2 mx-auto"
    theme="dark"
    rounded="lg"
    variant="flat"
  >
    <template v-slot:append>
      <div class="me-n2">
        <v-btn
          icon="$close"
          density="comfortable"
          variant="plain"
        ></v-btn>
      </div>
    </template>

    <v-item-group
      v-model="model"
      class="d-flex justify-sm-space-between px-6 pt-2 pb-6"
    >
      <v-item
        v-for="n in 5"
        :key="n"
      >
        <template v-slot:default="{ toggle }">
          <v-btn
            :icon="`mdi-numeric-${n}`"
            :active="model + 1 >= n"
            width="40"
            border
            height="40"
            variant="text"
            @click="toggle"
          ></v-btn>
        </template>
      </v-item>
    </v-item-group>
  </v-card>
</template>

<script>

  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
