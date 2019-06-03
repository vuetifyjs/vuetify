<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-subheader :inset="inset">Subheader</v-subheader>

      <v-list>
        <v-template v-for="(item, index) in items" :key="index">
          <v-list-item
            v-if="item.action"
            :key="item.title"
            @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </v-template>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    data: () => ({
      inset: true,
      items: [
        {
          action: 'label',
          title: 'list item',
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'list item',
        },
        {
          divider: true,
        },
        {
          action: 'label',
          title: 'list item',
        },
      ],
    }),
  }
</script>
