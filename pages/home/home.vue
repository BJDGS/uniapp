<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <!-- 为了实现点击跳转功能，就不能用view组件，写navigator组件可跳转，并动态绑定url -->
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <img :src="item.image_src">
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
      };
    },
    onLoad() {
      this.getSwiperList()
    },
    methods: {
      async getSwiperList() {
        const { data: res } = await uni.$http.get('api/public/v1/home/swiperdata')
        console.log(res)
        if (res.meta.status !== 200) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.swiperList = res.message
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
</style>
