<template>
  <v-card flat>
    <v-card-text>
      <div class="d-flex justify-center align-center ga-4 mb-6">
        <v-btn-toggle
          v-model="variant"
          variant="outlined"
          divided
          mandatory
        >
          <v-btn value="default">Default</v-btn>
          <v-btn value="inset">Inset</v-btn>
          <v-btn value="material">Material</v-btn>
          <v-btn value="square">Square</v-btn>
        </v-btn-toggle>

        <v-checkbox
          v-model="icons"
          label="Icons"
          hide-details
        ></v-checkbox>
      </div>

      <v-container fluid>
        <v-row
          v-for="(group, i) in groups"
          :key="i"
          :class="{ 'mt-12': i > 0 }"
        >
          <v-col
            v-for="(pair, j) in group"
            :key="j"
            cols="12"
            md="4"
            sm="4"
          >
            <v-switch
              v-for="color in pair"
              :key="color"
              v-model="ex11"
              v-bind="shared"
              :color="color"
              :label="color"
              :value="color"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const variant = ref('default')
  const icons = ref(false)

  const shared = computed(() => {
    return {
      inset: variant.value === 'default' ? undefined
        : variant.value === 'inset' ? true
          : variant.value,
      'true-icon': icons.value ? 'mdi-check' : undefined,
      'false-icon': icons.value ? 'mdi-close' : undefined,
      'hide-details': true,
    }
  })

  const groups = [
    [['red', 'red-darken-3'], ['indigo', 'indigo-darken-3'], ['orange', 'orange-darken-3']],
    [['primary', 'secondary'], ['success', 'info'], ['warning', 'error']],
  ]

  const ex11 = ref(groups.flat(2))
</script>

<script>
  export default {
    data () {
      const groups = [
        [['red', 'red-darken-3'], ['indigo', 'indigo-darken-3'], ['orange', 'orange-darken-3']],
        [['primary', 'secondary'], ['success', 'info'], ['warning', 'error']],
      ]

      return {
        variant: 'default',
        icons: false,
        groups,
        ex11: groups.flat(2),
      }
    },
    computed: {
      shared () {
        return {
          inset: this.variant === 'default' ? undefined
            : this.variant === 'inset' ? true
              : this.variant,
          'true-icon': this.icons ? 'mdi-check' : undefined,
          'false-icon': this.icons ? 'mdi-close' : undefined,
          'hide-details': true,
        }
      },
    },
  }
</script>
