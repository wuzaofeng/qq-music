<template>
  <div class="search">
    <div class="input-wrap">
      <div class="bar">
        <div class="search-icon">
          <IconSvg icon-class="search" />
        </div>
        <form 
          class="form" 
          onsubmit="return false">
          <input
            v-model.trim="value"
            type="search"
            class="input"
            placeholder="搜索歌曲、歌单、专辑"
            @focus="focusHandle"
            @keyup.enter="submitHandle(value)">
        </form>
        <span
          v-if="value"
          class="del"
          @click="delHandle">删除</span>
      </div>
      <div
        v-if="flag === flagData.HISTORY || flag === flagData.RESULT"
        class="cancel"
        @click="cancelHandle">取消</div>
    </div>
    <div 
      ref="wrap" 
      class="search-main">
      <div
        v-if="flag === flagData.HISTORY"
        class="history-wrap">
        <div
          v-for="(h, i) in history"
          :key="i"
          class="item">
          <span class="icon">
            <IconSvg icon-class="time" />
          </span>
          <span
            class="name"
            @click="historyHandle(h)">{{ h }}</span>
          <span
            class="close"
            @click="closeHistory(h)" />
        </div>
        <p
          v-if="history.length > 0"
          class="clear"
          @click="clearHistory">
          <span>清除搜索记录</span>
        </p>
      </div>
      <div
        v-else-if="flag === flagData.RESULT"
        class="result-wrap">
        <ul>
          <li
            v-for="(item, i) in result"
            :key="item.i"
            class="item"
            @click="itemhandle(item)">
            <img
              v-if="i === 0"
              :src="`//y.gtimg.cn/music/photo_new/T002R68x68M000${item.albummid}.jpg`"
              :alt="item.albumname"
              class="img">
            <div
              v-else
              class="svg">
              <IconSvg icon-class="music" />
            </div> 
            <h6
              class="title" 
              v-html="item.songname" />
            <p class="name">{{ item.singer[0].name }}</p>
          </li>
        </ul>
        <div
          v-if="resLoading"
          class="loading-wrap">
          <loading :loading="resLoading" />
        </div>
        <p
          v-if="!resLoading"
          class="finish">已加载全部</p>
      </div>
      <div
        v-else
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
              class="tag"
              @click="hotHandle(tag)">
              {{ tag.k }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import IconSvg from '~/components/IconSvg'
import Loading from '~/components/Loading'
import * as Http from '~/api/api'
import { FORMNo, Radio_SRC } from '~/assets/config'
const StorageKey = 'search_history'
export default {
  layout: 'index',
  components: {
    IconSvg,
    Loading
  },
  async asyncData() {
    const res = await Http.HotKeys()
    return {
      ...res.data
    }
  },
  data() {
    const history = localStorage.getItem(StorageKey)
      ? localStorage.getItem(StorageKey).split(',')
      : []
    return {
      value: '',
      history,
      flag: 2,
      result: [],
      resLoading: false,
      page: 1,
      pageNum: 20,
      total: 0
    }
  },
  computed: {
    flagData() {
      return {
        RESULT: 0, // 查询结果
        HISTORY: 1, // 历史记录
        HOT: 2 // 热门搜索
      }
    }
  },
  watch: {
    flag() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    value() {
      this.page = 1
      this.pageNum = 20
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrap, {
      click: true,
      pullUpLoad: true
    })
    this.scroll.on('pullingUp', this.pullingUpHandle)
  },
  methods: {
    pullingUpHandle() {
      console.log(this.result.length)
      console.log(this.total)
      if (this.result.length >= this.total) {
        this.resLoading = false
        this.scroll.finishPullUp()
        this.scroll.refresh()
        return
      }
      this.page = this.page + 1
      const params = {
        w: this.value,
        n: this.pageNum,
        p: this.page
      }
      this.resLoading = true
      Http.SearchKeyWords(params).then(res => {
        const list = res.data.song.list
        if (res.data.song.list.length) {
          this.result = this.result.concat(list)
        } else {
          this.resLoading = false
        }
        this.scroll.finishPullUp()
        this.scroll.refresh()
      })
    },
    delHandle() {
      this.value = ''
      this.flag = this.flagData.HISTORY
    },
    cancelHandle() {
      this.value = ''
      this.flag = this.flagData.HOT
    },
    focusHandle() {
      this.flag = this.flagData.HISTORY
    },
    hotHandle({ k }) {
      this.value = k
      this.submitHandle()
    },
    historyHandle(word) {
      this.value = word
      this.submitHandle()
    },
    submitHandle() {
      this.flag = this.flagData.RESULT
      this.searchApi()
      // 判断是否有value值
      if (!this.history.includes(this.value)) {
        this.history.push(this.value)
        localStorage.setItem(StorageKey, this.history.join(','))
      }
    },
    async searchApi() {
      const params = {
        w: this.value,
        n: this.pageNum,
        p: this.page
      }
      this.resLoading = true
      const res = await Http.SearchKeyWords(params)
      this.result = res.data.song.list
      this.total = res.data.song.totalnum
      this.resLoading = false
    },
    closeHistory(h) {
      const history = this.history.filter(i => i !== h)
      this.history = history
    },
    clearHistory() {
      this.history = []
      localStorage.removeItem(StorageKey)
    },
    itemhandle({ songmid }) {
      location.href = Radio_SRC + FORMNo + '&songmid=' + songmid
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
.search-main {
  position: relative;
  overflow: hidden;
  flex: 1;
  background: $white;
}
.hot-wrap {
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
.history-wrap {
  .item {
    position: relative;
    border-top: 1px solid #ededed;
    padding: 0 50px;
    height: 44px;
    line-height: 44px;
    vertical-align: top;

    .icon {
      position: absolute;
      left: 15px;
      top: 8px;
      width: 26px;
      height: 26px;
      font-size: 20px;
      line-height: 150%;
    }

    .name {
      left: 40px;
      right: 50px;
      display: block;
      height: 44px;
      line-height: 44px;
      color: #000;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .close {
      position: absolute;
      right: 22px;
      top: 12px;
      width: 20px;
      height: 20px;

      &::before,
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        background: rgba(0, 0, 0, 0.6);
        transform: rotate(45deg);
      }

      &::before {
        width: 17px;
        height: 1px;
        top: 8px;
      }

      &::after {
        width: 1px;
        height: 17px;
        left: 8px;
      }
    }
  }
  .clear {
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    span {
      display: inline-block;
      line-height: 44px;
      color: #47c88a;
      cursor: pointer;
    }
  }
}

.result-wrap {
  ul {
    margin: 0;
    padding: 0;
  }
  .item {
    position: relative;
    height: 55px;
    padding-left: 56px;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      height: 1px;
      top: 0;
      left: 0;
      right: 0;
      background: #e5e5e5;
    }
  }
  .img {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 40px;
    height: 40px;
  }

  .svg {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    color: #717171;
  }

  .title {
    margin: 10px 0 2px;
    line-height: 18px;
    font-size: 16px;
    font-weight: normal;
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .name {
    font-size: 12px;
    margin: 0;
    color: #808080;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.loading-wrap {
  position: relative;
  height: 70px;
}
.finish {
  font-size: 12px;
  margin: 0;
  line-height: 40px;
  text-align: center;
  color: #808080;
}
</style>
