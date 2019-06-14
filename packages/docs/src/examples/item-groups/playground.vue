<template>
  <v-layout column>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="mandatory" label="Mandatory"></v-switch>
      <v-switch v-model="multiple" label="Multiple"></v-switch>
      <v-flex xs12>
        <v-select v-model="type" :items="types" label="Item type"></v-select>
      </v-flex>
    </v-layout>

    <v-item-group :mandatory="mandatory" :multiple="multiple">
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex
            v-for="n in 3"
            :key="n"
            xs12
            md4
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                v-if="type === 'cards'"
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="200"
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div
                    v-if="active"
                    class="display-3 text-xs-center"
                  >
                    Active
                  </div>
                </v-scroll-y-transition>
              </v-card>
              <v-img
                v-else
                src="https://picsum.photos/id/237/200/300"
                height="150"
                class="text-xs-right pa-2"
                @click="toggle"
              >
                <v-btn
                  icon
                  dark
                >
                  <v-icon>
                    {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
              </v-img>
            </v-item>
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      types: [
        'cards',
        'images',
      ],
      type: 'cards',
      mandatory: false,
      multiple: true,
    }),
  }
</script>
