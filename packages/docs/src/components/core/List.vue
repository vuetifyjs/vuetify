<template>
  <v-list
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :href="item.href"
      :to="item.to"
      v-bind="{
        target: item.href ? '_blank' : undefined,
        rel: item.href ? 'noopener': undefined
      }"
    >
      <v-list-item-icon v-if="item[itemIcon]">
        <v-icon v-text="item[itemIcon]" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item[itemText]" />
        <v-list-sub-tile-title
          v-if="item[itemSubTitle]"
          v-text="item[itemSubTitle]"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    inheritAttrs: false,

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
      itemIcon: {
        type: String,
        default: 'icon',
      },
      itemSubTitle: {
        type: String,
        default: 'subTitle',
      },
      itemText: {
        type: String,
        default: 'text',
      },
      itemValue: {
        type: String,
        default: 'value',
      },
    },
  }
</script>
