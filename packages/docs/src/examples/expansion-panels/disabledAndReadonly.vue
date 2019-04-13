<template>
  <div>
    <div class="d-flex">
      <v-checkbox
        v-model="disabled"
        label="Disabled"
      ></v-checkbox>
      <v-checkbox
        v-model="readonly"
        label="Readonly"
      ></v-checkbox>
    </div>

    <v-expansion-panels
      v-model="panel"
      :disabled="disabled"
      :readonly="readonly"
      multiple
    >
      <v-expansion-panel disabled>
        <v-expansion-panel-header>Disabled</v-expansion-panel-header>
        <v-expansion-panel-content>
          Disabled content. Style is changed and user is unable to toggle content.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel readonly>
        <v-expansion-panel-header>Readonly</v-expansion-panel-header>
        <v-expansion-panel-content>
          Readonly content. Style is unchanged but user is unable to toggle content.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>Regular</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  export default {
    data: () => ({
      panel: [0, 1],
      disabled: false,
      readonly: false
    })
  }
</script>
