<template>
  <div>
    <v-responsive
      class="mx-auto mb-4"
      max-width="400"
    >
      <v-text-field
        v-model="visibleItems"
        label="Visible items"
        max="30"
        min="10"
        type="number"
      ></v-text-field>
    </v-responsive>

    <v-card
      class="mx-auto"
      elevation="4"
      max-width="400"
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

            <v-list-item-title class="ms-4">
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
      items: Array.from({ length: 7000 }, (k, v) => v + 1),
      visibleItems: 30,
    }),
  }
</script>
