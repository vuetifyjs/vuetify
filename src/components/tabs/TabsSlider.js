export default{
  name:'tab-slider',
  props:['active'],
  //functional:true,
  //The ref in tabs.js doesn't work if this is functional
  //if solved `this` below needs to be changed to ctx.props
  render(h,ctx){
    return h('div',{
      style:{
        width:`${this.active.clientWidth}px`,
        left:`${this.active.offsetLeft}px`
      },
      attrs:{
        class:'tabs__slider'
      }
    })
  }
}
