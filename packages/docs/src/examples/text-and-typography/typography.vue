<template>
  <v-item-group mandatory>
    <v-sheet
      class="overflow-y-auto"
      max-height="600"
      tile
    >
      <v-item
        v-for="[
          c,
          text,
          size,
          weight,
          spacing,
          margin
        ] in classes"
        :key="c"
      >
        <template v-slot="{ active, toggle }">
          <v-sheet
            :color="active ? $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4' : undefined"
            class="px-4 pt-4 pb-3"
            tile
            style="cursor: pointer;"
            @click="toggle"
          >
            <div
              :class="[`text-${c}`, active && `mb-${margin}`]"
              class="transition-swing"
              v-text="text"
            >
            </div>

            <v-expand-transition>
              <v-responsive
                v-if="active"
                max-width="350"
              >
                <div class="d-flex justify-space-between caption">
                  <div>
                    <div class="grey--text mb-2">
                      Font
                    </div>

                    <div class="font-weight-medium">
                      Roboto
                    </div>
                  </div>

                  <div>
                    <div class="grey--text mb-2">
                      Weight
                    </div>

                    <div
                      class="font-weight-medium"
                      v-text="weight"
                    ></div>
                  </div>

                  <div>
                    <div class="grey--text mb-2">
                      Size
                    </div>

                    <div
                      class="font-weight-medium"
                      v-text="size"
                    ></div>
                  </div>

                  <div>
                    <div class="grey--text text-darken-1 mb-2">
                      Letter spacing
                    </div>

                    <div
                      class="font-weight-medium"
                      v-text="spacing"
                    ></div>
                  </div>
                </div>
              </v-responsive>
            </v-expand-transition>
          </v-sheet>
        </template>
      </v-item>
    </v-sheet>
  </v-item-group>
</template>

<script>
  export default {
    data: () => ({
      model: null,
      classes: [
        ['h1', 'Heading 1', '6rem', '300', '-.015625em', -1],
        ['h2', 'Heading 2', '3.75rem', '300', '-.0083333333em', 0],
        ['h3', 'Heading 3', '3rem', '400', 'normal', 1],
        ['h4', 'Heading 4', '2.125rem', '400', '.0073529412em', 2],
        ['h5', 'Heading 5', '1.5rem', '400', 'normal', 2],
        ['h6', 'Heading 6', '1.25rem', '500', '.0125em', 3],
        ['subtitle-1', 'Subtitle 1', '1rem', '400', '.009375em', 4],
        ['subtitle-2', 'Subtitle 2', '0.875rem', '500', '.0071428571em', 4],
        ['body-1', 'Body 1', '1rem', '400', '.03125em', 4],
        ['body-2', 'Body 2', '0.875rem', '400', '.0178571429em', 4],
        ['button', 'Button', '0.875rem', '500', '.0892857143em', 4],
        ['caption', 'Caption', '0.75rem', '400', '.0333333333em', 4],
        ['overline', 'Overline', '0.75rem', '500', '.1666666667em', 4],
      ],
    }),
  }
</script>
