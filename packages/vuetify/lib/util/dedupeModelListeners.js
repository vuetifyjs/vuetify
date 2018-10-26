/**
 * Removes duplicate `@input` listeners when
 * using v-model with functional components
 *
 * @see https://github.com/vuetifyjs/vuetify/issues/4460
 */
export default function dedupeModelListeners(data) {
    if (data.model && data.on && data.on.input) {
        if (Array.isArray(data.on.input)) {
            var i = data.on.input.indexOf(data.model.callback);
            if (i > -1) data.on.input.splice(i, 1);
        } else {
            delete data.on.input;
        }
    }
}
//# sourceMappingURL=dedupeModelListeners.js.map