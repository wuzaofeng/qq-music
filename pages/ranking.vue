<template>
  <div class="ranking">
    <ul>
      <li
        v-for="item in topList"
        :key="item.key"
        class="item"
        @click="itemHandle(item)">
        <div class="media">
          <img
            :src="item.picUrl"
            :alt="item.topTitle">
          <span class="count">
            <i class="icon icon-listen" />{{ item.listenCount | formatCount }}
          </span>
        </div>
        <div class="info">
          <div class="con">
            <h3 class="tit">{{ item.topTitle }}</h3>
            <p
              v-for="(s, i) in item.songList"
              :key="i">
              {{ i+1 }}
              <span class="text-name">{{ s.songname }}</span>
              -
              {{ s.singername }}
            </p>
          </div>
          <i class="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as Utils from '~/assets/utils'
import * as Http from '~/api/api'
export default {
  layout: 'index',
  filters: {
    formatCount: function(value) {
      return Utils.formatCount(value)
    }
  },
  async asyncData() {
    const {
      data: { topList }
    } = await Http.Ranking()
    return {
      topList
    }
  },
  methods: {
    itemHandle(item) {
      const { id } = item
      this.$router.push({ name: 'top-id', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
.ranking {
  margin: 10px;
}
ul {
  margin: 0;
  padding: 0;
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background: $white;
  .media {
    position: relative;
    width: 100px;
    height: 100px;
    display: block;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      background: rgba(0, 0, 0, 0.2);
    }
    img {
      display: block;
      width: 100px;
      height: 100px;
    }
    .count {
      position: absolute;
      left: 5px;
      bottom: 7px;
      line-height: 12px;
      color: #fff;
      opacity: 0.6;
      font-size: 9px;
      z-index: 10;
    }
    .icon-listen {
      display: block;
      float: left;
      width: 10px;
      height: 10px;
      background-position: 0 -50px;
      margin-right: 5px;
      background-repeat: no-repeat;
      background-size: 24px 60px;
      background-image: url('../static/images/list_sprite.png');
    }
  }
  .info {
    position: relative;
    flex: 1;
    overflow: hidden;
    .con {
      margin: 0 12px 0 15px;
    }
    .tit {
      font-size: 16px;
      color: #000;
      font-weight: normal;
      margin-bottom: 5px;
      margin-top: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .text-name {
        color: #000;
        margin-left: 8px;
        margin-right: 5px;
      }
    }
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -4px;
    width: 6px;
    height: 6px;
    border-right: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    -webkit-transform: rotate(-45deg);
  }
}
</style>
