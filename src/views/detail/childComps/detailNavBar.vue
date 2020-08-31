<template>
    <div>
      <nav-bar>
        <div slot="left" class="left" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in title"
               :class="{active:currentIndex===index}" @click="itemClick(index)"
          >{{item}}</div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "detailNavBar",
      components :{
        NavBar
      },
      data() {
          return {
            title :['商品','参数','评论','推荐'],
            currentIndex :0
          }
      },
      methods :{
        itemClick(index) {
          this.currentIndex=index
          this.$emit('itemClick',index)
        },
        back() {
          this.$router.back()
        }
      },
    }
</script>

<style scoped>
.title{
  display: flex;

}
  .title div{
    flex: 1;
  }
  .left{
    margin-top: 6px;
  }
  .active{
    color: var(--color-tint);
  }
</style>
