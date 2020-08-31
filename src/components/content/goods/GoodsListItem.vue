<template>
    <div class="goods-item" @click="itemClick">
      <img :src="showImg" alt="" @load="imgLoad">
      <div class="item-text">
        <p>{{item.title}}</p>
        <span class="price">{{item.price}}</span>
        <span class="collect">{{item.cfav}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
      props :{
        item :{
          type :Object,
          default (){
            return {}
          }
        }
      },
      computed :{
          showImg (){
            return this.item.img ||this.item.image || this.item.show.img

          }
      },
      methods :{
        imgLoad (){
         this.$bus.$emit('itemImgLoad')
        },
        itemClick() {
          this.$router.push('/detail/' + this.item.iid)
        }
      }
    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .item-text {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .item-text p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .item-text .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .item-text .collect {
    position: relative;
  }

  .item-text .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
