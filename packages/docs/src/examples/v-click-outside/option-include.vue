<template>
  <v-list class="pa-0" outlined>
    <v-list-item class="included" @click="() => null">
      <v-list-item-title>Included</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item @click="() => null">
      <v-list-item-title>Not included</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item
      v-click-outside="{
        handler: onClickOutsideStandard,
        include: include,
      }"
      @click="models.base = true"
    >
      <v-list-item-title>Default Click Outside</v-list-item-title>

      <v-list-item-action>
        <v-icon :color="models.base ? 'green' : 'red'">
          mdi-record
        </v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    data: () => ({
      models: {
        base: false,
      },
    }),
    methods: {
      onClickOutsideStandard () {
        this.models.base = false
      },
      include () {
        return [document.querySelector('.included')]
      },
    },
  }
</script>
