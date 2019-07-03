<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="multiple" class="mx-2" label="Multiple"></v-switch>
      <v-switch v-model="mandatory" class="mx-2" label="Mandatory"></v-switch>
      <v-switch v-model="flat" class="mx-2" label="Flat"></v-switch>
      <v-switch v-model="dense" class="mx-2" label="Dense"></v-switch>
      <v-flex xs12>
        <v-slider v-model="count" min="0" max="25" label="Items count"></v-slider>
      </v-flex>
    </v-layout>

    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-list
        :flat="flat"
        :dense="dense"
      >
        <v-list-item-group
          v-model="model"
          :multiple="multiple"
          :mandatory="mandatory"
          color="indigo"
        >
          <v-list-item
            v-for="i in count"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      item: {
        icon: 'mdi-wifi',
        text: 'Wifi',
      },
      model: 1,
      multiple: false,
      mandatory: false,
      flat: false,
      dense: false,
      count: 4,
    }),
  }
</script>
