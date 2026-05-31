<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        :height="height"
        :max-height="maxHeight"
        :min-height="minHeight"
      ></v-editor>
    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.number="height"
            label="Height (px)"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model.number="maxHeight"
            label="Max Height (px)"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model.number="minHeight"
            label="Min Height (px)"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = shallowRef('<div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div>')
  const height = shallowRef('auto')
  const maxHeight = shallowRef(200)
  const minHeight = shallowRef(100)
</script>

<script>
  export default {
    data: () => ({
      content: '<div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div><div>Long content</div>',
      height: 'auto',
      maxHeight: 200,
      minHeight: 100,
    }),
  }

</script>
