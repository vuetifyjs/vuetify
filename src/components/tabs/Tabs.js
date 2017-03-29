export default {
  name: 'tabs',

  data () {
    return {
      activators: [],
      reverse: false,//This needs worked out
      resizeDebounce: {},
      active:''
    }
  },

  props: {
    centered: Boolean,
    grow: Boolean,
    icons: Boolean,
    scrollBars: Boolean,
    value: String
  },

  computed: {
    classes () {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--scroll-bars': this.scrollBars
      }
    }
  },
  mounted () {
    this.$vuetify.load(() => {
      this.init()
      window.addEventListener('resize', this.resize, false)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, false)
  },

  methods: {
    init () {
      //Should find a way to just get the first v-tab-item child
      //This removes need for most of the $refs
      this.activators = this.$refs.activators.$children.filter(i => i.$options._componentTag === 'v-tab-item')
      setTimeout(() => {
        //set active to starting postion either provided or first element
          //!this.value may need to be reworked
          //Also the above seems like it should be able to be simplified
        this.active=this.value || this.activators[0].$el;
      }, 200)
    },
    resize () {
      clearTimeout(this.resizeDebounce)
      this.resizeDebounce = setTimeout(() => {
        this.$refs.slider.$forceUpdate();
      }, 250)
    },
    tabClick(e){
      e.preventDefault;
      let el=e.target;
      if(el==e.currentTarget)return;
      while(!el.classList.contains('tab__item')){//This should be improved
        el=el.parentNode;
      }
      this.active=el.parentNode;
    }
  },

  render (h) {
    let tabsEls=[],tabsContent=[],tabsDefault=[],active=this.active;
    //sort slots based on tag name
    this.$slots.default.forEach(v=>{
      let tag=v.componentOptions.tag
      if(tag=='v-tab-item'){
        tabsEls.push(v)
      }
      else if(tag=='v-tab-content'){
        //only save tabs-content if id is equal to current active tab's href
        //need to look for a more elegant solution
        if(this.active&&this.active.children[0].getAttribute('href').replace('#','')==v.componentOptions.propsData.id){
          tabsContent.push(v)
        }
      }
      else tabsDefault.push(v)
    });

    const tabs = h('v-tabs-tabs', {
      ref: 'activators',
      nativeOn:{
        click:this.tabClick
      }
    }, [
      h('v-tabs-slider',{
        ref:'slider',
        props:{active:active}
      }),
      tabsEls
    ])

    const items = h('v-tabs-items', {
      'class': 'tabs__items',
    }, tabsContent)

    return h('div', {
      'class': this.classes,
    }, [tabsDefault, tabs, items])
  }
}
