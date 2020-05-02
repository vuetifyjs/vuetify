<template>
  <div>
    <v-responsive
      max-width="500"
      class="mx-auto mb-4"
    >
      <v-virtual-scroll
        :items="items"
        :item-size="500"
        width="100%"
        height="500"
        horizontal
      >
        <template v-slot="{ item }">
          <v-card
            class="mx-auto pa-5 my-2 pb-0"
            max-width="450"
          >
            <v-img
              class="white--text align-end"
              height="330px"
              :src="item.source"
            >
              <v-card-title>By {{ item.author }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Metadata</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Width: {{ item.width }}px</div>
              <div>Height: {{ item.height }}px</div>
            </v-card-text>
          </v-card>
        </template>
      </v-virtual-scroll>
    </v-responsive>
  </div>
</template>

<script>
  import * as data from './data.json'

  export default {
    data: () => ({
      items: data.default.map(i => ({
        source: `https://picsum.photos/id/${i.id}/450`,
        ...i,
      })),
    }),
  }
</script>
