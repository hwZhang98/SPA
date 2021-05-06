<template>
  <div>
    <header class="home-header wrap" :class="{'active':headerScroll}">
      <router-link tag="i" to="category"><i class="nbicon nbmenu2">1</i></router-link>
      <div class="header-search">
        <span class="app-name">新蜂商城</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list">山河无恙，人间皆安</router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="less" scoped>

</style>