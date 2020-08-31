<template>
    <div ref="wrapper" class="wrapper">
      <div class="connet"><slot></slot></div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      data() {
          return {
            scroll :null
          }
      },
      props :{
        probeType :{
            type :Number,
            default :0
          },
        pullUpLoad :{
          type :Boolean,
          default :false
        }
      },
      mounted() {
          this.scroll=new BScroll(this.$refs.wrapper ,{
            click :true,
            probeType :this.probeType,
            pullUpLoad :this.pullUpLoad
          })

          this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
          })

        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      methods :{
          scrollTo(x,y,timer=300) {
            this.scroll && this.scroll.scrollTo(x,y,timer)
          },
          finishPullUp () {
            this.scroll && this.scroll.finishPullUp()
            this.scroll && this.scroll.refresh()
          },
          refresh (){
            this.scroll && this.scroll.refresh()
          },
          getScrollY (){
            return this.scroll ? this.scroll.y : 0
          }
      }
    }
</script>

<style scoped>

</style>
