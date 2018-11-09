<template>
  <div class="item">
    <div
      class="main"
      @click="clickHandle">
      <div class="media">
        <img
          :src="imgSrc"
          :alt="imgAlt">
        <span class="count">
          <i
            v-if="count"
            class="icon icon-listen"/>{{ count | formatCount }}</span>
        <span class="icon icon-play" />
      </div>
      <div class="info">
        <h3
          v-if="title"
          class="tit" >{{ title }}</h3>
        <p
          v-if="text"
          class="text" >{{ text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as Utils from '~/assets/utils'
export default {
  filters: {
    formatCount: function(value) {
      return Utils.formatCount(value)
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    imgSrc: {
      type: String,
      default: ''
    },
    imgAlt: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    },
    count: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickHandle: function() {
      this.$emit('click', this.type, this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
.item {
  float: left;
  width: calc((100% - 20px) / 2);
  padding-right: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  .main {
    background: $white;
  }
  img {
    width: 100%;
  }
  a {
    display: block;
    text-decoration: none;
  }
}
.media {
  position: relative;
  .count {
    position: absolute;
    bottom: 10px;
    left: 5px;
    display: block;
    line-height: 12px;
    color: $white;
    font-size: 12px;
  }
}
.info {
  padding: 0 7px 5px;
  color: #000;
  height: 36px;
  line-height: 18px;
  word-wrap: break-word;
  font-weight: normal;

  .tit {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    margin: 0;
    text-decoration: none;
    font-weight: normal;
  }

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 12px;
  }
}
.icon-play {
  position: absolute;
  bottom: 10px;
  right: 5px;
  background-image: url('../static/images/list_sprite.png');
  background-repeat: no-repeat;
  background-size: 24px 60px;
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
</style>
