<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  // import MyGoods from '../../components/my-goods/my-goods.vue'
  export default {
    // comments: { MyGoods },
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: '1',
          pagesize: '10'
        },
        goodsList: [],
        total: 0,
        pagesize: 10,
        // 节流阀
        isloading: false
      };
    },
    onLoad(option) {
      console.log(option)
      //options值是一个对象,而本身是一个参数,只是代码规范和习惯问题,上级传参来的参数，写在此处做为本组件的初始化
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    methods: {
      // cb接收下面下拉事件的回调函数
      async getGoodsList(cb) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', 'this.queryObj')
        console.log(res)
        // 节流阀,主要用于在快速下滑时,会在短时间内几乎同时请求很多组数据,打开节流阀就会等当前数据组请求完毕再进行下一个请求
        this.isloading = true
        if (res.meta.status !== 200) return uni.$showMsg()
        this.isloading = false
        // cb可能不存在, 如果cb存在就执行cb
        cb && cb()
        // this.goodsList = res.message.goods
        // 新增下拉增加数据,所以要对数据进行添加,旧数据合并新数据
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 为什么这个"函数"不需要在ht中调用,目前初步是,已经在json中定义检测,且这个是一个官方打包的事件
      // 触底事件
      onReachBottom() {
        if (this.isloading) return
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕!')
        // 让页码值加1,重新获取新数据
        this.queryObj.pagenum++
        this.getGoodsList()
      },
      onPullDownRefresh() {
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        // 添加回调函数,当数据请求完成以后关闭下拉事件,并且给函数增加一个接收的参数
        this.getGoodsList(() => {uni.stopPullDownRefresh()})
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods-detail/goods-detail?goods_id=' + item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-list {
  // width: 100%;
  // .goods-item {
  //   display: flex;
  //   padding: 10px 0;
  //   margin: 0 10px;
  //   border-bottom: 1px solid #ccc;
  //   .goods-item-left {
  //     .goods-ipc {
  //       width: 100px;
  //       height: 100px;
  //     }
  //   }
  //   .goods-item-right {
  //     margin-left: 10px;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     .goods-name {
  //       font-size: 12px;
  //     }
  //     .goods-info-box {
  //       .goods-price{
  //         color: darkred;
  //       }
  //     }
  //   }
  // }
}
</style>
