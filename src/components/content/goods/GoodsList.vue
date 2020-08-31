<template>
    <div class="goodlist">
      <goods-list-item v-for="item in goods" :item="item"></goods-list-item>
    </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
        name: "GoodsList",
      props :{
          goods :{
        }
      },
      components :{
        GoodsListItem
      }
    }
</script>

<style scoped>
  .goodlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
