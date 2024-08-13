<template>
    <div class="text-center">
        <v-menu location="center">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props"> Open Menu </v-btn>
            </template>
            <v-card min-width="200" rounded="lg">
                <div class="d-flex justify-space-between pa-2">
                    <v-btn icon="mdi-cogs" size="small" variant="text"></v-btn>
                    <v-btn icon="mdi-content-copy" size="small" variant="text"></v-btn>
                    <v-btn icon="mdi-pencil" size="small" variant="text"></v-btn>
                    <v-btn icon="mdi-delete-outline" size="small" variant="text" color="error"></v-btn>
                </div>
            </v-card>
            <v-card class="mt-2" rounded="lg">
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-file-excel" title="Open With Excel">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-open-in-new" append-icon="mdi-menu-right" title="Open With">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-file-pdf-box" title="Export PDF">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-folder-zip-outline" title="Compress / zip">
                        <template v-slot:title>
                            Compress <v-icon>mdi-circle-small</v-icon> 7zip
                        </template>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-cloud-upload" title="Upload">
                        <template v-slot:append>
                            <v-chip label size="x-small" class="font-weight-medium text-grey border" variant="tonal">
                                Ctrl + U
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-access-point" title="Sharepoint"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-shield-star-outline" title="Protect">
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>