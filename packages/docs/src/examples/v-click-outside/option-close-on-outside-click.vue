<template>
  <v-list>
    <v-list-item
      v-click-outside="onClickOutsideStandard"
      @click="models.base = true"
    >
      <v-list-item-title>Default Click Outside</v-list-item-title>

      <v-list-item-action>
        <v-icon :color="models.base ? 'green' : 'red'">
          mdi-record
        </v-icon>
      </v-list-item-action>
    </v-list-item>

    <v-list-item
      v-click-outside="{
        handler: onClickOutsideWithConditional,
        closeConditional,
      }"
      @click="models.conditional = true"
    >
      <v-list-item-title>Default w/ Close Conditional</v-list-item-title>

      <v-list-item-action>
        <v-icon :color="models.conditional ? 'green' : 'red'">
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
        conditional: false,
      },
    }),

    methods: {
      onClickOutsideStandard () {
        this.models.base = false
      },
      onClickOutsideWithConditional () {
        this.models.conditional = false
      },
      closeConditional (e) {
        return this.models.conditional
      },
    },
  }
</script>
