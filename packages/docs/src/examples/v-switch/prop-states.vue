<template>
  <v-container fluid>
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

    <v-row>
      <v-col cols="6">
        <v-switch
          v-bind="shared"
          :model-value="true"
          color="primary"
          label="on"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          v-bind="shared"
          :model-value="false"
          color="primary"
          label="off"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-switch
          v-bind="shared"
          :model-value="true"
          color="primary"
          label="on disabled"
          disabled
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          v-bind="shared"
          :model-value="false"
          color="primary"
          label="off disabled"
          disabled
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-switch
          v-bind="shared"
          :model-value="true"
          label="on loading"
          loading="warning"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          v-bind="shared"
          :model-value="false"
          label="off loading"
          loading="warning"
        ></v-switch>
      </v-col>
    </v-row>
  </v-container>
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
      hideDetails: true,
    }
  })
</script>

<script>
  export default {
    data () {
      return {
        variant: 'default',
        icons: false,
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
          hideDetails: true,
        }
      },
    },
  }
</script>
