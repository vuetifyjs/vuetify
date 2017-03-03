<template lang="pug">

div(v-bind:class='[{snack: true}, snackClasses]')
    v-slide-y-transition
        div( class='snack--body' v-show="isActive" )
            div( class='snack--content' )
                slot
</template>

<script>
import Toggleable from '../../mixins/toggleable'

export default {
    name: 'snackbar',

    mixins: [Toggleable],

    props: {
        left: Boolean,
        right: Boolean,
        top: Boolean,
        bottom: Boolean,
        timeout: Number
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

    watch: {
        isActive () {
            if (this.isActive)
                setTimeout(() => this.isActive = false, this.timeout || 6000)
        }
    },

	methods: {
		activate () {
			this.isActive = true
		}
	}

}


</script>
