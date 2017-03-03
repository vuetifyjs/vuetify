<template lang="pug">

div(v-bind:class='[{snack: true}, snackClasses]')
    v-slide-y-transition
        div( class='snack--body' v-show="isActive" )
            div( class='snack--content' )
                slot
</template>

<script>

export default {
    name: 'snackbar',

    props: {
        left: Boolean,
        right: Boolean,
        top: Boolean,
        bottom: Boolean
    },

    computed: {
		snackClasses () {
            // default to bottom
            let bottom = !this.left && !this.right && !this.top ? true : this.bottom

			return {
				'snack--position-left': this.left,
				'snack--position-right': this.right,
				'snack--position-top': this.top,
				'snack--position-bottom': bottom
			}
		}
	},

	methods: {
		activate () {
			this.isActive = true
		}
	}

}


</script>
