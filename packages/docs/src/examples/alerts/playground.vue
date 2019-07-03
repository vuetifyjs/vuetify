<template>
  <div class="grey lighten-5 pa-3">
    <v-alert
      v-model="show"
      v-bind="localAttrs"
      :dismissible="dismissible"
      :type="type"
      class="mb-3"
    >
      This is a {{ type }} alert.
    </v-alert>
    <div class="text-xs-center">
      <v-btn
        v-if="!show"
        color="primary"
        height="56"
        @click="show = true"
      >
        Toggle
      </v-btn>
    </div>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
      >
        <v-select
          v-model="variant"
          :items="items"
          clearable
          label="Variant"
        ></v-select>
        <v-radio-group
          v-model="type"
          label="Type"
          row
        >
          <v-radio
            color="success"
            label="Success"
            value="success"
          ></v-radio>
          <v-radio
            color="info"
            label="Info"
            value="info"
          ></v-radio>
          <v-radio
            color="warning"
            label="Warning"
            value="warning"
          ></v-radio>
          <v-radio
            color="error"
            label="Error"
            value="error"
          ></v-radio>
        </v-radio-group>
        <template v-if="variant === 'border'">
          <v-radio-group
            v-model="border"
            label="Border Location"
            row
          >
            <v-radio
              label="Top"
              value="top"
            ></v-radio>
            <v-radio
              label="Right"
              value="right"
            ></v-radio>
            <v-radio
              label="Bottom"
              value="bottom"
            ></v-radio>
            <v-radio
              label="Left"
              value="left"
            ></v-radio>
          </v-radio-group>
          <v-checkbox
            v-model="coloredBorder"
            hide-details
            label="Colored Border"
          ></v-checkbox>
          <v-checkbox
            v-model="dismissible"
            hide-details
            label="Dismissible"
          ></v-checkbox>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      border: 'left',
      coloredBorder: false,
      dismissible: false,
      items: [
        'border',
        'outlined',
        'dense',
        'prominent',
      ],
      show: true,
      type: 'success',
      variant: null,
    }),

    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'border') {
          attrs.border = this.border
          attrs.coloredBorder = this.coloredBorder
        } else {
          attrs[this.variant] = true
        }

        return attrs
      },
    },
  }
</script>
