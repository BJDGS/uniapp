<template>
  <view>
<!--    JSON.stringify()【从一个对象中解析出字符串】  var data={name:'goatling'}
    JSON.stringify(data)   结果是：  '{"name":"goatling"}' -->
   <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button class="btnChooseAddress" type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row2-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    <image class="address-border" src="/static/cart_border@2x.png" mode=""></image>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address: {},
      };
    },
    computed: {
      // 取代data中的address,在此处用vuex中的数据作为共享数据
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
      // addstr() {
      //   if (!this.address.provinceName) return ''
      //   return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      // }
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        // 调用小程序提供的chooseAddress方法，即可使用选择收货地址的功能
        // 返回值是一个promise数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        console.log(succ)
        if(err === null && succ.errMsg === 'chooseAddress:ok') {
          // this.address = succ
          this.updateAddress(succ)
        }
        if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
          this.reAuth()
        }
      },
      // 调用此方法，重新发起收货地址的授权
      async reAuth() {
        // 3.1 提示用户对地址进行授权
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
        })
        // 3.2 如果弹框异常，则直接退出
        if (err2) return
        // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
        if (confirmResult.confirm) return uni.openSetting({
          // 3.4.1 授权结束，需要对授权的结果做进一步判断
          success: (settingResult) => {
            // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.address-choose-box {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info-box {
  height: 90px;
  font-size: 12px;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .row1 {
    display: flex;
    justify-content: space-between;
    .row1-right {
      display: flex;
      align-items: center;
      uni-icons {
        margin-left: 10px;
      }
    }
  }
  .row2 {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    .row2-left {
      width: 60px;
    }
  }
}
.address-border {
  display: block;
  height: 5px;
  width: 100%;
}
</style>