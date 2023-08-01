<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-select
          v-model="steps"
          :items="[2, 3, 4, 5, 6]"
          label="# of steps"
        ></v-select>
      </v-card-text>
    </v-card>

    <v-stepper v-model="e1">
      <template v-slot:default="{ prev, next }">
        <v-stepper-header>
          <template v-for="n in steps" :key="`${n}-step`">
            <v-stepper-item
              :complete="e1 > n"
              :step="`Step {{ n }}`"
              :value="n"
              editable
            ></v-stepper-item>

            <v-divider
              v-if="n !== steps"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-window>
          <v-stepper-window-item
            v-for="n in steps"
            :key="`${n}-content`"
            :value="n"
          >
            <v-card
              color="grey-lighten-1"
              height="200"
            ></v-card>
          </v-stepper-window-item>
        </v-stepper-window>

        <v-stepper-actions
          :disable="disable"
          @click:prev="prev"
          @click:next="next"
        ></v-stepper-actions>
      </template>
    </v-stepper>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const e1 = ref(1)
  const steps = ref(2)

  const disable = computed(() => {
    return e1.value === 1 ? 'prev' : e1.value === steps.value ? 'next' : undefined
  })
</script>

<script>
  export default {
    data () {
      return {
        e1: 1,
        steps: 2,
      }
    },

    computed: {
      disable () {
        return this.e1 === 1 ? 'prev' : this.e1 === this.steps ? 'next' : undefined
      },
    },
  }
</script>
