<script src="../../../11.js">
</script>
<template>
  <div class="search">
    <div class="input-wrap">
      <div class="bar">
        <div class="search-icon">
          <IconSvg icon-class="search" />
        </div>
        <form class="form">
          <input
            v-model.trim="value"
            type="search"
            class="input"
            placeholder="搜索歌曲、歌单、专辑"
            @focus="focusHandle">
        </form>
        <span
          v-if="value"
          class="del"
          @click="delHandle">删除</span>
      </div>
      <div
        v-show="isHistory"
        class="cancel"
        @click="cancelHandle">取消</div>
    </div>
    <div
      v-if="!isHistory"
      class="hot-wrap">
      <h3 class="tit">热门搜索</h3>
      <div class="result-tags">
        <a
          :href="special_url"
          class="tag tag-hot"
        >{{ special_key }}</a>
        <template>
          <a
            v-for="tag in hotkey"
            :key="tag.n"
            class="tag">{{ tag.k }}
          </a>
        </template>
      </div>
    </div>
    <div
      v-else
      class="history-wrap">
      history-wrap</div>
  </div>
</template>

<script>
import IconSvg from '~/components/IconSvg'
import * as Http from '~/api/api'
export default {
  layout: 'index',
  components: {
    IconSvg
  },
  async asyncData() {
    const res = await Http.HotKeys()
    console.log((Array.prototype.join, res.hotKey))
    return {
      ...res.data
    }
  },
  data() {
    return {
      value: '',
      isHistory: false
    }
  },
  methods: {
    delHandle() {
      this.value = ''
    },
    cancelHandle() {
      this.isHistory = false
    },
    focusHandle() {
      this.isHistory = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
$color: #c0c0c0;

.search {
  position: absolute;
  top: 84px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.input-wrap {
  background: #f4f4f4;
  padding: 10px;
  display: flex;
  align-items: center;
  .bar {
    flex: 1;
    position: relative;
    border-radius: 3px;
    background: $white;
    height: 20px;
    padding: 8px 12px 8px 35px;
    .search-icon {
      position: absolute;
      left: 7px;
      font-size: 21px;
      top: 5px;
      color: $color;
      width: 24px;
      height: 24px;
    }
    .input {
      border: 0;
      width: 100%;
      padding: 0;
      outline: none;
      height: 20px;
      line-height: 20px;
      color: $color;
      border: none;
      appearance: none;
      font-size: 14px;
      vertical-align: top;
    }
    .input::-webkit-input-placeholder,
    .input::-moz-placeholder,
    .input:-moz-placeholder,
    .input:-ms-input-placeholder {
      color: red;
    }
    .del {
      position: absolute;
      top: 9px;
      right: 12px;
      width: 18px;
      height: 18px;
      background: #b1b1b1;
      text-indent: -9999px;
      border-radius: 99px;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 8px;
        background: $white;
        transform: rotate(45deg);
      }
      &::before {
        width: 10px;
        height: 2px;
        margin-left: -5px;
        margin-top: -1px;
      }
      &::after {
        width: 2px;
        height: 10px;
        margin-left: -1px;
        margin-top: -5px;
      }
    }
  }
  .cancel {
    padding-right: 10px;
    padding-left: 10px;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    color: #777;
  }
}
.hot-wrap {
  flex: 1;
  background: $white;
  padding: 15px 15px 10px 15px;
  .tit {
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 8px;
    margin-top: 0;
    font-size: 14px;
  }
  .tag {
    display: inline-block;
    font-size: 14px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 99px;
    word-break: keep-all;
    margin-bottom: 10px;
    margin-right: 14px;
    text-decoration: none;

    &.tag-hot {
      color: #fc4524;
      border-color: #fc4524;
    }
  }
}
</style>
