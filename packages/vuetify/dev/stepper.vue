<template>
  <v-app>
    <v-locale-provider :rtl="rtl">
      <v-btn @click="rtl = !rtl">rtl</v-btn>
      <v-stepper :items="items">
        <template #content.foo="props">
          <v-card>
            <v-card-text>
              hello
            </v-card-text>
          </v-card>
        </template>
        <template #content.bar="props">
          <v-card>
            <v-card-text>
              hello
            </v-card-text>
          </v-card>
        </template>
      </v-stepper>

      <hr class="ma-10">

      <v-stepper :items="items" direction="horizontal">
        <template #content.foo="props">
          <v-card>
            <v-card-text>
              hello
            </v-card-text>
          </v-card>
        </template>
        <template #content.bar="props">
          <v-card>
            <v-card-text>
              hello
            </v-card-text>
          </v-card>
        </template>
      </v-stepper>
    </v-locale-provider>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      rtl: false,
      open: null,
      active: null,
      items: [
        {
          value: 'foo',
        },
        {
          value: 'bar',
        },
      ],
      loadedItems: [
        {
          value: 'root',
          text: 'root',
          loaded: false,
          children: [],
        },
      ],
      opened: [],
      isCtrl: false,
      count: 1,
    }),
  }
</script>
