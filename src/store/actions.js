export default  {
  addCart(context,payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      context.commit('addCouter',oldProduct)
    }
    else {
      payload.count=1
      payload.checked=true
      context.commit('addCoune',payload)
    }
  }
}
