<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @controlStyle="controlStyle"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 class="tab-control"
    ></tab-control>
    <scroll class="scroll" ref="scroll"
            @scroll="scrollShow"
            :probeType="3"
            :pullUpLoad="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @controlStyle="controlStyle"
                   ref="tabControl2"
                   ></tab-control>
      <goods-list :goods="show"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { getHomeMultidata,getHomeGoods} from 'network/home'
  import FeatureView from './childComps/FeatureView'
  import TabControl from  'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import HomeSwiper from 'views/home/childComps/HomeSwiper'
  import RecommendView from 'views/home/childComps/RecommendView'
  import Scroll from 'components/common/scroll/Scroll'


  import {itemMix,backTopMix} from 'common/mixin'
    export default {
        name: "Home",
      components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,

      },
      data (){
          return {
            banners:[],
            recommends:[],
            goods: {
              'pop': {page: 0, list: []},
              'new': {page: 0, list: []},
              'sell': {page: 0, list: []},
            },
            currenStyle :'pop',

            swiperOffsetTop :0,
            isTabFixed: false,
            saveY: 0,

          }
      },
      mixins:[itemMix,backTopMix],
      created() {
        this.getHomeMultidata(),
        this.getHomeGoods('pop'),
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,this.saveY,0)

      },
      mounted (){

      },
      deactivated() {
        this.saveY=this.$refs.scroll.getScrollY()
        this.$bus.$off('itemImgLoad',this.itemRefresh)
      },
      computed :{
          show (){
            return  this.goods[this.currenStyle].list
          }
      },
      methods :{
        swiperImageLoad() {
          this.swiperOffsetTop=this.$refs.tabControl2.$el.offsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currenStyle)
        },
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
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        scrollShow(position) {
          this.isShow= (-position.y) > 1000
          this.isTabFixed =(-position.y) > this.swiperOffsetTop
        },


        getHomeMultidata (){
          getHomeMultidata().then(res => {
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
          })
        },
        getHomeGoods (type){
          const page=this.goods[type].page+1
          getHomeGoods (type,page).then(res =>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1
            this.$refs.scroll.finishPullUp()
        })
        }
      }
    }

</script>

<style scoped>
  .home-nav{
    background: var(--color-tint);
    color: #fff;

  }
  #home{

    position: relative;
    height: 100vh;
  }

  .scroll{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 44px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;

  }
</style>
