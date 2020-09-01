<template>
  <v-container class="grey">
    <div class="text-center d-flex justify-center align-center mb-12 flex-wrap">
      <v-btn
        class="mx-12 my-4"
        @click="loading = !loading"
      >
        Toggle
      </v-btn>

      <v-select
        v-model="transition"
        label="Transition"
        hide-details
        :items="transitions"
        style="max-width: 200px;"
      ></v-select>
    </div>

    <v-row justify="center">
      <v-col
        class="text-center"
        cols="12"
      >
        <div class="headline">
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
          height="94"
          type="list-item-two-line"
        >
          <v-card>
            <v-card-title>Title</v-card-title>
            <v-card-text>Card Text</v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>

      <v-col
        class="text-center"
        cols="12"
      >
        <div class="headline">
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
            height="94"
            type="list-item-two-line"
          >
          </v-skeleton-loader>

          <v-card
            v-else
          >
            <v-card-title>Title</v-card-title>
            <v-card-text>Card Text</v-card-text>
          </v-card>
        </component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: true,
      transition: 'scale-transition',
      transitions: [
        {
          text: 'None',
          value: undefined,
        },
        {
          text: 'Fade Transition',
          value: 'fade-transition',
        },
        {
          text: 'Scale Transition',
          value: 'scale-transition',
        },
      ],
    }),
  }
</script>
