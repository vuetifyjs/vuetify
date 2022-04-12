<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-banner"
  >
    <v-defaults-provider
      :defaults="{
        VBanner: {
          avatar: model === 'avatar' ? 'https://vuetifyjs.b-cdn.net/images/john-smirk.png' : undefined,
          lines: model === 'one line' ? 'one' : undefined
        }
      }"
    >
      <v-banner>
        <v-banner-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam earum, est illo quae fugit voluptatum fuga magni hic maiores ipsa, illum, tenetur accusamus cupiditate? Dolorem ad nisi eveniet officia voluptatibus.
        </v-banner-text>

        <v-banner-actions>
          <v-btn
            v-for="n in 2"
            :key="n"
          >
            Action {{ n }}
          </v-btn>
        </v-banner-actions>
      </v-banner>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VBannerUsageExample',

    data: () => ({
      model: 'default',
      options: ['one line', 'avatar'],
    }),
  }
</script>
