<template>
  <view class="goods-item">
    <view class="goods-item-left" v-if="goods.goods_small_logo">
      <!-- 新增按钮 -->
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo" mode="goods_small_logo" class="goods-ipc"></image>
    </view>
    <view class="goods-item-left" v-else>
      <image :src="defaultPic" mode="" class="goods-ipc"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'MyGoods',
    props: {
      goods: { type: Object, default: {} },
      showRadio: { type: Boolean, default: false },
      showNum: { type: Boolean, default: false }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        console.log(val)
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #ccc;
  .goods-item-left {
    display: flex;
    justify-content: center;
    align-items: center;
    .goods-ipc {
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right {
    margin-left: 10px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 12px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price{
        color: darkred;
      }
    }
  }
}
</style>
