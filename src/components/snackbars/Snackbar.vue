<template lang="pug">

div(v-bind:class='[{"snack": true}, snackClasses]' ref="snack")
    v-slide-y-transition
        div( v-bind:class='[{"snack--body": true}, bodyClasses]' v-show="isActive" )
            div( class='snack--content' id='snack--content')
                slot
</template>

<script>
import Toggleable from '../../mixins/toggleable'
import { debounce } from '../../util/helpers'

export default {
    name: 'snackbar',

    mixins: [Toggleable],

    props: {
        left: Boolean,
        right: Boolean,
        top: Boolean,
        bottom: Boolean,
        timeout: {
            type: Number,
            default: 6000
        }
    },

    data () {
        return {
            textHeight: null,
            setup: false
        }
    },

    computed: {
        multipleLines () {
			return this.textHeight > 26
		},
		snackClasses () {
            // default to bottom
            let bottom = !this.left && !this.right && !this.top ? true : this.bottom

			return {
				'snack--position-left': this.left,
				'snack--position-right': this.right,
				'snack--position-top': this.top,
				'snack--position-bottom': bottom
			}
		},
        bodyClasses () {
            return {
                'snack--body-line': !this.multipleLines,
				'snack--body-lines': this.multipleLines
            }
        }
	},

    watch: {
        isActive () {
            if (this.isActive)
                setTimeout(() => this.isActive = false, this.timeout)
        }
    },

	methods: {
        activate () {
			this.isActive = true
		},
        deactivate () {
			this.isActive = false
		},
        setContentHeight () {
            if (this.textHeight !== document.getElementById('snack--content').clientHeight) {
                this.textHeight = document.getElementById('snack--content').clientHeight
                console.log('textHeight changed to', this.textHeight)
            }
        },
        resize () {
            if (this.isActive) {
                this.setContentHeight()
            }
            else {
                this.getContentHeightHack()
            }
        },
        getContentHeightHack () {
            this.$refs.snack.style.opacity = 0
    		this.activate()
    		this.setContentHeight()
    		setTimeout(() => {
    			this.deactivate()
    		}, 300)
    		setTimeout(() => {
    			this.$refs.snack.style.opacity = 1
    		}, 600)
        }
	},

    updated () {
        if (!this.setup || this.textHeight === 0) {
            this.resize()
            this.setup = true
        }
	},

    mounted () {
        this.getContentHeightHack()
        window.addEventListener('resize', debounce(this.resize, 200), false)
    }

}


</script>
