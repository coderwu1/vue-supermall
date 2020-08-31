<template>
      <scroll :probe-type="3" class="scroll">
          <div v-for="(item,index) in categorys" class="tabmenu-list-item"
          :class="{active: index===currentIndex}" @click="itemClick(index)" :key="index"
          >{{item.title}}</div>
      </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
    export default {
        name: "TabMenu",
      props:{
          categorys:Array
      },
      data() {
         return {
           currentIndex:0
         }
      },
      components:{
        Scroll
      },
      methods:{
        itemClick(index) {
          this.currentIndex=index
          this.$emit('selectItem',index)
        }
      }
    }
</script>

<style scoped>
  .scroll{
    overflow: hidden;
  }
  .tabmenu-list-item{
  width: 80px;
  height: 60px;
  background-color: #eeeeee;
  color: #777777;
  line-height: 60px;
  text-align: center;
}
  .active{
    border-left: 4px solid var(--color-high-text);
    font-size: 16px;
    color: var(--color-high-text);
  }
</style>
