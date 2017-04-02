export default{
  name:'tab-slider',
  props:['active'],
  functional:true,
  render(h,ctx){
    return h('div',{
      style:{
        width:`${ctx.props.active.clientWidth}px`,
        left:`${ctx.props.active.offsetLeft}px`
      },
      attrs:{
        class:'tabs__slider'
      }
    })
  }
}
