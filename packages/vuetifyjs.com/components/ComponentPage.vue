<template lang="pug">
  page(:id="id")
    page-heading
      template(slot="title") {{ $t(data.header) }}
      p(v-html="$t(data.headerText)")
    section-heading Usage
    slot(name="top")
    section(
      v-for="(example, i) in data.examples"
      :key="i"
    )
      component-example(
        :header="`#${i + 1} ${example.header}`"
        :new-in="example.new"
        :file="example.file"
        :id="`example-${i + 1}`"
      )
        div(slot="desc" v-html="example.desc" v-if="example.desc")
    slot(name="bottom")

</template>

<script>
  export default {
    name: 'component-page',

    data: () => ({
      id: ''
    }),

    props: {
      data: Object,
      default: () => {}
    }
  }
</script>
