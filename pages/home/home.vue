<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <!-- 为了实现点击跳转功能，就不能用view组件，写navigator组件可跳转，并动态绑定url -->
        <navigator class="swiper-item" :url="'/subpkg/ceshi/ceshi?goods_id=129'">
          <!-- img标签有差异 -->
          <image :src="item.image_src">
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" alt="" class="nav-image">
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <img :src="item.floor_title.image_src" alt="" class="floor-title">
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].navigator_url">
            <!-- image有自定义属性，特殊原因，每个图片的实际宽度已经定义好，直接：style动态插入 -->
            <!-- item.product_list[0].image_src 不是 item.product_list.image_src[0] -->
            <image :src="item.product_list[0].image_src" alt="" mode="widthFix" :style="{width:item.product_list[0].image_width +'rpx'}">
          </navigator>
          <view class="right-img-box">
            <navigator v-if="i2 != 0" class="right-img-item" v-for="(val, i2) in item.product_list" :key="i2" :url="val.navigator_url">
              <image :src="val.image_src" alt="" mode="widthFix" :style="{width:val.image_width +'rpx'}">
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: [],
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(res)
        if (res.meta.status !== 200) {
         return uni.$showMsg()
        }
        this.swiperList = res.message
        // uni.$showMsg('轮播图请求成功！')
      },
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log(res)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.navList = res.message
        // uni.$showMsg('导航栏请求成功！')
      },
      navClickHandler(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        console.log(res)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.floorList = res.message
        uni.$showMsg('电梯请求成功')
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 300rpx;
  .swiper-item, image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  .nav-image {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-list {
  .floor-item {
    .floor-title {
      height: 60rpx;
      width: 100%;
    }
    .floor-img-box {
      display: flex;
      .left-img-box {
      }
      .right-img-box {
        display: flex;
        flex-wrap: wrap;
        .right-img-item {
          margin-left:15rpx;
        }
      }
    }
  }
}
</style>
