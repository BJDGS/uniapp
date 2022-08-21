<template>
  <view class="goods-detail-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" mode="" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <view class="goods-info-box">
      <view class="price" v-if="goods_info.goods_price">￥{{goods_info.goods_price}}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 指定的动态数据时一个html>div的字符串，此官方提供的组件可以把这种内容渲染出来 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods_nav">
      <!-- https://uniapp.dcloud.net.cn/component/uniui/uni-goods-nav.html -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        goods_info: [],
        options: [
        {
          icon: 'shop',
          text: '店铺'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail(goods_id) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(i) {
        // 官方预览图片方法
        uni.previewImage({
          // 当前索引,从第几个图片点进来就从第几个图片开始预览
          current: i,
          // 预览弹出层也需要拿数据,把轮播图对应的url通过map返回新数组
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        console.log(e)
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 目前上面的没有用,下面的可以做到两个按钮的区分跳转
      buttonClick(e) {
        console.log(e)
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goods_info.goods_id,       // 商品的Id
            goods_name: this.goods_info.goods_name,   // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1,                           // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true
          }
          console.log(goods)
          this.addToCart(goods)
        }
      }
    },
    computed: {
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['total']),
    },
    watch: {
      // total(newVal) {
      //   const findResult = this.options.find(x => x.text === '购物车')
      //   if(findResult) {
      //     findResult.info = newVal
      //   }
      // }
      total: {
        // handler官方定义的监听器处理方法,从方法>>>改编成对象，对象有imm属性，立即执行
        handler(newVal) {
          const findResult = this.options.find(x => x.text === '购物车')
          if(findResult) {
            findResult.info = newVal
          }
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  .swiper-item, image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 0 10px;
  .price {
    margin: 10px 0;
    color: #c00000;
    font-size: 18px;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .goods-name {
      // border-right: 1px solid #ccc;
      font-size: 13px;
      padding-right: 10px;
    }
    .favi {
      border-left: 1px solid #ccc;
      width: 120px;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text {
        font-size: 12px;
        color: gray;
      }
    }
  }
  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}
.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.goods-detail-container {
  padding-bottom: 50px;
}
</style>
