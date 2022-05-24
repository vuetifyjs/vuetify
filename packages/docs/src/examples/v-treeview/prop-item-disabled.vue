<template>
  <v-treeview
    show-select
    :items="items"
  ></v-treeview>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          value: 1,
          title: 'Applications',
          disabled: true,
          $children: [
            { value: 2, title: 'Calendar.app' },
            { value: 3, title: 'Chrome.app' },
            { value: 4, title: 'Webstorm.app' },
          ],
        },
        {
          value: 5,
          title: 'Documents',
          $children: [
            {
              value: 6,
              title: 'vuetify',
              $children: [
                {
                  value: 7,
                  title: 'src',
                  disabled: true,
                  $children: [
                    { value: 8, title: 'index.ts' },
                    { value: 9, title: 'bootstrap.ts' },
                  ],
                },
              ],
            },
            {
              value: 10,
              title: 'material2',
              $children: [
                {
                  value: 11,
                  title: 'src',
                  $children: [
                    { value: 12, title: 'v-btn.ts' },
                    { value: 13, title: 'v-card.ts' },
                    { value: 14, title: 'v-window.ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: 15,
          title: 'Downloads',
          $children: [
            { value: 16, title: 'October.pdf', disabled: true },
            { value: 17, title: 'November.pdf', disabled: true },
            { value: 18, title: 'Tutorial.html', disabled: true },
          ],
        },
        {
          value: 19,
          title: 'Videos',
          $children: [
            {
              value: 20,
              title: 'Tutorials',
              $children: [
                { value: 21, title: 'Basic layouts.mp4' },
                { value: 22, title: 'Advanced techniques.mp4' },
                { value: 23, title: 'All about app.dir' },
              ],
            },
            { value: 24, title: 'Intro.mov' },
            { value: 25, title: 'Conference introduction.avi' },
          ],
        },
      ],
    }),
  }
</script>
