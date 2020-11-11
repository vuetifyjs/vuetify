module.exports = {
  'v-intersect': {
    argument: [{
      name: 'value',
      default: undefined,
      type: ['Function', '{ handler: Function, options?: IntersectionObserverInit }'],
      snippet: `
<template>
<v-card v-intersect="onIntersect">...</v-card>
</template>

<script>
export default {
  methods: {
    // Will be invoked on DOM mount and when the element is intersected
    onIntersect (entries, observer, isIntersecting) {}
  }
}
</script>`,
    }],
    modifiers: [
      {
        name: 'once',
        default: false,
        type: ['boolean'],
        snippet: `
<template>
  <v-card v-intersect.once="onIntersect">...</v-card>
</template>

<script>
  export default {
    methods: {
      // Will be invoked once at mount and once when it intersects
      // After the intersection the callback unbinds
      // Can be used with the quiet modifier
      onIntersect (entries, observer, isIntersecting) {}
    }
  }
</script>`,
      },
      {
        name: 'quiet',
        default: false,
        type: ['boolean'],
        snippet: `
<template>
  <v-card v-intersect.quiet="onIntersect">...</v-card>
</template>

<script>
  export default {
    methods: {
      // Will only be called once the element is intersected
      onIntersect (entries, observer, isIntersecting) {}
    }
  }
</script>`,
      },
    ],
  },
}
