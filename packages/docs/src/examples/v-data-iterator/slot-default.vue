<template>
  <v-data-iterator
    :items="desserts"
    item-value="name"
    :items-per-page="3"
  >
    <template v-slot:default="{ items, isExpanded, toggleExpand }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.raw.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-card-title>
              <h4>{{ item.raw.name }}</h4>
            </v-card-title>
            <v-switch
              color="primary"
              :model-value="isExpanded(item)"
              :label="isExpanded(item) ? 'Expanded' : 'Closed'"
              class="pl-4 mt-0"
              @click="() => toggleExpand(item)"
            ></v-switch>
            <v-divider></v-divider>
            <v-list
              v-if="isExpanded(item)"
              dense
            >
              <v-list-item title="Calories:" :subtitle="item.raw.calories"></v-list-item>
              <v-list-item title="Fat:" :subtitle="item.raw.fat"></v-list-item>
              <v-list-item title="Carbs:" :subtitle="item.raw.carbs"></v-list-item>
              <v-list-item title="Protein:" :subtitle="item.raw.protein"></v-list-item>
              <v-list-item title="Sodium:" :subtitle="item.raw.sodium"></v-list-item>
              <v-list-item title="Calcium:" :subtitle="item.raw.calcium"></v-list-item>
              <v-list-item title="Iron:" :subtitle="item.raw.iron"></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
  export default {
    data: () => ({
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
      ],
    }),
  }
</script>
