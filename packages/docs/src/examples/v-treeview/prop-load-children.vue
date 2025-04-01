<template>
  <v-container fluid>
    <v-row justify="space-between" dense>
      <v-col cols="12" md="5">
        <v-treeview
          v-model:activated="active"
          v-model:opened="open"
          :items="items"
          :load-children="fetchUsers"
          density="compact"
          item-title="name"
          item-value="id"
          activatable
          border
          fluid
          open-on-click
          rounded
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children" icon="mdi-account"></v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-col class="d-flex text-center" cols="12" md="7">
        <v-card
          class="text-h6 justify-center align-center flex-1-1 d-flex"
          color="surface-light"
          height="100%"
          flat
          rounded
        >
          <template v-slot:text>
            <div v-if="!selected" class="text-subtitle-1">Select a User</div>

            <template v-else>
              <v-avatar :image="`https://avataaars.io/${avatar}`" class="mb-2" size="88"></v-avatar>

              <h3 class="text-h5">{{ selected.name }}</h3>

              <div class="text-medium-emphasis">{{ selected.email }}</div>

              <div class="text-medium-emphasis font-weight-bold">{{ selected.username }}</div>

              <v-divider class="my-4"></v-divider>

              <v-text-field
                :model-value="selected.company.name"
                class="mx-auto mb-2"
                density="compact"
                max-width="250"
                prefix="Company:"
                variant="solo"
                flat
                hide-details
                readonly
              ></v-text-field>

              <v-text-field
                :model-value="selected.website"
                class="mx-auto mb-2"
                density="compact"
                max-width="250"
                prefix="Website:"
                variant="solo"
                flat
                hide-details
                readonly
              ></v-text-field>

              <v-text-field
                :model-value="selected.phone"
                class="mx-auto"
                density="compact"
                max-width="250"
                prefix="Phone:"
                variant="solo"
                flat
                hide-details
                readonly
              ></v-text-field>
            </template>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  ]

  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

  const active = ref([])
  const avatar = ref(null)
  const open = ref([])
  const users = ref([])

  const items = computed(() => [
    {
      name: 'Users',
      children: users.value,
      id: 'users',
    },
  ])

  const selected = computed(() => {
    if (!active.value.length) return undefined

    const id = active.value[0]

    return users.value.find(user => user.id === id)
  })

  watch(selected, () => {
    randomAvatar()
  })

  async function fetchUsers (item) {
    await pause(1500)

    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => (item.children.push(...json)))
      .catch(err => console.warn(err))
  }

  function randomAvatar () {
    avatar.value = avatars[Math.floor(Math.random() * avatars.length)]
  }
</script>

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
      active: [],
      avatar: null,
      open: [],
      users: [],
    }),

    computed: {
      items () {
        return [
          {
            name: 'Users',
            children: this.users,
          },
        ]
      },
      selected () {
        if (!this.active.length) return undefined

        const id = this.active[0]

        return this.users.find(user => user.id === id)
      },
    },

    watch: {
      selected: 'randomAvatar',
    },

    methods: {
      async fetchUsers (item) {
        // Remove in 6 months and say
        // you've made optimizations! :)
        await pause(1500)

        return fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))
      },
      randomAvatar () {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
      },
    },
  }
</script>
