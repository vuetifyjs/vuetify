<template>
    <div class="text-center">
        <v-btn-toggle divided>
            <v-btn color="primary">Action</v-btn>
            <v-menu open-on-hover location="bottom" width="100">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" icon>
                        <v-icon>$dropdown</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="i in 3" :key="i" :title="`Item ${i}`">
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn-toggle>
    </div>
</template>

<script setup>
</script>

<script>
export default {
}
</script>