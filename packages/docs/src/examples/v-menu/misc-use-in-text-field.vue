<template>
    <v-layout>
        <v-container class="mb-10">
            <v-bottom-navigation :elevation="10">
                <v-text-field variant="outlined" density="compact" hide-details class="pa-2 px-15">
                    <template #append-inner>
                        <div class="d-flex">
                            <v-menu location="top" offset="25"
                                transition="slide-x-transition">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="" v-bind="props"><v-icon size="small" color="yellow">mdi-emoticon</v-icon></v-btn>
                                </template>

                                <v-card>
                                    <v-text-field hide-details append-inner-icon="mdi-magnify"
                                        label="Search"></v-text-field>
                                    <v-container>

                                        <div class="d-flex align-center justify-space-between  mt-4">
                                            <span class="text-body-2 font-weight-bold"> Emoji's </span>
                                            <v-btn variant="text" size="x-small">See all ></v-btn>
                                        </div>
                                        <div class="d-flex justify-space-between">
                                            <v-btn variant="text" size="small" icon>✨</v-btn>
                                            <v-btn variant="text" size="small" icon>🔥</v-btn>
                                            <v-btn variant="text" size="small" icon>⭐</v-btn>
                                            <v-btn variant="text" size="small" icon>😊</v-btn>
                                            <v-btn variant="text" size="small" icon>💀</v-btn>
                                            <v-btn variant="text" size="small" icon>😂</v-btn>
                                        </div>

                                        <div class="d-flex align-center justify-space-between  mt-4">
                                            <span class="text-body-2 font-weight-bold"> Gifs </span>
                                            <v-btn variant="text" size="x-small">See all ></v-btn>
                                        </div>

                                        <v-row dense>
                                            <v-col v-for="n in 3" cols="4" :key="`gifs-${n}`">
                                                <v-sheet color="surface-variant-alt" height="96" rounded></v-sheet>
                                            </v-col>
                                        </v-row>
                                        <div class="d-flex align-center justify-space-between mt-4">
                                            <span class="text-body-2 font-weight-bold"> Stickers </span>
                                            <v-btn variant="text" size="x-small">See all ></v-btn>
                                        </div>
                                        <v-row dense>
                                            <v-col v-for="n in 3" cols="4" :key="`stickers-${n}`">
                                                <v-sheet color="surface-variant-alt" height="96" rounded></v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <div class="d-flex justify-end pb-2 px-4 text-caption">
                                        ⚡by vuetify
                                    </div>
                                </v-card>
                            </v-menu>
                            <v-divider vertical class="mx-2 "></v-divider>
                            <v-btn size=""><v-icon size="small" color="white">mdi-send</v-icon></v-btn>
                        </div>
                    </template>
                </v-text-field>
            </v-bottom-navigation>
        </v-container>
    </v-layout>
</template>
