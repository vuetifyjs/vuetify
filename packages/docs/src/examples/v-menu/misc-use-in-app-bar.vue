<template>
    <v-card class="mx-auto">
        <v-layout>
            <v-app-bar>
                <template v-slot:prepend>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                </template>
                <v-app-bar-title>
                    <v-menu v-model="show" location="bottom" offset="-30" transition="slide-y-transition"
                        :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" variant="outlined" size="small">Search</v-btn>
                        </template>
                        <v-card>
                            <v-text-field loading="true" density="compact" placeholder="Search" hide-details
                                ref="searchTextField" append-inner-icon="mdi-magnify"></v-text-field>
                            <v-card-text>
                                Search results
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </v-app-bar-title>
            </v-app-bar>
            <v-main>
                <v-card-text>Lorem Ipsum</v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        show: false,
    })
}
</script>
