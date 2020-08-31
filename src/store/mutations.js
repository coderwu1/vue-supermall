export default {
  addCouter(state,payload) {
    payload.count+=1
  },
  addCoune(state,payload) {
    state.cartList.push(payload)
  }
}
