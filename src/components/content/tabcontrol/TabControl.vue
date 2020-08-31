<template>
    <div class="tabcontrol">
      <div v-for="(item,index) in titles" class="control-item"
           :class="{active:index === currentIndex}" @click="activeColor(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
      props :{
          titles :{
            type :Array,
            default (){
              return []
            }
          }
      },
      data (){
          return {
            currentIndex: 0
          }
      },
      methods :{
          activeColor (index){
            this.currentIndex=index
            this.$emit('controlStyle',index)
          }
      }
    }
</script>

<style scoped>
  .tabcontrol{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .control-item{
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
    padding: 5px;
  }
</style>
