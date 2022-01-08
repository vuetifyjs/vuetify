<template>
  <v-app>
    <div class="pa-10">
      <v-stepper :items="items">
        <template #content="props">
          <v-card>
            <v-card-text>
              content
            </v-card-text>
            <v-card-actions>
              <v-btn @click="props.prev">prev</v-btn>
              <v-btn @click="props.next">next</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-stepper>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    data: () => ({
      items: [
        {
          label: 'First step',
          completeIcon: 'mdi-home',
        },
        {
          label: 'Second step',
        },
        {
          label: 'Third step',
        },
      ],
    }),
  })
</script>
