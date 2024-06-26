<template>
    <div class="text-center">
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="primary"> Hover me </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="i in 3" :title="`Item ${i}`"></v-list-item>
                <v-menu open-on-hover location="right" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
                            <v-list-item-title>Hover Me</v-list-item-title>
                        </v-list-item>
                    </template>
                    <v-list>
                        <v-list-item v-for="i in 3" :title="`Item ${i}`"></v-list-item>
                        <v-menu open-on-hover location="right" transition="scale-transition">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" class="cursor-pointer">
                                    <v-list-item-title>Hover Me</v-list-item-title>
                                </v-list-item>
                            </template>
                            <v-card>
                                <v-card-text> <v-icon>$vuetify</v-icon> </v-card-text>
                            </v-card>
                        </v-menu>
                    </v-list>
                </v-menu>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
</script>

<script>
export default {
}
</script>