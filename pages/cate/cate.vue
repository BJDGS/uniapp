<template>
  <view>
    <my-search @click="gotoSeach"></my-search>
    <view class="scroll-view-container">
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <view class="left-scroll-view-item" v-for="(item, i) in cateList" :key="i" @click="activeChange(i)" :class="{active:active === i}">{{item.cat_name}}</view>
      </scroll-view>
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(val, j) in cateList_children" :key="j">
          <view class="cate-lv2-title">/{{val.cat_name}}/</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(val2, j2) in val.children" :key="j2" @click="gotoGoodsList(val2)">
              <image :src="val2.cat_icon" alt="">
              <text>{{val2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        cateList: [],
        cateList_children: [],
        active: 0,
        scrollTop:0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        console.log(res)
        if (res.meta.status != 200) {
          return uni.$showMsg()
        }
        this.cateList = res.message
        this.cateList_children = res.message[0].children
        uni.$showMsg('获取分类成功！')
      },
      activeChange(i) {
        this.active = i
        this.cateList_children = this.cateList[i].children
        this.scrollTop = this.scrollTop===0 ? 1 :0
      },
      gotoGoodsList(val2){
        uni.navigateTo({
           url:'/subpkg/goods-list/goods-list?cid='+val2.cat_id
           // url:'/subpkg/goods-list/goods-list'
        })
      },
      gotoSeach(){
        console.log('waimian')
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #ffffff;
        position: relative;
        &::before {
          content: "";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .right-scroll-view {
    .cate-lv2 {
      background-color: #fff;
      .cate-lv2-title {
        text-align: center;
        padding: 10px 0;
        font-weight: bold;
        font-size: 12px;
      }
      .cate-lv3-list {
        display: flex;
        flex-wrap: wrap;
        .cate-lv3-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33.33%;
          margin-bottom: 10px;
          // margin: 15px;
          image {
            width: 60px;
            height: 60px;
          }
          text {
            font-size: 12px;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
