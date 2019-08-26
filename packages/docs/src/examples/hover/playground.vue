<template>
  <div class="pa-4 grey lighten-4">
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-hover
          v-slot:default="{ hover }"
          :open-delay="openDelay"
          :close-delay="closeDelay"
          :disabled="disabled"
          :value="value"
        >
          <v-card
            :elevation="hover ? 12 : 2"
            height="300"
            max-width="350"
            class="mx-auto"
          >
            <v-card-text class="my-4 text-center title">Hover over me!</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-radio-group row>
          <v-checkbox
            v-model="disabled"
            label="Disabled"
            class="mx-2"
          >
          </v-checkbox>
          <v-checkbox
            v-model="value"
            label="Value"
            class="mx-2"
          >
          </v-checkbox>
        </v-radio-group>

        <v-slider
          v-model="openDelay"
          label="Open Delay"
          min="0"
          max="1000"
          thumb-label
        ></v-slider>

        <v-slider
          v-model="closeDelay"
          label="Close Delay"
          min="0"
          max="1000"
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      disabled: false,
      openDelay: '0',
      closeDelay: '0',
      value: false,
    }),
  }
</script>
