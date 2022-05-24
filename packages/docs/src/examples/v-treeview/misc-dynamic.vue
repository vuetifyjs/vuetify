<template>
  <v-card>
    <v-card-title class="bg-indigo text-h5">
      User Directory
    </v-card-title>
    <div class="pa-4 d-flex justify-space-between">
      <v-treeview
        v-model:selected="selected"
        :items="items"
        :loading="loading"
        class="flex-grow-1"
        select-strategy="single-independent"
        selected-color="warning"
        select-on-click
        hide-select
        @click:open="handleOpen"
      ></v-treeview>

      <v-divider vertical class="mx-4"></v-divider>

      <div
        class="d-flex text-center flex-grow-1"
      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selectedUser"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select a User
          </div>
          <v-card
            v-else
            :key="selectedUser.id"
            class="pt-6 mx-auto"
            max-width="400"
            flat
          >
            <v-card-text>
              <v-avatar
                size="88"
              >
                <v-img
                  :src="`https://avataaars.io/${selectedUser.avatar}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{ selectedUser.name }}
              </h3>
              <div class="text-blue mb-2">
                {{ selectedUser.email }}
              </div>
              <div class="text-blue text-subheading font-weight-bold">
                {{ selectedUser.username }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row
              class="text-left ma-0"
              tag="v-card-text"
            >
              <v-col
                class="text-right mr-4"
                tag="strong"
                cols="5"
              >
                Company:
              </v-col>
              <v-col>{{ selectedUser.company.name }}</v-col>
              <v-col
                class="text-right mr-4"
                tag="strong"
                cols="5"
              >
                Website:
              </v-col>
              <v-col>
                <a
                  :href="`//${selectedUser.website}`"
                  target="_blank"
                >{{ selectedUser.website }}</a>
              </v-col>
              <v-col
                class="text-right mr-4"
                tag="strong"
                cols="5"
              >
                Phone:
              </v-col>
              <v-col>{{ selectedUser.phone }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </div>
    </div>
  </v-card>
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
    data: () => ({
      selected: [],
      open: [],
      users: [],
      loading: false,
      opened: false,
    }),

    computed: {
      items () {
        return [
          {
            title: 'Users',
            value: 'users',
            loading: this.loading,
            selectOnClick: false,
            $children: this.users.map(item => ({
              title: item.name,
              value: item.id,
              loading: false,
              prependIcon: 'mdi-account',
            })),
          },
        ]
      },
      selectedUser () {
        if (!this.selected.length) return undefined

        return this.users.find(user => user.id === this.selected[0])
      },
    },

    methods: {
      async handleOpen () {
        if (this.opened) return

        this.loading = true

        await pause(1500)

        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users')
          const json = await response.json()

          this.users = json.map(user => ({
            ...user,
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
          }))
        } finally {
          this.loading = false
          this.opened = true
        }
      },
    },
  }
</script>
