<template>
  <v-container>
    <v-layout column>
      <main-header>Lists</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-list>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            />

            <v-list-tile
              v-else
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>With avatars</core-title>
      <core-section>
        <v-list>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            />

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>Two-line</core-title>
      <core-section>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            />

            <v-list-tile
              v-else
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title v-html="item.subtitle" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>Two-line with avatars</core-title>
      <core-section>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            />

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title v-html="item.subtitle" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>With actions</core-title>
      <core-section>
        <v-list>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            />

            <v-list-tile
              v-else
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon color="pink">mdi-star</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>Two-line with actions</core-title>
      <core-section>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            />

            <v-list-tile
              v-else
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title v-html="item.subtitle" />
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon color="pink">mdi-star</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>Three-line</core-title>
      <core-section center style="max-width: 500px;">
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            />

            <v-list-tile
              v-else
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title v-html="item.subtitle" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>

      <core-title>Avatar, title and action</core-title>
      <core-section>
        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>
          <template
            v-for="(item, index) in items"
          >
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-if="item.divider"
              :key="index"
              :inset="item.inset"
            />

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">mdi-message</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Lists',

    data: () => ({
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    })
  }
</script>
