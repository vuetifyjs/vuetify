<template>
  <div>
    <v-select
      v-model="enabled"
      :items="slots"
      label="Slot"
      clearable
    ></v-select>
    <v-data-table
      :headers="headerArray"
      :items="itemsArray"
      :search="search"
      :hide-default-header="hideHeaders"
      :show-select="showSelect"
      :loading="isLoading"
      hide-default-footer
      item-key="name"
      class="elevation-1"
    >
      <template
        v-if="isEnabled('top')"
        v-slot:top
      >
        <div>This is content above the actual table</div>
      </template>

      <template
        v-if="isEnabled('header.data-table-select')"
        v-slot:header.data-table-select="{ on, props }"
      >
        <v-simple-checkbox
          color="purple"
          v-bind="props"
          v-on="on"
        ></v-simple-checkbox>
      </template>

      <template
        v-if="isEnabled('header')"
        v-slot:header="{ props: { headers } }"
      >
        <thead>
          <tr>
            <th :colspan="headers.length">
              This is a header
            </th>
          </tr>
        </thead>
      </template>

      <template
        v-if="isEnabled('progress')"
        v-slot:progress
      >
        <v-progress-linear
          color="purple"
          :height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <template
        v-if="isEnabled('item.data-table-select')"
        v-slot:item.data-table-select="{ isSelected, select }"
      >
        <v-simple-checkbox
          color="green"
          :value="isSelected"
          @input="select($event)"
        ></v-simple-checkbox>
      </template>

      <template
        v-if="isEnabled('item.<name>')"
        v-slot:item.name="{ item }"
      >
        {{ item.name.toUpperCase() }}
      </template>

      <template
        v-if="isEnabled('body.prepend')"
        v-slot:body.prepend="{ headers }"
      >
        <tr>
          <td :colspan="headers.length">
            This is a prepended row
          </td>
        </tr>
      </template>

      <template
        v-if="isEnabled('body')"
        v-slot:body="{ items }"
      >
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
          </tr>
        </tbody>
      </template>

      <template
        v-if="isEnabled('no-data')"
        v-slot:no-data
      >
        NO DATA HERE!
      </template>

      <template
        v-if="isEnabled('no-results')"
        v-slot:no-results
      >
        NO RESULTS HERE!
      </template>

      <template
        v-if="isEnabled('body.append')"
        v-slot:body.append="{ headers }"
      >
        <tr>
          <td :colspan="headers.length">
            This is an appended row
          </td>
        </tr>
      </template>

      <template
        v-if="isEnabled('footer')"
        v-slot:footer
      >
        <div>
          This is a footer
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1%',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1%',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7%',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8%',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16%',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0%',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2%',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45%',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22%',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6%',
    },
  ]

  export default {
    data () {
      return {
        enabled: null,
        itemsArray: desserts,
        search: null,
        slots: [
          'body',
          'body.append',
          'body.prepend',
          'footer',
          'header.data-table-select',
          'header',
          'progress',
          'item.data-table-select',
          'item.<name>',
          'no-data',
          'no-results',
          'top',
        ],
        headerArray: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      }
    },

    computed: {
      showSelect () {
        return this.isEnabled('header.data-table-select') || this.isEnabled('item.data-table-select')
      },
      hideHeaders () {
        return !this.showSelect
      },
      isLoading () {
        return this.isEnabled('progress')
      },
    },

    watch: {
      enabled (slot) {
        if (slot === 'no-data') {
          this.items = []
        } else if (slot === 'no-results') {
          this.search = '...'
        } else {
          this.search = null
          this.items = desserts
        }
      },
    },

    methods: {
      isEnabled (slot) {
        return this.enabled === slot
      },
    },
  }
</script>
