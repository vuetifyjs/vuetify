<template>
  <v-layout row wrap align-center justify-space-around>
    <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
    <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
    <v-switch v-model="chips" class="ma-2" label="Chips"></v-switch>
    <v-switch v-model="multiple" class="ma-2" label="Multiple"></v-switch>
    <v-switch v-model="appendIcon" class="ma-2" label="Append icon"></v-switch>
    <v-switch v-model="appendSlot" class="ma-2" label="Append slot"></v-switch>
    <v-switch v-model="appendItemSlot" class="ma-2" label="Append item slot"></v-switch>
    <v-switch v-model="prependIcon" class="ma-2" label="Prepend icon"></v-switch>
    <v-switch v-model="prependSlot" class="ma-2" label="Prepend slot"></v-switch>
    <v-switch v-model="prependItemSlot" class="ma-2" label="Prepend item slot"></v-switch>
    <v-switch v-model="selectSlot" class="ma-2" label="Selection slot"></v-switch>
    <v-flex xs12>
      <v-select
        v-model="model"
        :items="items"
        :disabled="disabled"
        :readonly="readonly"
        :chips="chips"
        :multiple="multiple"
        :append-icon="appendIcon ? 'mdi-plus' : ''"
        :prepend-icon="prependIcon ? 'mdi-minus' : ''"
        label="Label"
      >
        <v-icon v-if="appendSlot" slot="append" color="green">mdi-plus</v-icon>
        <v-icon v-if="prependSlot" slot="prepend" color="red">mdi-minus</v-icon>
        <v-icon v-if="appendItemSlot" slot="append-item">mdi-contain-end</v-icon>
        <v-icon v-if="prependItemSlot" slot="prepend-item">mdi-contain-start</v-icon>
        <template v-if="selectSlot" v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span
            v-if="index === 1"
            class="grey--text caption"
          >(+{{ model.length - 1 }} others)</span>
        </template>
      </v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      disabled: false,
      readonly: false,
      chips: false,
      multiple: false,
      appendIcon: false,
      appendSlot: false,
      appendItemSlot: false,
      prependIcon: false,
      prependSlot: false,
      prependItemSlot: false,
      selectSlot: false,
      model: 'Foo',
    }),

    watch: {
      multiple (val) {
        if (val) this.model = [this.model]
        else this.model = this.model[0] || 'Foo'
      },
    },
  }
</script>
