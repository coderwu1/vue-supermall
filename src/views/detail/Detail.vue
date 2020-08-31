<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="3">
        <swiper-detail :topImg="topImg"></swiper-detail>
        <detail-base-info :goods="goods"></detail-base-info>
        <DetailShopInfo :shop="shop"></DetailShopInfo>
        <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad" />
        <DetailParamInfo :paramInfo="paramInfo" ref="param"/>
        <DetailCommentInfo :commentInfo="commentInfo" class="aa" ref="comment"></DetailCommentInfo>
        <GoodsList :goods="recommendList" ref="recommend"></GoodsList>
      </scroll>
      <detail-bottom-bar class="detail-bottom-bar" @addCart="addCart"/>
      <backTop @click.native="backClick" v-show="isShow"/>

    </div>
</template>

<script>
  import detailNavBar from './childComps/detailNavBar'
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import swiperDetail from './childComps/swiperDetail'
  import detailBaseInfo from './childComps/detailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import {debounce} from 'common/utils'
  import {itemMix,backTopMix} from 'common/mixin'
  import detailBottomBar from './childComps/detailBottomBar'
  import backTop from 'components/content/backtop/backTop'

    export default {
        name: "Detail",
      data() {
          return {
            iid: null,
            topImg: [],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo: {},
            recommendList: [],
            clickTop:[],
            getTop:null,
            currentIndex:0
          }
      },
      components :{
        detailNavBar,
        swiperDetail,
        detailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        detailBottomBar,

      },
      mixins:[itemMix,backTopMix],
      created() {
          this.iid=this.$route.params.iid
        getDetail(this.iid).then( res => {
          const data=res.result
          this.topImg = data.itemInfo.topImages
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
        console.log(this.goods);
        getRecommend().then(res => {
          this.recommendList = res.data.list
        })
        this.getTop=debounce(() => {
          this.clickTop=[]
          this.clickTop.push(0)
          this.clickTop.push(this.$refs.param.$el.offsetTop-40)
          this.clickTop.push(this.$refs.comment.$el.offsetTop-30)
          this.clickTop.push(this.$refs.recommend.$el.offsetTop-40)
          this.clickTop.push(Number.MAX_VALUE)
        },200)
      },
      methods :{
        imageLoad() {
          this.$refs.scroll.refresh()
          this.getTop()
        },
        itemClick(index) {
          this.$refs.scroll.scrollTo(0,-(this.clickTop[index]),200)
        },
        scroll(position) {
          const positiony=-position.y
          let length=this.clickTop.length-1
          for(let i =0;i<length;i++) {
            if(this.currentIndex !== i && (positiony >= this.clickTop[i] && positiony < this.clickTop[i+1]))
              this.currentIndex=i
              this.$refs.nav.currentIndex=this.currentIndex
          }
          this.isShow= (-position.y) > 1000
        },
        addCart() {
          let cartList = {}
          cartList.img=this.topImg[0]
          cartList.iid=this.iid
          cartList.title=this.goods.title
          cartList.desc=this.goods.desc
          cartList.price=this.goods.newPrice
          cartList.newPrice=this.goods.realPrice
          this.$store.dispatch('addCart',cartList)
        }
      },
      mounted (){

      },
      destroyed() {
        this.$bus.$off('itemImgLoad',this.itemRefresh)
      },

    }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color:#ffffff;
  height: 100vh;
  overflow: hidden;
}
.content{
    height: calc(100% - 44px - 49px);
    background-color: #ffffff;
}
.detail-nav{
  position: relative;
  background-color: #ffffff;
  z-index: 9;
}
  .aa{
    background-color: #eeeeee;
  }
  .detail-bottom-bar{
    height: 49px;
    background-color:#fff;
    position: relative;
    left: 0;
    right: 0;
    bottom:-1px;
  }
</style>
