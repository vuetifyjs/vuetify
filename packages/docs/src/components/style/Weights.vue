<template>
  <v-card
    class="pa-5"
    flat
  >
    <div
      v-for="(weight, i) in weights"
      :key="`${i}-weight`"
      class="mb-3"
    >
      <div :class="`${weight[1]} my-2 display-2`">
        {{ weight[0] }}
      </div>
      <kbd>.{{ weight[1] }}</kbd>
    </div>
    <div
      v-for="(weight, i) in italics"
      :key="`${i}-italic`"
      class="mb-3"
    >
      <div :class="`${weight[1]} my-2 display-2 font-italic`">
        {{ weight[0] }}
      </div>
      <kbd>.{{ weight[1] }}.font-italic</kbd>
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      italics: [
        ['Roboto Thin Italic', 'font-weight-thin', '100'],
        ['Roboto Light Italic', 'font-weight-light', '300'],
        ['Roboto Regular Italic', 'font-weight-regular', '400'],
        ['Roboto Medium Italic', 'font-weight-medium', '500'],
        ['Roboto Bold Italic', 'font-weight-bold', '700'],
        ['Roboto Black Italic', 'font-weight-black', '900']
      ],
      weights: [
        ['Roboto Thin', 'font-weight-thin', '100'],
        ['Roboto Light', 'font-weight-light', '300'],
        ['Roboto Regular', 'font-weight-regular', '400'],
        ['Roboto Medium', 'font-weight-medium', '500'],
        ['Roboto Bold', 'font-weight-bold', '700'],
        ['Roboto Black', 'font-weight-black', '900']
      ]
    })

  }
</script>
