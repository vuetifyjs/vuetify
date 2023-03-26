<template>
  <v-container>
    <div class="text-center d-flex justify-center align-center mb-12 flex-wrap">
      <v-btn
        class="mx-12 my-4"
        @click="loading = !loading"
      >
        Toggle
      </v-btn>

      <v-select
        v-model="transition"
        :items="transitions"
        hide-details
        label="Transition"
        style="max-width: 200px;"
      ></v-select>
    </div>

    <v-row justify="center">
      <v-col
        class="text-center"
        cols="12"
      >
        <div class="text-h5">
          Default Slot
        </div>
      </v-col>

      <v-col
        class="mb-12"
        cols="12"
        md="4"
      >
        <v-skeleton-loader
          :loading="loading"
          :transition="transition"
          type="list-item-two-line"
        >
          <v-list-item
            title="Title"
            subtitle="Subtitle"
            lines="two"
            rounded
          ></v-list-item>
        </v-skeleton-loader>
      </v-col>

      <v-col
        class="text-center"
        cols="12"
      >
        <div class="text-h5">
          If conditional<br>w/Transition Element
        </div>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <component
          :is="transition !== 'None' ? `v-${transition}` : 'div'"
          hide-on-leave
        >
          <v-skeleton-loader
            v-if="loading"
            type="list-item-two-line"
          ></v-skeleton-loader>

          <v-list-item
            v-else
            title="Title"
            subtitle="Subtitle"
            lines="two"
            rounded
          ></v-list-item>
        </component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: true,
      transition: 'fade-transition',
      transitions: [
        {
          title: 'None',
          value: undefined,
        },
        {
          title: 'Fade Transition',
          value: 'fade-transition',
        },
        {
          title: 'Scale Transition',
          value: 'scale-transition',
        },
      ],
    }),
  }
</script>
