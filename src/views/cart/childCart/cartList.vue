<template>
  <div>
    <cart-list-item
      class="cart-list"
      v-for="item in cartList"

      :itemInfo="item"/>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import cartListItem from './cartListItem'
    export default {
        name: "cartList",
      computed: {
          ...mapGetters(['cartList'])
      },
      components: {
        cartListItem
      }
    }
</script>

<style scoped>

</style>
