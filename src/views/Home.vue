<template>
  <div class="home">
    <header class="home-header wrap" :class="{'active':headerScroll}">
      <router-link tag="i" to="category"><i class="nbicon nbiconmenu icon-change"></i></router-link>
      <div class="header-search">
        <span class="app-name">新蜂商城</span>
        <i class="nbicon nbiconsearch"></i>
        <router-link tag="span" class="search-title" to="product-list">山河无恙，人间皆安</router-link>
      </div>
      <router-link class="login" tag="span" to="login" v-if="!isLogin">登录</router-link>
      <router-link class="login" tag="span" to="user" v-else>
        <van-icon name="manager-o" class="icon-change" />
      </router-link>
    </header>
    <nav-bar></nav-bar>
    <swiper :list="swiperList"></swiper>
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId" @click="tips">
        <img :src="item.imgUrl">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good" v-for="(goods,index) in goodsList" v-bind:key="index">
      <header class="good-header">{{goods.title}}</header>
      <van-skeleton :row="3" :loading="loading">
        <div class="good-box">
          <div class="good-item" v-for="(item,index2) in goods.good" :key="index2" @click="gotoDetail(item)">
            <img :src="$filters.prefix(item.goodsCoverImg)" alt="">
            <div class="good-desc">
              <div class="title">{{item.goodsName}}</div>
              <div class="price">￥{{item.sellingPrice}}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import { reactive ,onMounted, toRefs, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import swiper from '../components/Swiper'
import navBar from '../components/NavBar'
import { getHome } from '../service/home'
import { getLocal } from "../common/js/utils";
import { Toast } from 'vant'

export default {
  name: 'home',
  components: {
    swiper,
    navBar,
  },
  setup(){
    const router = useRouter();
    const state = reactive({
      swiperList:[],      // 轮播图列表
      isLogin:false,      // 是否已登陆
      headerScroll:false,   // 滚动透明判断
      goodsList:{
        hots: {
          title:'热门商品',
          good:''
        },
        newGoodses:{
          title:'新品上线',
          good:''
        },
        recommends:{
          title:'最新推荐',
          good:''
        },
      },
      categoryList:[
        {
          name: '新蜂超市',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
          categoryId: 100001
        }, {
          name: '新蜂服饰',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
          categoryId: 100003
        }, {
          name: '全球购',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
          categoryId: 100002
        }, {
          name: '新蜂生鲜',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
          categoryId: 100004
        }, {
          name: '新蜂到家',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
          categoryId: 100005
        }, {
          name: '充值缴费',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
          categoryId: 100006
        }, {
          name: '9.9元拼',
          imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
          categoryId: 100007
        }, {
          name: '领劵',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
          categoryId: 100008
        }, {
          name: '省钱',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
          categoryId: 100009
        }, {
          name: '全部',
          imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
          categoryId: 100010
        }
      ],
      loading: true
    })

    // 获取轮播图照片
    onMounted(async ()=>{
      const token = getLocal('token')
      if(token){
        state.isLogin = true
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const { data } = await getHome()
      state.swiperList = data.carousels
      state.goodsList.newGoodses.good = data.newGoodses
      state.goodsList.hots.good = data.hotGoodses
      state.goodsList.recommends.good = data.recommendGoodses
      state.loading = false
      Toast.clear()
    })

    // 滚轮监听获得顶部导航栏变色效果
    nextTick(()=>{
      window.addEventListener('scroll',()=>{
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop   // 兼容性
        scrollTop > 100? state.headerScroll = true:state.headerScroll = false
      })
    })

    const gotoDetail = (item) =>{
      router.push({ path:`/product/${item.goodsId}`})
    }

    const tips = () =>{
      Toast('敬请期待');
    }

    return {
      ...toRefs(state),
      gotoDetail,
      tips
    }
  },

}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .home {
    padding-top: 50px;    // 为了让轮播图在上面导航栏的下方
    }
  .home-header{
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%,50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    background: #e9e9e9;
    font-size: 15px;
    z-index:10000;
    .nbiconmenu{
      color: @primary;
    }
    &.active{           // 跟随滚轮变化改变顶部搜索框背景和符号样式
      background:@primary;
      .icon-change{
        color:#fff;
      }
    }

    .header-search{
      display: flex;
      .wh(74%,20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255,255,255,.7);
      border-radius:20px;
      .app-name{
        padding:0 10px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .nbiconsearch {
        padding: 0 10px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }

    .login {
      color: @primary;
      line-height: 52px;
      .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
      }
    }
  }

  .category-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(36px, 36px);
        margin: 13px auto 8px auto;
      }
    }
  }

  .good{
    &:last-child{     // 防止最底部商品被底部导航盖住
      padding-bottom: 100px;
    }
    .good-header{
      background:#f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color:@primary;
      font-size: 16px;
      font-weight:500;
    }
    .good-box{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item{
        box-sizing: border-box;
        width: 50%;
        border-bottom: 1PX solid #e9e9e9;
        padding: 10px 10px;
        img{
          display: block;
          width: 120px;
          margin: 0 auto;
        }
        .good-desc{
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          .title{
            color:#222333;
          }
          .price{
            color:@primary;
          }
        }
      }
      &:nth-child(2n+1){        // 让奇数商品具有右边框，相当于中间的分割线
        border-right: 1PX solid #e9e9e9;
      }
    }
  }
</style>