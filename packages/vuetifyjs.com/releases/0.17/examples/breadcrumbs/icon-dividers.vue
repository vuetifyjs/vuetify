<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">forward</v-icon>
      <v-breadcrumbs-item 
        v-for="item in items" :key="item.text"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item 
        v-for="item in items" :key="item.text"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ]
      }
    }
  }
</script>