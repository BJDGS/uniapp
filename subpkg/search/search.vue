<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" placeholder="请输入搜索内容" cancelButton="none"></uni-search-bar>
    </view>
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDatail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag v-for="(item, i) in historyList" :key="i" :text="item" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 定时器
        timer: null,
        // 临时存放输入内容
        kw: '',
        // 请求返回的搜索推荐
        searchResults: [],
        // 搜索历史
        history: [ 'a', 'app', 'apple' ],
        historyList: []
      };
    },
    onLoad() {
      // 未看
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
          console.log(e)
        }, 500)
      },
      async getSearchList() {
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        this.saveSearchHistory()
        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        uni.$showMsg('搜索成功')
      },
      gotoDatail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods-detail/goods-detail?goods_id=' + goods_id
        })
      },
      saveSearchHistory() {
        this.historyList.unshift(this.kw)
      },
      // 数组去重
      saveSearchHistory() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      cleanHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods-list/goods-list?query=' + kw
        })
      }
    },
    // computed: {
    //   histories(){
    //     return [...this.historyList].reverse()
    //   }
    // }
  }
</script>

<style lang="scss">
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
.uni-searchbar {
  /* 将默认的 #FFFFFF 改为 #C00000 */
  background-color: #c00000;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #efefef;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    line-height: 30px;
    align-items: center;
    .uni-tag {
      margin-left: 8px;
      margin-top: 10px;
    }
  }
}
</style>
