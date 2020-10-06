<template>
  <div>
    <div>
      <div class="text-center">
        <v-btn @click="content = !content">
          Change Content
        </v-btn>
      </div>

      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>Card 1</v-card-title>

              <div class="title text-center pb-3">
                Times Mutated: {{ card1 }}
              </div>

              <v-card-text v-mutate="() => onMutate('card1')">
                <p
                  v-for="n in +content + 2"
                  :key="n"
                  :class="n === +content + 2 && 'mb-0'"
                >
                  Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Fusce fermentum odio nec arcu. Aenean ut eros et nisl sagittis vestibulum. Nunc interdum lacus sit amet orci. Phasellus nec sem in justo pellentesque facilisis.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-card>
              <v-card-title>Card 2 (w/ once modifier)</v-card-title>

              <div class="title text-center pb-3">
                Times Mutated: {{ card2 }}
              </div>

              <v-card-text v-mutate.once="() => onMutate('card2')">
                <p
                  v-for="n in +content + 2"
                  :key="n"
                  :class="n === +content + 2 && 'mb-0'"
                >
                  Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Fusce fermentum odio nec arcu. Aenean ut eros et nisl sagittis vestibulum. Nunc interdum lacus sit amet orci. Phasellus nec sem in justo pellentesque facilisis.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      content: false,
      card1: 0,
      card2: 0,
    }),

    methods: {
      onMutate (card) {
        this[card]++
      },
    },
  }
</script>
