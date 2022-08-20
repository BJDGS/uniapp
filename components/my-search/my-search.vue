<template>
  <view class="my-search-container" :style="{ 'background-color': backgroundcolor }">
    <view class="my-search-box" :style="{ 'border-radius': radius + 'px' }" @click="searchBoxHandler">
      <uni-icons type="search"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      backgroundcolor: { type: String, default: '#c00000'},
      radius: { type: Number, default: 18 }
    },
    data() {
      return {
        
      };
    },
    methods: {
      searchBoxHandler() {
        console.log('limian')
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  // background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box {
    background-color: #ffffff;
    width: 100%;
    height: 36px;
    // border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>