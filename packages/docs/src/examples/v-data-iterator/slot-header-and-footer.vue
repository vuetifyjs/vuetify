<template>
  <v-data-iterator
    :items="mice"
    :items-per-page="itemsPerPage"
  >
    <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
      <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
        <div class="text-truncate">
          Most popular mice
        </div>

        <div class="d-flex align-center">
          <v-btn
            class="me-8"
            variant="text"
            @click="onClickSeeAll"
          >
            <span class="text-decoration-underline text-none">See all</span>
          </v-btn>

          <div class="d-inline-flex">
            <v-btn
              :disabled="page === 1"
              class="me-2"
              icon="mdi-arrow-left"
              size="small"
              variant="tonal"
              @click="prevPage"
            ></v-btn>

            <v-btn
              :disabled="page === pageCount"
              icon="mdi-arrow-right"
              size="small"
              variant="tonal"
              @click="nextPage"
            ></v-btn>
          </div>
        </div>
      </h1>
    </template>

    <template v-slot:default="{ items }">
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
          sm="6"
          xl="3"
        >
          <v-sheet border>
            <v-img
              :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
              :src="item.raw.src"
              height="150"
              cover
            ></v-img>

            <v-list-item
              :title="item.raw.name"
              density="comfortable"
              lines="two"
              subtitle="Lorem ipsum dil orei namdie dkaf"
            >
              <template v-slot:title>
                <strong class="text-h6">
                  {{ item.raw.name }}
                </strong>
              </template>
            </v-list-item>

            <v-table class="text-caption" density="compact">
              <tbody>
                <tr align="right">
                  <th>DPI:</th>

                  <td>{{ item.raw.dpi }}</td>
                </tr>

                <tr align="right">
                  <th>Buttons:</th>

                  <td>{{ item.raw.buttons }}</td>
                </tr>

                <tr align="right">
                  <th>Weight:</th>

                  <td>{{ item.raw.weight }}</td>
                </tr>

                <tr align="right">
                  <th>Wireless:</th>

                  <td>{{ item.raw.wireless ? 'Yes' : 'No' }}</td>
                </tr>

                <tr align="right">
                  <th>Price:</th>

                  <td>${{ item.raw.price }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer="{ page, pageCount }">
      <v-footer
        class="justify-space-between text-body-2 mt-4"
        color="surface-variant"
      >
        Total mice: {{ mice.length }}

        <div>
          Page {{ page }} of {{ pageCount }}
        </div>
      </v-footer>
    </template>
  </v-data-iterator>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const itemsPerPage = shallowRef(4)
  const mice = [
    {
      name: 'Logitech G Pro X',
      color: '14, 151, 210',
      dpi: 16000,
      buttons: 8,
      weight: '63g',
      wireless: true,
      price: 149.99,
      description: 'Logitech G Pro X',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/1.png',
    },
    {
      name: 'Razer DeathAdder V2',
      color: '12, 146, 47',
      dpi: 20000,
      buttons: 8,
      weight: '82g',
      wireless: false,
      price: 69.99,
      description: 'Razer DeathAdder V2',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/2.png',
    },
    {
      name: 'Corsair Dark Core RGB',
      color: '107, 187, 226',
      dpi: 18000,
      buttons: 9,
      weight: '133g',
      wireless: true,
      price: 89.99,
      description: 'Corsair Dark Core RGB',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/3.png',
    },
    {
      name: 'SteelSeries Rival 3',
      color: '228, 196, 69',
      dpi: 8500,
      buttons: 6,
      weight: '77g',
      wireless: false,
      price: 29.99,
      description: 'SteelSeries Rival 3',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/4.png',
    },
    {
      name: 'HyperX Pulsefire FPS Pro',
      color: '156, 82, 251',
      dpi: 16000,
      buttons: 6,
      weight: '95g',
      wireless: false,
      price: 44.99,
      description: 'HyperX Pulsefire FPS Pro',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/5.png',
    },
    {
      name: 'Zowie EC2',
      color: '166, 39, 222',
      dpi: 3200,
      buttons: 5,
      weight: '90g',
      wireless: false,
      price: 69.99,
      description: 'Zowie EC2',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/6.png',
    },
    {
      name: 'Roccat Kone AIMO',
      color: '131, 9, 10',
      dpi: 16000,
      buttons: 10,
      weight: '130g',
      wireless: false,
      price: 79.99,
      description: 'Roccat Kone AIMO',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/7.png',
    },
    {
      name: 'Logitech G903',
      color: '232, 94, 102',
      dpi: 12000,
      buttons: 11,
      weight: '110g',
      wireless: true,
      price: 129.99,
      description: 'Logitech G903',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/8.png',
    },
    {
      name: 'Cooler Master MM711',
      color: '58, 192, 239',
      dpi: 16000,
      buttons: 6,
      weight: '60g',
      wireless: false,
      price: 49.99,
      description: 'Cooler Master MM711',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/9.png',
    },
    {
      name: 'Glorious Model O',
      color: '161, 252, 250',
      dpi: 12000,
      buttons: 6,
      weight: '67g',
      wireless: false,
      price: 49.99,
      description: 'Glorious Model O',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/10.png',
    },
    {
      name: 'HP Omen Photon',
      color: '201, 1, 2',
      dpi: 16000,
      buttons: 11,
      weight: '128g',
      wireless: true,
      price: 99.99,
      description: 'HP Omen Photon',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/11.png',
    },
    {
      name: 'Asus ROG Chakram',
      color: '10, 181, 19',
      dpi: 16000,
      buttons: 9,
      weight: '121g',
      wireless: true,
      price: 159.99,
      description: 'Asus ROG Chakram',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/12.png',
    },
    {
      name: 'Razer Naga X',
      color: '100, 101, 102',
      dpi: 16000,
      buttons: 16,
      weight: '85g',
      wireless: false,
      price: 79.99,
      description: 'Razer Naga X',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/13.png',
    },
    {
      name: 'Mad Catz R.A.T. 8+',
      color: '136, 241, 242',
      dpi: 16000,
      buttons: 11,
      weight: '145g',
      wireless: false,
      price: 99.99,
      description: 'Mad Catz R.A.T. 8+',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/14.png',
    },
    {
      name: 'Alienware 610M',
      color: '109, 110, 114',
      dpi: 16000,
      buttons: 7,
      weight: '120g',
      wireless: true,
      price: 99.99,
      description: 'Alienware 610M',
      src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/15.png',
    },
  ]

  function onClickSeeAll () {
    itemsPerPage.value = itemsPerPage.value === 4 ? mice.length : 4
  }
</script>

<script>
  export default {
    data () {
      return {
        itemsPerPage: 4,
        mice: [
          {
            name: 'Logitech G Pro X',
            color: '14, 151, 210',
            dpi: 16000,
            buttons: 8,
            weight: '63g',
            wireless: true,
            price: 149.99,
            description: 'Logitech G Pro X',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/1.png',
          },
          {
            name: 'Razer DeathAdder V2',
            color: '12, 146, 47',
            dpi: 20000,
            buttons: 8,
            weight: '82g',
            wireless: false,
            price: 69.99,
            description: 'Razer DeathAdder V2',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/2.png',
          },
          {
            name: 'Corsair Dark Core RGB',
            color: '107, 187, 226',
            dpi: 18000,
            buttons: 9,
            weight: '133g',
            wireless: true,
            price: 89.99,
            description: 'Corsair Dark Core RGB',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/3.png',
          },
          {
            name: 'SteelSeries Rival 3',
            color: '228, 196, 69',
            dpi: 8500,
            buttons: 6,
            weight: '77g',
            wireless: false,
            price: 29.99,
            description: 'SteelSeries Rival 3',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/4.png',
          },
          {
            name: 'HyperX Pulsefire FPS Pro',
            color: '156, 82, 251',
            dpi: 16000,
            buttons: 6,
            weight: '95g',
            wireless: false,
            price: 44.99,
            description: 'HyperX Pulsefire FPS Pro',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/5.png',
          },
          {
            name: 'Zowie EC2',
            color: '166, 39, 222',
            dpi: 3200,
            buttons: 5,
            weight: '90g',
            wireless: false,
            price: 69.99,
            description: 'Zowie EC2',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/6.png',
          },
          {
            name: 'Roccat Kone AIMO',
            color: '131, 9, 10',
            dpi: 16000,
            buttons: 10,
            weight: '130g',
            wireless: false,
            price: 79.99,
            description: 'Roccat Kone AIMO',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/7.png',
          },
          {
            name: 'Logitech G903',
            color: '232, 94, 102',
            dpi: 12000,
            buttons: 11,
            weight: '110g',
            wireless: true,
            price: 129.99,
            description: 'Logitech G903',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/8.png',
          },
          {
            name: 'Cooler Master MM711',
            color: '58, 192, 239',
            dpi: 16000,
            buttons: 6,
            weight: '60g',
            wireless: false,
            price: 49.99,
            description: 'Cooler Master MM711',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/9.png',
          },
          {
            name: 'Glorious Model O',
            color: '161, 252, 250',
            dpi: 12000,
            buttons: 6,
            weight: '67g',
            wireless: false,
            price: 49.99,
            description: 'Glorious Model O',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/10.png',
          },
          {
            name: 'HP Omen Photon',
            color: '201, 1, 2',
            dpi: 16000,
            buttons: 11,
            weight: '128g',
            wireless: true,
            price: 99.99,
            description: 'HP Omen Photon',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/11.png',
          },
          {
            name: 'Asus ROG Chakram',
            color: '10, 181, 19',
            dpi: 16000,
            buttons: 9,
            weight: '121g',
            wireless: true,
            price: 159.99,
            description: 'Asus ROG Chakram',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/12.png',
          },
          {
            name: 'Razer Naga X',
            color: '100, 101, 102',
            dpi: 16000,
            buttons: 16,
            weight: '85g',
            wireless: false,
            price: 79.99,
            description: 'Razer Naga X',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/13.png',
          },
          {
            name: 'Mad Catz R.A.T. 8+',
            color: '136, 241, 242',
            dpi: 16000,
            buttons: 11,
            weight: '145g',
            wireless: false,
            price: 99.99,
            description: 'Mad Catz R.A.T. 8+',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/14.png',
          },
          {
            name: 'Alienware 610M',
            color: '109, 110, 114',
            dpi: 16000,
            buttons: 7,
            weight: '120g',
            wireless: true,
            price: 99.99,
            description: 'Alienware 610M',
            src: 'https://cdn.vuetifyjs.com/docs/images/graphics/mice/15.png',
          },
        ],
      }
    },
    methods: {
      onClickSeeAll () {
        this.itemsPerPage = this.itemsPerPage === 4 ? this.mice.length : 4
      },
    },
  }
</script>
