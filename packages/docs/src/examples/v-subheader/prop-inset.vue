<template>
  <v-col
    cols="12"
    sm="6"
    offset-sm="3"
  >
    <v-card>
      <v-subheader :inset="inset">
        Subheader
      </v-subheader>

      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item
            v-if="item.action"
            :key="item.title"
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
        </template>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      inset: true,
      items: [
        {
          action: 'mdi-label',
          title: 'List item 1',
        },
        {
          divider: true,
        },
        {
          action: 'mdi-label',
          title: 'List item 2',
        },
        {
          divider: true,
        },
        {
          action: 'mdi-label',
          title: 'List item 3',
        },
      ],
    }),
  }
</script>
