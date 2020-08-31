<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <cart-botton-bar class="botton-bar"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import cartList from './childCart/cartList'
  import CartBottonBar from './childCart/CartBottonBar'
  import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
      components: {
        NavBar,
        Scroll,
        cartList,
        CartBottonBar
      },
      computed: {
          ...mapGetters(['cartLength'])
      },
      activated() {
          this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #eeeeee;
}
  .cart{
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
  }
  .botton-bar{
    position: relative;
    height: 44px;
    background-color: #eeeeee;
  }
</style>
