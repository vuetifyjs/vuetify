<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list shaped>
      <v-list-item-group
        v-model="model"
        multiple
      >
        <template v-for="(item, i) in items">
          <v-divider
            v-if="!item"
            :key="`divider-${i}`"
          ></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item"
            active-class="text-deep-purple"
          >
            <v-list-item-title v-text="item"></v-list-item-title>

            <template v-slot:append="{ active }">
              <v-checkbox
                :model-value="active"
                color="deep-purple-accent-4"
              ></v-checkbox>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        'Dog Photos',
        'Cat Photos',
        '',
        'Potatoes',
        'Carrots',
      ],
      model: ['Carrots'],
    }),
  }
</script>
