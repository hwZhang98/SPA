<template>
  <div class="category">
    <header class="category-header wrap van-hairline--bottom">
      <i class="nbicon nbiconfanhui" @click="goHome"></i>
      <div class="header-search">
        <i class="nbicon nbiconsearch"></i>
        <router-link class="search-title" tag="span" to="product-list?from=category">全场50元起步</router-link>
      </div>
    </header>
    <nav-bar></nav-bar>
    <div class="search-wrap" ref="searchWrap">
      <list-scroll class="nav-side-wrapper">
        <ul class="nav-side">
          <li
              v-for="item in categoryData"
              :key="item.categoryId"
              v-text="item.categoryName"
              :class="{'active' : currentIndex === item.categoryId}"
              @click="selectMenu(item.categoryId)"
          ></li>
        </ul>
      </list-scroll>
      <div class="search-content">
        <list-scroll>
          <div class="swiper-container">
            <div v-for="(category, index) in categoryData" :key="index">
              <div class="swiper-slide" v-if="currentIndex === category.categoryId" >
                <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
                  <p class="catogory-title">{{products.categoryName}}</p>
                  <div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index" @click="selectProduct(product)">
                    <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img"/>
                    <p v-text="product.categoryName" class="product-title"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive,onMounted,ref,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import navBar from '../components/NavBar'
import listScroll from '../components/ListScroll.vue'
import {getCategory} from '../service/good'
import {Toast} from 'vant'
export default {
  name: "Category",
  components: {
    navBar,
    listScroll,
  },

  setup(){
    const router = useRouter();
    const searchWrap = ref(null);
    const state = reactive({
      categoryData :[],
      currentIndex:15
    })

    onMounted(async ()=>{
      let $screenHeight = document.documentElement.clientHeight;
      searchWrap.value.style.height = $screenHeight - 100 + 'px';
      Toast.loading('加载中...')
      const {data} = await getCategory()
      Toast.clear()
      state.categoryData = data
    })

    const goHome = ()=>{
      router.push({path:'home'})
    }

    const selectMenu = (index) =>{
      state.currentIndex = index
    }

    const selectProduct = (item) =>{
      console.log('item',item.categoryId);
      router.push({path:'product-list',query:{categoryId:item.categoryId}})
    }

    return {
      ...toRefs(state),
      goHome,
      searchWrap,
      selectProduct,
      selectMenu
    }
  },

}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .category {
    .category-header {
      background: #fff;
      position: fixed;
      left: 0;
      top: 0;
      .fj(space-around);
      .wh(100%, 50px);
      line-height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 15px;
      color: #656771;
      z-index: 10000;
      //&:active {
      //  background: @primary;
      //}
      .header-search {
        display: flex;
        width: 80%;
        height: 20px;
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232326;
        background: #F7F7F7;
        border-radius: 20px;
        .nbiconsearch {
          padding: 0 10px 0 20px;
          font-size: 17px;
        }
        .search-title {
          font-size: 12px;
          color: #666;
          line-height: 21px;
        }
      }
    }
  }
  .search-wrap {
    .fj();
    width: 100%;
    margin-top: 50px;
    background: #F8F8F8;
    .nav-side-wrapper {
      //position: fixed;
      //left: 0;
      width: 28%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #F8F8F8;
        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      //margin-left: 28%;
      padding: 0 10px;
      background: #fff;
      .boxSizing();
      .category-list {
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        width: 100%;
        .catogory-title {
          width: 100%;
          font-size: 17px;
          font-weight: 500;
          padding: 20px 0;
        }
        .product-item {
          width: 33.3333%;
          margin-bottom: 10px;
          text-align: center;
          font-size: 15px;
          .product-img {
            .wh(30px, 30px);
          }
        }
      }
    }
  }
</style>