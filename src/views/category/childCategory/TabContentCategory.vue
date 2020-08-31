<template>
    <scroll class="scroll" ref="scroll">
      <div class="top">
        <div v-for="(item,index) in subcategories" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
          </a>
        </div>
      </div>
      <tab-control :titles="['流行','新款','精选']"
                   @controlStyle="controlStyle"
                   ref="tabControl2"/>
      <goods-list :goods="show"></goods-list>
    </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from  'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import {itemMix} from 'common/mixin'
    export default {
        name: "TabContentCategory",
      props: {
        subcategories:{
          type: Array
        },
        goods:{
          type: Object
        }
      },
      mixins:[itemMix],
      data() {
          return {
            currenStyle:'pop'
          }
      },
      components:{
        Scroll,
        TabControl,
        GoodsList
      },
      computed:{
          show() {
            return this.goods[this.currenStyle]
          }
      },
      deactivated() {
        this.$bus.$off('itemImgLoad',this.itemRefresh)
      },
      methods:{
        controlStyle(index) {
          switch (index) {
            case 0:
              this.currenStyle='pop'
              break
            case 1: this.currenStyle='new'
              break
            case 2: this.currenStyle='sell'
              break
          }
          this.$refs.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
.scroll{
  overflow: hidden;
  width: 295px;
}
  .top{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin-left: 10px;

  }
.top img{
  width: 95px;
  height: 95px;
}
.top p{
  width: 95px;
  white-space:nowrap;
}
</style>
