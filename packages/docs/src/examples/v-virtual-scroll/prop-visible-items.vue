<template>
  <div>
    <v-responsive
      max-width="400"
      class="mx-auto mb-4"
    >
      <v-text-field
        v-model="visibleItems"
        type="number"
        label="Visible items"
        min="10"
        max="30"
      ></v-text-field>
    </v-responsive>

    <v-card
      elevation="4"
      max-width="400"
      class="mx-auto"
    >
      <v-virtual-scroll
        :visible-items="visibleItems"
        :items="items"
        height="300"
        item-height="48"
      >
        <template v-slot:default="{ item }">
          <v-list-item>
            <template v-slot:prepend>
              <v-btn icon variant="flat" color="primary" size="small">{{ item }}</v-btn>
            </template>

            <v-list-item-title class="ml-4">
              User Database Record <strong>ID {{ item }}</strong>
            </v-list-item-title>

            <template v-slot:append>
              <v-icon size="small">
                mdi-open-in-new
              </v-icon>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      visibleItems: 30,
    }),
    computed: {
      items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      length () {
        return 7000
      },
    },
  }
</script>
