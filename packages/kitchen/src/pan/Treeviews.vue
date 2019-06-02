<template>
  <v-container>
    <v-layout column>
      <main-header>Treeviews</main-header>

      <core-title>
        File tree
      </core-title>
      <core-section>
        <v-treeview
          v-model="tree1"
          :open="open1"
          :items="items1"
          activatable
          item-key="name"
          open-on-click
          #prepend="{ item, open }"
        >
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files1[item.file] }}
          </v-icon>
        </v-treeview>
      </core-section>

      <core-title>
        Async data loading
      </core-title>
      <core-section>
        <v-card>
          <v-card-title class="indigo white--text headline">
            User Directory
          </v-card-title>
          <v-layout
            justify-space-between
            pa-3
          >
            <v-flex xs5>
              <v-treeview
                :active.sync="active2"
                :items="items2"
                :load-children="fetchUsers2"
                :open.sync="open2"
                activatable
                active-class="primary--text"
                class="grey lighten-5"
                open-on-click
                transition
                #prepend="{ item, active }"
              >
                <v-icon
                  v-if="!item.children"
                  :color="active ? 'primary' : ''"
                >
                  mdi-account
                </v-icon>
              </v-treeview>
            </v-flex>
            <v-flex
              d-flex
              text-xs-center
            >
              <v-scroll-y-transition mode="out-in">
                <div
                  v-if="!selected2"
                  class="title grey--text text--lighten-1 font-weight-light"
                  style="align-self: center;"
                >
                  Select a User
                </div>
                <v-card
                  v-else
                  :key="selected2.id"
                  class="pt-4 mx-auto"
                  flat
                  max-width="400"
                >
                  <v-card-text>
                    <v-avatar
                      v-if="avatar2"
                      size="88"
                    >
                      <v-img
                        :src="`https://avataaars.io/${avatar2}`"
                        class="mb-4"
                      />
                    </v-avatar>
                    <h3 class="headline mb-2">
                      {{ selected2.name }}
                    </h3>
                    <div class="blue--text mb-2">
                      {{ selected2.email }}
                    </div>
                    <div class="blue--text subheading font-weight-bold">
                      {{ selected2.username }}
                    </div>
                  </v-card-text>
                  <v-divider />
                  <v-layout
                    tag="v-card-text"
                    text-xs-left
                    wrap
                  >
                    <v-flex
                      tag="strong"
                      xs5
                      text-xs-right
                      mr-3
                      mb-2
                    >
                      Company:
                    </v-flex>
                    <v-flex>{{ selected2.company.name }}</v-flex>
                    <v-flex
                      tag="strong"
                      xs5
                      text-xs-right
                      mr-3
                      mb-2
                    >
                      Website:
                    </v-flex>
                    <v-flex>
                      <a
                        :href="`//${selected2.website}`"
                        target="_blank"
                      >
                        {{ selected2.website }}
                      </a>
                    </v-flex>
                    <v-flex
                      tag="strong"
                      xs5
                      text-xs-right
                      mr-3
                      mb-2
                    >
                      Phone:
                    </v-flex>
                    <v-flex>{{ selected2.phone }}</v-flex>
                  </v-layout>
                </v-card>
              </v-scroll-y-transition>
            </v-flex>
          </v-layout>
        </v-card>
      </core-section>

      <core-title>
        Prepend & append slots
      </core-title>
      <core-section>
        <v-layout
          row
          justify-space-around
        >
          <v-flex>
            <v-treeview
              v-model="tree3"
              :open="open3"
              :items="items3"
              activatable
              item-key="name"
              open-on-click
            >
              <template
                #prepend="{ item, open }"
              >
                <v-icon v-if="!item.file">
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  {{ files3[item.file] }}
                </v-icon>
              </template>

              <template
                #append="{ item }"
              >
                <span v-if="item.changed">
                  U
                </span>
              </template>
            </v-treeview>
          </v-flex>

          <v-flex />
        </v-layout>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  ]

  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

  export default {
    name: '',

    data: () => ({
      open1: ['public'],
      files1: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree1: [],
      items1: [
        {
          name: '.git',
        },
        {
          name: 'node_modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png',
              }],
            },
            {
              name: 'favicon.ico',
              file: 'png',
            },
            {
              name: 'index.html',
              file: 'html',
            },
          ],
        },
        {
          name: '.gitignore',
          file: 'txt',
        },
        {
          name: 'babel.config.js',
          file: 'js',
        },
        {
          name: 'package.json',
          file: 'json',
        },
        {
          name: 'README.md',
          file: 'md',
        },
        {
          name: 'vue.config.js',
          file: 'js',
        },
        {
          name: 'yarn.lock',
          file: 'txt',
        },
      ],
      active2: [],
      avatar2: null,
      open2: [],
      users2: [],
      open3: ['public'],
      files3: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree3: [],
      items3: [
        {
          name: '.git',
        },
        {
          name: 'node_modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png',
              }],
            },
            {
              name: 'favicon.ico',
              file: 'png',
            },
            {
              name: 'index.html',
              file: 'html',
              changed: true,
            },
          ],
        },
        {
          name: '.gitignore',
          file: 'txt',
        },
        {
          name: 'babel.config.js',
          file: 'js',
        },
        {
          name: 'package.json',
          file: 'json',
          changed: true,
        },
        {
          name: 'README.md',
          file: 'md',
        },
        {
          name: 'vue.config.js',
          file: 'js',
        },
        {
          name: 'yarn.lock',
          file: 'txt',
          changed: true,
        },
      ],
    }),

    computed: {
      items2 () {
        return [
          {
            name: 'Users',
            children: this.users2,
          },
        ]
      },
      selected2 () {
        if (!this.active2.length) return undefined

        const id = this.active2[0]

        return this.users2.find(user => user.id === id)
      },
    },

    watch: {
      selected2: 'randomAvatar2',
    },

    methods: {
      async fetchUsers2 (item) {
        // Remove in 6 months and say
        // you've made optimizations! :)
        await pause(1500)

        return fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))
      },
      randomAvatar2 () {
        this.avatar2 = avatars[Math.floor(Math.random() * avatars.length)]
      },
    },
  }
</script>
