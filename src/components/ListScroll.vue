<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会节流。
     * 2 滚动的时候实时派发scroll事件，不会节流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件，
     * 更多配置选项去看文档
     */
    probeType: {
      type: Number,
      default: 1
    },
    updated_height:{
      type: Boolean,
      default: false
    }

  },
  mounted() {
    // 在 DOM 渲染完毕后初始化 better-scroll
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  updated() {
    this.bs.refresh()
  },
  methods: {
    initScroll() {
      // better-scroll 初始化
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click:true,
      })
      this.bs.on('scroll', () => {
        console.log('scrolling-')
      })
      this.bs.on('scrollEnd', () => {
        console.log('scrollingEnd')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>