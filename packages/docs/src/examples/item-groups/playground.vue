<template>
  <v-container>
    <v-row justify="space-around">
      <v-switch
        v-model="mandatory"
        label="Mandatory"
      ></v-switch>
      <v-switch
        v-model="multiple"
        label="Multiple"
      ></v-switch>
      <v-col cols="12">
        <v-select
          v-model="type"
          :items="types"
          label="Item type"
        ></v-select>
      </v-col>
    </v-row>

    <v-item-group
      v-model="selected"
      :mandatory="mandatory"
      :multiple="multiple"
    >
      <v-container class="pa-0">
        <v-row>
          <v-col
            v-for="n in 3"
            :key="n"
            cols="12"
            md="4"
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
                    class="display-3 flex-grow-1 text-center"
                  >
                    Active
                  </div>
                </v-scroll-y-transition>
              </v-card>
              <v-img
                v-else
                src="https://picsum.photos/id/237/200/300"
                height="150"
                class="text-right pa-2"
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
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      mandatory: false,
      multiple: true,
      selected: null,
      types: [
        'cards',
        'images',
      ],
      type: 'cards',
    }),
    watch: {
      multiple (val) {
        this.selected = (val)
          ? this.selected >= 0 ? [this.selected] : []
          : this.selected.pop()
      },
    },
  }
</script>
