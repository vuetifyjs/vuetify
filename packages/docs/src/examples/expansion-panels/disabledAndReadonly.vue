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

    <v-expansion-panel
      v-model="panel"
      :disabled="disabled"
      :readonly="readonly"
      expand
    >
      <v-expansion-panel-item disabled>
        <template v-slot:header>Disabled</template>
        <v-card>
          <v-card-text>
            Disabled content. Style is changed and user is unable to toggle content.
          </v-card-text>
        </v-card>
      </v-expansion-panel-item>

      <v-expansion-panel-item readonly>
        <template v-slot:header>Readonly</template>
        <v-card>
          <v-card-text>
            Readonly content. Style is unchanged but user is unable to toggle content.
          </v-card-text>
        </v-card>
      </v-expansion-panel-item>

      <v-expansion-panel-item>
        <template v-slot:header>Regular</template>
        <v-card>
          <v-card-text>Some content</v-card-text>
        </v-card>
      </v-expansion-panel-item>
    </v-expansion-panel>
  </div>
</template>

<script>
  export default {
    data: () => ({
      panel: [true, true, false],
      disabled: false,
      readonly: false
    })
  }
</script>
