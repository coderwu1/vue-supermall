<template>
    <div class="bar">
      <div><CheckButton class="check" :isClick="isSelectAll" @click.native="allClick"/></div>
      <div class="qx">全选</div>
      <div class="hj">合计: ¥{{totalPrice}}</div>
      <div class="js">去计算({{totalNuber}})</div>
    </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'
    export default {
        name: "CartBottonBar",
      components: {
        CheckButton
      },
      computed:{
        totalPrice() {
          return this.$store.state.cartList.filter(item => {
            return item.checked
          }).reduce((preValue,item) => {
            return preValue + item.newPrice * item.count
          },0).toFixed(2)
        },
        totalNuber() {
          return this.$store.state.cartList.filter(item => {
            return item.checked
          }).length
        },
        isSelectAll() {
          if(this.$store.state.cartList.length===0) return false
          return !(this.$store.state.cartList.filter(item => !item.checked).length)
        }
      },
      methods :{
        allClick() {
          if(this.isSelectAll){
            this.$store.state.cartList.forEach(item => item.checked=false)
          }
          else {
            this.$store.state.cartList.forEach(item => item.checked=true)
          }
        }
      }
    }
</script>

<style scoped>
.bar{
  height: 44px;
  display: flex;

}
.bar div{
  display: flex;
  flex: 1;
}
  .check{
    width: 22px;
    height: 22px;
    margin-top: 10px;
    margin-left: 20px;
  }
  .qx{
    line-height: 44px;
    margin-left: -75px;
  }
.hj{
      line-height: 44px;
      margin-left: -40px;
   }
.js{
  line-height: 44px;
  background-color: red;
  color: #f2f5f8;
  padding-left: 20px;
}
</style>
