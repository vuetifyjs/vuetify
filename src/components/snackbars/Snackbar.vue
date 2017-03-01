<template lang="pug">

div(class='snack')
    v-slide-y-transition
        div(
            class='snack--body'
            v-show="snack"
        )
            div(class='snack--content')
                span(
                    id='snack--msg'
                ) Connection timed out. Please try again. Please try again.
                v-btn(
                    flat
                    class='snack--action-btn'
                    v-if='hasAction'
                    @click.native="onAction"
                ) Undo
</template>

<script>

export default {
    name: 'snackbar',

	data () {
		return {
			snack: false,
			hasAction: true,
			foo: ""
		}
	},

	methods: {
		onAction () {
			console.log('action btn clicked')
			this.snack = false
		},
		activate () {
			this.foo = document.getElementById('snack--msg').clientHeight
			this.snack = true
			setTimeout(() => this.snack = false, 6000)
		}
	},

	mounted () {
		// setTimeout(this.activate, 2000)
	}

}


</script>
