<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods>
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :goods="item"/>
    </goods>
  </div>
</template>

<script>
  import Goods from 'components/content/goods/Goods'
  import GoodsListItem from 'components/content/goods/GoodsListItem'

	export default {
		name: "DetailRecommendInfo",
    components: {
      Goods,
      GoodsListItem
    },
    props: {
		  recommendList: {
		    type: Array
      }
    }
	}
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
