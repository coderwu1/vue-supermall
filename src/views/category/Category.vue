<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">分类</div></nav-bar>
    <div class="content">
      <tab-menu :categorys="categories" @selectItem="selectItem"></tab-menu>
      <tab-content-category :subcategories="subcategories" :goods="goods"></tab-content-category>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabMenu from './childCategory/TabMenu'
  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import TabContentCategory from './childCategory/TabContentCategory'
  export default {
        name: "Category",
      components:{
        NavBar,
        TabMenu,
        TabContentCategory
      },
    data() {
      return {
        categories: [],
        subcategories:[],
        goods: {
          'pop': {},
          'new': {},
          'sell': {},
        },
      }
    },
    created() {
      this.getCategories();

    },
    methods:{
      getCategories() {
        getCategory().then(res => {
          this.categories=res.data.category.list
          this.getSubcategories(0)
        })
      },
      getSubcategories (index) {
        this.currentIndex=index
        const maitKey=this.categories[this.currentIndex].maitKey
        getSubcategory(maitKey).then(res => {
          this.subcategories=res.data.list
          this.getCategoriesDetail('pop')
          this.getCategoriesDetail('new')
          this.getCategoriesDetail('sell')
        })
      },
      getCategoriesDetail(type) {
        const miniWallkey=this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey, type).then(res => {
          this.goods[type]=res
        })
      },
      selectItem(index) {
        this.getSubcategories(index)

      }
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
  .content{
    display: flex;
    height: calc(100% - 49px - 44px);
  }
  .category{
    height: 100vh;
    overflow: hidden;
  }
</style>
