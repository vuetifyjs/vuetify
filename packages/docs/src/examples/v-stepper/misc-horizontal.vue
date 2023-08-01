<template>
  <v-stepper
    v-model="step"
    :items="items"
    show-actions
  >
    <template v-slot:item.1>
      <h3 class="text-h6">Order</h3>

      <br>

      <v-sheet border>
        <v-table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-end">Quantity</th>
              <th class="text-end">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-text="product.name"></td>
              <td class="text-end" v-text="product.quantity"></td>
              <td class="text-end" v-text="product.quantity * product.price"></td>
            </tr>

            <tr>
              <th>Total</th>
              <th></th>
              <th class="text-end">
                ${{ subtotal }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </template>

    <template v-slot:item.2>
      <h3 class="text-h6">Shipping</h3>

      <br>

      <v-radio-group v-model="shipping" label="Delivery Method">
        <v-radio label="Standard Shipping" value="5"></v-radio>
        <v-radio label="Priority Shipping" value="10"></v-radio>
        <v-radio label="Express Shipping" value="15"></v-radio>
      </v-radio-group>
    </template>

    <template v-slot:item.3>
      <h3 class="text-h6">Confirm</h3>

      <br>

      <v-sheet border>
        <v-table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-end">Quantity</th>
              <th class="text-end">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-text="product.name"></td>
              <td class="text-end" v-text="product.quantity"></td>
              <td class="text-end" v-text="product.quantity * product.price"></td>
            </tr>

            <tr>
              <td>Shipping</td>
              <td></td>
              <td class="text-end" v-text="shipping"></td>
            </tr>

            <tr>
              <th>Total</th>
              <th></th>
              <th class="text-end">
                ${{ total }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </template>
  </v-stepper>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const shipping = ref(0)
  const step = ref(1)
  const subtotal = computed(() => products.reduce((acc, product) => acc + product.quantity * product.price, 0))
  const total = computed(() => subtotal.value + Number(shipping.value ?? 0))

  const items = [
    'Review Order',
    'Select Shipping',
    'Submit',
  ]
  const products = [
    {
      name: 'Product 1',
      price: 10,
      quantity: 2,
    },
    {
      name: 'Product 2',
      price: 15,
      quantity: 10,
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      shipping: 0,
      step: 1,
      items: [
        'Review Order',
        'Select Shipping',
        'Submit',
      ],
      products: [
        {
          name: 'Product 1',
          price: 10,
          quantity: 2,
        },
        {
          name: 'Product 2',
          price: 15,
          quantity: 10,
        },
      ],
    }),

    computed: {
      subtotal () {
        return this.products.reduce((acc, product) => acc + product.quantity * product.price, 0)
      },
      total () {
        return this.subtotal + Number(this.shipping ?? 0)
      },
    },
  }
</script>
