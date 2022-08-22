<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- open-type="getUserInfo" @getuserinfo=都是固定写法，getUserInfos是自定义事件 -->
    <!-- 以上方法在2021年就被废除， @click="bindGetUserInfo" -->
    <button class="btn-login" type="primary" @click="bindGetUserInfo">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
      }
    },
    computed: {
      ...mapState('m_user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'redirectInfo']),
      // 旧的不行,这是新方法
      bindGetUserInfo(e) {
        uni.getUserProfile({
          desc:'weixin',
          success:res=>{
            console.log(res,'授权成功')
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail:err=>{
            console.log(err,'失败授权')
          },
        })
      },
      // 给后台发请求,拿最终的TOKEN,目前这块请求失败,可能因为rawData里面的city等信息拿不到导致为空
      async getToken(info){
        const [err, res] = await uni.login().catch(err=>err)
        if(err || res.errMsg !=='login:ok') return uni.$showMsg('登录失败')    
        // console.log(res)
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        console.log(query)
        const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if(loginResult.meta.status!==200) return uni.$showMsg('登录失败')
        uni.$showMsg('登录成功')
        console.log(loginResult)
        this.updateToken(loginResult.message.token)
        // 返回登陆前的页面
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: 100px;
  background-color: #f8f8f8;
  height: 850rpx;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login {
    // height: 50px;
    // padding: 0 120px;
    width: 80%;
    margin: 20px 0;
    border-radius: 25px;
    background-color: #c00000;
  }
  .tips-text {
    // margin-top: 20px;
    font-size: 14px;
    color: gray;
  }
}
</style>