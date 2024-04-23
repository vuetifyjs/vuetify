<template>
  <v-sheet rounded="b" border>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="target"
            :items="targets"
            label="Target"
            prepend-inner-icon="mdi-bullseye"
            variant="outlined"
            hide-details
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-if="target === 'By Number'"
            v-model.number="number"
            label="Number"
            max="2000"
            min="0"
            prepend-inner-icon="mdi-numeric"
            step="1"
            type="number"
            variant="outlined"
            hide-details
            @keydown.enter="onClick"
          ></v-text-field>

          <v-select
            v-else-if="target === 'By Query Selector'"
            v-model="query"
            :items="queries"
            label="Query Selector"
            prepend-inner-icon="mdi-format-header-1"
            variant="outlined"
            hide-details
          ></v-select>

          <v-select
            v-else
            v-model="component"
            :items="components"
            label="Component / Element"
            prepend-inner-icon="mdi-card-bulleted"
            variant="outlined"
            hide-details
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="easing"
            :items="easings"
            label="Easing"
            prepend-inner-icon="mdi-sine-wave"
            variant="outlined"
            hide-details
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="duration"
            label="Duration"
            max="2000"
            min="50"
            prepend-inner-icon="mdi-timer-sand"
            step="1"
            type="number"
            variant="outlined"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-slider
            v-model="offset"
            append-icon="mdi-axis-arrow"
            label="Offset"
            max="100"
            min="-100"
            step="1"
            hide-details
            thumb-label
          ></v-slider>
        </v-col>

        <v-divider class="my-3 mx-n1"></v-divider>

        <v-col class="mt-n2" cols="10">
          <v-btn
            color="surface-variant"
            text="Go To"
            variant="flat"
            block
            @click="onClick"
          ></v-btn>
        </v-col>

        <v-col class="mt-n2" cols="2">
          <v-btn
            color="error"
            text="Reset"
            variant="outlined"
            block
            @click="onClickReset"
          ></v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <div
      id="goto-container-example"
      class="overflow-auto"
      style="max-height: 400px;"
    >
      <v-sheet
        class="pa-4"
        color="surface-light"
      >
        <div id="heading-1" class="text-h5">Heading 1</div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!</p>

        <br>

        <v-card
          :ref="instance => cards.card1 = instance"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
          title="Card 1"
          flat
        ></v-card>

        <div style="height: 420px;"></div>

        <div id="heading-2" class="text-h5">Heading 2</div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!</p>

        <br>

        <v-card
          :ref="instance => cards.card2 = instance"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
          title="Card 2"
          flat
        ></v-card>

        <div style="height: 420px;"></div>

        <div id="heading-3" class="text-h5">Heading 3</div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!</p>

        <br>

        <v-card
          :ref="instance => cards.card3 = instance"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
          title="Card 3"
          flat
        ></v-card>

        <div style="height: 420px;"></div>

        <div id="heading-4" class="text-h5">Heading 4</div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!</p>

        <br>

        <v-card
          :ref="instance => cards.card4 = instance"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
          title="Card 4"
          flat
        ></v-card>

        <div style="height: 180px;"></div>

        <v-btn
          append-icon="mdi-arrow-up-bold"
          text="Back to Top"
          variant="tonal"
          @click="goTo(0, { container: '#goto-container-example' })"
        ></v-btn>
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useGoTo } from 'vuetify'

  const goTo = useGoTo()

  const duration = ref(300)
  const number = ref(500)
  const offset = ref(0)
  const cards = {
    card1: ref(null),
    card2: ref(null),
    card3: ref(null),
    card4: ref(null),
  }
  const component = ref('card3')
  const components = [
    { title: 'Card 1', value: 'card1' },
    { title: 'Card 2', value: 'card2' },
    { title: 'Card 3', value: 'card3' },
    { title: 'Card 4', value: 'card4' },
  ]
  const query = ref('#heading-3')
  const queries = [
    '#heading-1',
    '#heading-2',
    '#heading-3',
    '#heading-4',
  ]
  const target = ref('By Number')
  const targets = [
    'By Number',
    'By Query Selector',
    'By Component / Element',
  ]
  const easing = ref('easeInOutCubic')
  const easings = [
    'linear',
    'easeInQuad',
    'easeOutQuad',
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint',
  ]

  const options = computed(() => ({
    container: '#goto-container-example',
    duration: duration.value,
    easing: easing.value,
    offset: offset.value,
  }))

  function onClick () {
    if (target.value === 'By Number') {
      goTo(number.value, options.value)
    } else if (target.value === 'By Query Selector') {
      goTo(query.value, options.value)
    } else if (target.value === 'By Component / Element') {
      goTo(cards[component.value].$el, options.value)
    }
  }

  function onClickReset () {
    component.value = 'card3'
    duration.value = 300
    easing.value = 'easeInOutCubic'
    number.value = 500
    offset.value = 0
    query.value = '#heading-3'
    target.value = 'By Number'

    goTo(0, { container: '#goto-container-example' })
  }
</script>

<script>
  import { useGoTo } from 'vuetify'

  export default {
    setup () {
      const goTo = useGoTo()
      return { goTo }
    },
    data () {
      return {
        duration: 300,
        number: 500,
        offset: 0,
        cards: {
          card1: null,
          card2: null,
          card3: null,
          card4: null,
        },
        component: 'card3',
        components: [
          { title: 'Card 1', value: 'card1' },
          { title: 'Card 2', value: 'card2' },
          { title: 'Card 3', value: 'card3' },
          { title: 'Card 4', value: 'card4' },
        ],
        query: '#heading-3',
        queries: [
          '#heading-1',
          '#heading-2',
          '#heading-3',
          '#heading-4',
        ],
        target: 'By Number',
        targets: [
          'By Number',
          'By Query Selector',
          'By Component / Element',
        ],
        easing: 'easeInOutCubic',
        easings: [
          'linear',
          'easeInQuad',
          'easeOutQuad',
          'easeInOutQuad',
          'easeInCubic',
          'easeOutCubic',
          'easeInOutCubic',
          'easeInQuart',
          'easeOutQuart',
          'easeInOutQuart',
          'easeInQuint',
          'easeOutQuint',
          'easeInOutQuint',
        ],
      }
    },
    computed: {
      options () {
        return {
          container: '#goto-container-example',
          duration: this.duration,
          easing: this.easing,
          offset: this.offset,
        }
      },
    },
    methods: {
      onClick () {
        if (this.target === 'By Number') {
          this.goTo(this.number, this.options)
        } else if (this.target === 'By Query Selector') {
          this.goTo(this.query, this.options)
        } else if (this.target === 'By Component / Element') {
          this.goTo(this.cards[this.component].$el, this.options)
        }
      },
      onClickReset () {
        this.component = 'card3'
        this.duration = 300
        this.easing = 'easeInOutCubic'
        this.number = 500
        this.offset = 0
        this.query = '#heading-3'
        this.target = 'By Number'

        this.goTo(0, { container: '#goto-container-example' })
      },
    },
  }
</script>
