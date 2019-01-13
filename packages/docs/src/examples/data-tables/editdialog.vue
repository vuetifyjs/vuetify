<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.name"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            {{ props.item.name }}
            <v-text-field
              slot="input"
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">
          {{ props.item.calories }}
        </td>
        <td class="text-xs-right">
          {{ props.item.fat }}
        </td>
        <td class="text-xs-right">
          {{ props.item.carbs }}
        </td>
        <td class="text-xs-right">
          {{ props.item.protein }}
        </td>
        <td class="text-xs-right">
          <v-edit-dialog
            :return-value.sync="props.item.iron"
            large
            lazy
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.iron }}</div>
            <div
              slot="input"
              class="mt-3 title"
            >
              Update Iron
            </div>
            <v-text-field
              slot="input"
              v-model="props.item.iron"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}
      <v-btn
        flat
        @click="snack = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    },
    methods: {
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      }
    }
  }
</script>
