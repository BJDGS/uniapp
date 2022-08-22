<template>
  <view class="my-userinfo-container">
    <view class="top-box">
      <image src="/static/my-icons/132.png" class="avatar"></image>
      <view class="nickname">crush</view>
    </view>
    <view class="panel-list">
      <!-- 第一个 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个 -->
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    },
    computed: {},
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        if (succ && succ.confirm) {
          this.updateUserInfo({})
          this.updateToken('')
          this.updateAddress({})
        }
      }
    }
  }
</script>

<style lang="scss">
.my-userinfo-container {
  height: 100%;
  background-color: #f4f4f4;
  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 100%;
      border: 3px solid #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, .8);
    }
    .nickname {
      color: #fff;
      margin-top: 10px;
      font-weight: 500;
      text-shadow: 0 0 2px rgba(0, 0, 0, .8);
    }
  }
  .panel-list {
    // background-color: white;
    position: relative;
    padding: 0 10px;
    top: -10px;
    .panel {
      // width: 90%;
      background-color: white;
      border-radius: 5px;
      margin-bottom: 8px;
      .panel-body {
        display: flex;
        justify-content: space-around;
        padding: 8px;
        // font-size: 13px;
        .panel-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon {
            width: 35px;
            height: 35px;
          }
          text {
            font-size: 13px;
          }
        }
      }
      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 14px;
        border-bottom: 1px solid #f4f4f4;
      }
      .panel-list-item {
        display: flex;
        line-height: 35px;
        justify-content: space-between;
        padding: 10px 10px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>