<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-mask-input
          v-model="cardNumber"
          :rules="[
            v => !!v || 'Card number is required',
            v => v.replace(/\s/g, '').length === 16 || 'Card number must be 16 digits'
          ]"
          hint="Enter 16-digit card number"
          mask="#### #### #### ####"
          placeholder="XXXX XXXX XXXX XXXX"
          prepend-inner-icon="mdi-credit-card-outline"
          persistent-hint
        ></v-mask-input>
      </v-col>

      <v-col cols="6">
        <v-mask-input
          v-model="expiryDate"
          :rules="[
            v => !!v || 'Expiry date is required',
            v => validateExpiryDate(v) || 'Invalid expiry date'
          ]"
          hint="Enter expiry date"
          mask="##/##"
          placeholder="MM/YY"
          prepend-inner-icon="mdi-calendar-blank"
          persistent-hint
          return-masked-value
        ></v-mask-input>
      </v-col>

      <v-col cols="6">
        <v-mask-input
          v-model="cvv"
          :rules="[
            v => !!v || 'CVV is required',
            v => v.length === 3 || 'CVV must be 3 digits'
          ]"
          hint="3-digit security code"
          mask="###"
          placeholder="CVC"
          prepend-inner-icon="mdi-lock-outline"
          persistent-hint
        ></v-mask-input>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const cardNumber = shallowRef(null)
  const expiryDate = shallowRef(null)
  const cvv = shallowRef(null)

  const validateExpiryDate = date => {
    if (!date || date.length !== 5) return false

    const [month, year] = date.split('/')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1

    const monthNum = parseInt(month)
    const yearNum = parseInt(year)

    return monthNum >= 1 && monthNum <= 12 &&
      yearNum >= currentYear &&
      !(yearNum === currentYear && monthNum < currentMonth)
  }
</script>

<script>
  export default {
    data: () => ({
      cardNumber: null,
      expiryDate: null,
      cvv: null,
    }),
    methods: {
      validateExpiryDate (date) {
        if (!date || date.length !== 5) return false

        const [month, year] = date.split('/')
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1

        const monthNum = parseInt(month)
        const yearNum = parseInt(year)

        return monthNum >= 1 && monthNum <= 12 &&
          yearNum >= currentYear &&
          !(yearNum === currentYear && monthNum < currentMonth)
      },
    },
  }
</script>
