<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-card-actions>
          <v-select v-model="size" :items="items" label="Size"></v-select>
          <div class="flex-grow-1"></div>
        </v-card-actions>
        <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
          <v-row>
            <v-col
              v-for="n in 9"
              :key="n"
              cols="4"
            >
              <v-card flat tile>
                <v-img
                  :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
                  height="150px"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      size: 'sm',
      items: [
        { text: 'Extra small (2px)', value: 'xs' },
        { text: 'Small (4px)', value: 'sm' },
        { text: 'Medium (8px)', value: 'md' },
        { text: 'Large (16px)', value: 'lg' },
        { text: 'Extra large (24px)', value: 'xl' },
      ],
    }),
  }
</script>
