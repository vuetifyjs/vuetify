<template>
  <div class="grey lighten-5 pa-3">
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
        sm4
      >
        <v-card>
          <v-subheader :inset="inset">Subheader</v-subheader>

          <v-list>
            <template v-for="(item, index) in items">
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
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      class="mt-5"
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
      >
        <template>
          <v-checkbox
            v-model="inset"
            hide-details
            label="Inset"
            light
          ></v-checkbox>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      inset: false,
      items: [
        {
          action: 'inbox',
          title: 'inbox',
        },
        {
          divider: true,
        },
        {
          action: 'send',
          title: 'send',
        },
        {
          divider: true,
        },
        {
          action: 'delete',
          title: 'trash',
        },
      ],
    }),
  }
</script>
