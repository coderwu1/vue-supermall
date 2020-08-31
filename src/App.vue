<template>
  <div id="app">
    <keep-alive exclude="Detail,Category">
      <router-view></router-view>
    </keep-alive>
    <MainTarBar></MainTarBar>
  </div>
</template>

<script>
  import MainTarBar from 'components/content/maintabbar/MainTarBar'

export default {
  name: 'App',
  components: {
    MainTarBar
  }
}
</script>

<style>
  @import "assets/css/base.css";


</style>
