import {debounce} from 'common/utils'

export const itemMix = {
  mounted (){
    this.refresh =debounce(this.$refs.scroll.refresh,50)
    this.itemRefresh= () =>{
      this.refresh()}
    this.$bus.$on('itemImgLoad',this.itemRefresh)

  },
  data () {
    return {
      itemRefresh:null,
      refresh:null
    }
  }
}

import backTop from 'components/content/backtop/backTop'
export const backTopMix = {
  data() {
    return {
      isShow :false,
    }
  },
  components :{
    backTop
  },
  methods :{
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    scrollShow(position) {
      this.isShow = (-position.y) > 1000
    },
  }
}
