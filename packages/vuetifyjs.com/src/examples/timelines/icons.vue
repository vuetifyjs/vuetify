<template>
  <v-timeline align-top>
    <v-timeline-item
      v-for="(item, i) in items"
      :color="item.color"
      :icon="item.icon"
      :small="item.small"
      :large="item.large"
      :medium="item.medium"
      :key="i"
      fill-dot
    >
      <v-card
        :color="item.color"
        dark
      >
        <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>
        <v-card-text class="white text--primary">
          <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
          <v-btn
            :color="item.color"
            class="mx-0"
            outline
          >
            Button
          </v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          color: 'red lighten-2',
          icon: 'mdi-buffer',
          small: true,
          large: false,
          medium: false
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-buffer',
          small: false,
          large: false,
          medium: false
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-buffer',
          small: false,
          large: false,
          medium: true
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
          small: false,
          large: true,
          medium: false
        }
      ]
    })
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
