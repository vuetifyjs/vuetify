<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        :height="height"
        :max-height="maxHeight"
      ></v-editor>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model.number="height"
            label="Height (px)"
            type="number"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model.number="maxHeight"
            label="Max Height (px)"
            type="number"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = ref('This is some content to demonstrate height configuration.')
  const height = ref(200)
  const maxHeight = ref(400)
</script>

<script>
  export default {
    data: () => ({
      content: 'This is some content to demonstrate height configuration.',
      height: 200,
      maxHeight: 400,
    }),
  }

</script>
