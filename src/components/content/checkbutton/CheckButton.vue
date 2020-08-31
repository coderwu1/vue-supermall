<template>
    <div class="check-button">
      <img src="~assets/img/cart/tick.svg" alt="" :class="{active:isClick}">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props: {
          isClick:{
            type:Boolean,
            default: false
          }
      }
    }
</script>

<style scoped>
.check-button img{
  border-radius: 50%;
  border: 2px solid red;
}
  .active{
    background-color: red;
  }
</style>
