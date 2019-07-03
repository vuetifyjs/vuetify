<template>
  <div>
    <div class="text-xs-center py-4">
      <v-chip
        :close-icon="close === 'custom' ? 'mdi-close-outline' : undefined"
        :close="!!close"
        :color="color"
        :filter="variant.includes('filter')"
        :label="variant.includes('label')"
        :link="variant.includes('link')"
        :outlined="variant.includes('outlined')"
        :pill="variant.includes('pill')"
        :input-value="value"
      >
        <v-avatar
          v-if="avatar !== ''"
          :color="avatar === 'letter' ? 'secondary' : ''"
          left
        >
          <span
            v-if="avatar === 'letter'"
            class="white--text"
          >V</span>
          <v-img
            v-else-if="avatar === 'img'"
            src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
          ></v-img>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
        <v-icon
          v-if="!!icon"
          left
        >
          mdi-account-circle
        </v-icon>
        Chip Component
      </v-chip>
    </div>

    <v-card>
      <v-card-text>
        <span>Color</span>
        <v-radio-group
          v-model="color"
          row
        >
          <v-radio label="default" value=""></v-radio>
          <v-radio label="primary" value="primary"></v-radio>
          <v-radio label="warning" value="warning"></v-radio>
        </v-radio-group>

        <span>Close</span>
        <v-radio-group
          v-model="close"
          row
        >
          <v-radio label="none" value=""></v-radio>
          <v-radio label="default" value="default"></v-radio>
          <v-radio label="custom" value="custom"></v-radio>
        </v-radio-group>

        <span>Icon</span>
        <v-radio-group
          v-model="icon"
          row
        >
          <v-radio
            label="none"
            value=""
          ></v-radio>
          <v-radio
            label="icon"
            value="mdi-check"
          ></v-radio>
        </v-radio-group>

        <span>Avatar</span>
        <v-radio-group
          v-model="avatar"
          row
        >
          <v-radio
            label="none"
            value=""
          ></v-radio>
          <v-radio
            label="letter"
            value="letter"
          ></v-radio>
          <v-radio
            label="img"
            value="img"
          ></v-radio>
          <v-radio
            label="icon"
            value="icon"
          ></v-radio>
        </v-radio-group>

        <v-select
          v-model="variant"
          :items="['outlined', 'label', 'pill', 'filter', 'link']"
          filled
          chips
          deletable-chips
          label="Variants"
          multiple
          small-chips
        >

        </v-select>

        <span>State</span>
        <v-switch v-model="value" label="active"></v-switch>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      avatar: '',
      close: '',
      color: '',
      icon: '',
      value: false,
      variant: [],
    }),

    watch: {
      variant (val) {
        if (val.includes('filter')) {
          this.value = true
        }
      },
    },
  }
</script>
