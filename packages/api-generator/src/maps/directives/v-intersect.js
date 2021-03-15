module.exports = {
  argument: [
    {
      name: 'value',
      type: [
        'Function',
        '{ handler: Function, options?: IntersectionObserverInit }',
      ],
      snippet: '\n<template>\n<v-card v-intersect="onIntersect">...</v-card>\n</template>\n\n<script>\nexport default {\n  methods: {\n    // Will be invoked on DOM mount and when the element is intersected\n    onIntersect (entries, observer, isIntersecting) {}\n  }\n}\n</script>',
    },
  ],
  modifiers: [
    {
      name: 'once',
      default: false,
      type: [
        'boolean',
      ],
      snippet: '\n<template>\n  <v-card v-intersect.once="onIntersect">...</v-card>\n</template>\n\n<script>\n  export default {\n    methods: {\n      // Will be invoked once at mount and once when it intersects\n      // After the intersection the callback unbinds\n      // Can be used with the quiet modifier\n      onIntersect (entries, observer, isIntersecting) {}\n    }\n  }\n</script>',
    },
    {
      name: 'quiet',
      default: false,
      type: [
        'boolean',
      ],
      snippet: '\n<template>\n  <v-card v-intersect.quiet="onIntersect">...</v-card>\n</template>\n\n<script>\n  export default {\n    methods: {\n      // Will only be called once the element is intersected\n      onIntersect (entries, observer, isIntersecting) {}\n    }\n  }\n</script>',
    },
  ],
  props: [],
}
