<template>
  <div class="song">
    <div
      ref="main"
      class="info-box">
      <img
        :src="logo"
        :alt="dissname"
        class="info-box-bg">
      <div class="info-box-main"> 
        <div class="album">
          <img
            :src="logo"
            :alt="dissname"
            class="cover">
          <div class="info">
            <h1 class="tit" >{{ dissname }}</h1>
            <div class="author">
              <img
                :src="headurl"
                :alt="nickname"
                class="avatar">
              <span class="name">{{ nickname }}</span>
            </div>
            <p class="desc">播放量: {{ visitnum | formatCount }}</p>
          </div>
        </div>
        <div class="opt-box">
          <button
            v-if="!currentsong.id"
            class="btn"
            @click="playSongAll">播放全部</button>
          <div
            v-else
            class="play-bar"
            @click="toggle">
            <div class="icon-play">
              <IconSvg :icon-class="isPlay ? 'play' : 'pause'" />
              <svg class="progress">
                <circle
                  class="circle"
                  cx="23"
                  cy="23"
                  stroke-dasharray="6.885049161415154 113"
                />
              </svg>
            </div>
            <div class="play-info">
              <h2 class="name">{{ currentsong.name }}</h2>
              <div
                ref="lyrics"
                class="lyrics">
                <div class="lyrics-main">
                  <p
                    v-for="item in lyric.lines"
                    :key="item.time"
                  >{{ item.txt }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="wrap"
      class="wrap">
      <div class="content">
        <div class="count-box">
          <div class="desc">歌单<span class="number">共{{ songnum }}首</span></div>
        </div>
        <div class="list">
          <div
            v-for="item in songlist"
            :key="item.id"
            :class="['item', `${item.id === Number(currentsong.id) ? 'active' : ''}`]"
            @click="itemHandle(item)">
            <div class="tit">{{ item.title }}</div>
            <p :class="['desc', `${item.pay.pay_play ? 'vip' : ''}`]">
              {{ `${item.singer[0].name} · ${item.album.name}` }}</p>
          </div>
        </div>
        <div
          v-if="songnum !== songlist.length"
          class="more"
          @click="onMoreHandle">点击加载更多歌曲</div>
        <div class="qui-tit">歌单简介</div>
        <div
          class="qui-text"
          v-html="desc" />
        <div class="brand">
          <p class="name">QQ音乐</p>
        </div>
      </div>
    </div>
    <audio
      ref="audio" 
      :src="currentAudio"
      class="audio" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Lyric from 'lyric-parser'
import IconSvg from '~/components/IconSvg'
import * as Http from '~/api/api'
import * as TYPE from '~/api/type'
import * as Utils from '~/assets/utils'

const song_begin = 0 // 默认第几条数开始
const song_num = 15 // 数据条数
export default {
  components: {
    IconSvg
  },
  filters: {
    formatCount: function(value) {
      return Utils.formatCount(value)
    }
  },
  async asyncData({ params }) {
    const { id } = params
    const { cdlist } = await Http.Song({ id, song_begin, song_num })
    const {
      logo,
      dissname,
      headurl,
      nickname,
      desc,
      songlist,
      songids,
      songnum,
      visitnum
    } = cdlist[0]
    return {
      logo,
      dissname,
      headurl,
      nickname,
      desc,
      songlist,
      songids,
      songnum,
      visitnum,
      id,
      song_begin: song_begin,
      song_num: song_num // 数据条数
    }
  },
  data() {
    return {
      currentsong: {
        id: ''
      }, // 当前播放歌曲
      lyric: null, // 歌词
      currentAudio: '',
      isPlay: false
    }
  },
  watch: {
    currentAudio: function(newUrl) {
      this.$nextTick(() => {
        this.play()
      })
    },
    lyric: function() {
      this.$nextTick(() => {
        // 歌词滚动
        if (this.$refs.lyrics) {
          if (!this.lyricScroll) {
            this.lyricScroll = new BScroll(this.$refs.lyrics)
          }
          this.lyricScroll.refresh()
        }
      })
    }
  },
  mounted() {
    // 最外层滚动条
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.wrap, {
        click: true,
        probeType: 3
      })
      this.scroll.on('scroll', pos => {
        const { y } = pos
        if (y < -170) {
          this.$refs.main.setAttribute(
            'style',
            `transform: translate(0, -170px); translateZ(0px);`
          )
        } else if (y > 0) {
          this.$refs.main.setAttribute(
            'style',
            'transform: translate(0, 0); translateZ(0px);'
          )
        } else {
          this.$refs.main.setAttribute(
            'style',
            `transform: translate(0, ${y}px); translateZ(0px);`
          )
        }
      })
    }
    this.scroll.refresh()
  },
  methods: {
    onMoreHandle: function() {
      const { id, song_begin, song_num, songlist: vsonglist } = this
      const begin = song_begin + song_num
      Http.Song({ id, song_begin: begin, song_num }).then(({ cdlist }) => {
        const { songnum, songlist } = cdlist[0]
        this.songlist = vsonglist.concat(songlist)
        this.song_begin = begin
      })
    },
    playSongAll: function() {
      this.itemHandle(this.songlist[0])
    },
    itemHandle: function(item) {
      const { id, mid } = item
      if (this.currentsong.id === id) {
        // 判断是否点击同一个
        this.toggle()
        return
      }
      Http.Lyric({ musicid: id }).then(res => {
        let { lyric } = res
        this.currentsong = item
        this.lyric = new Lyric(Utils.formatLyric(lyric), this.lyricHandle)
        this.lyricScroll.refresh()
      })
      Http.Vkey({
        songmid: mid,
        filename: `C100${mid}.m4a`
      }).then(res => {
        const { filename, vkey } = res.data.items[0]
        this.currentAudio = `${
          TYPE.BASE_MUSIC_SRC
        }${filename}?vkey=${vkey}&fromtag=66`
      })
    },
    lyricHandle: function({ lineNum, txt }) {
      console.log(lineNum, txt)
    },
    play: function() {
      this.$refs.audio.play()
      this.isPlay = true
    },
    pause: function() {
      this.$refs.audio.pause()
      this.isPlay = false
    },
    toggle: function() {
      if (this.isPlay) this.pause()
      else this.play()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
.info-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 250px;
  overflow: hidden;
  color: $white;
  background: $white;

  .info-box-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1) translateZ(0);
    filter: blur(30px);
  }

  .info-box-main {
    padding-top: 40px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    position: relative;
  }

  .album {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .cover {
      position: relative;
      width: 125px;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      flex: 1;
      .tit {
        display: flex;
        -webkit-line-clamp: 2;
        max-height: 47px;
        line-height: 1.3;
        overflow: hidden;
        font-size: 18px;
        font-weight: normal;
        margin: 0;
      }
      .author {
        display: flex;
        align-items: center;
        margin-top: 8px;
        .avatar {
          display: block;
          width: 24px;
          height: 24px;
          margin-right: 8px;
          border-radius: 24px;
        }
        .name {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          color: $white;
        }
      }
      .desc {
        display: flex;
        flex-direction: column;
        -webkit-line-clamp: 2;
        max-height: 36px;
        margin-top: 8px;
        font-size: 12px;
        color: $white;
      }
    }
  }

  .opt-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84px;
    padding: 0 16px;
    transition: 1s ease-in-out;
    position: relative;
    z-index: 1;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 160px;
      padding: 0 20px;
      height: 40px;
      overflow: hidden;
      text-align: center;
      font-size: 16px;
      color: $white;
      border-radius: 20px;
      background: $main-color;
      outline: none;
      border: 0;
      &::before {
        content: '';
        display: block;
        height: 0;
        width: 0;
        margin-right: -3px;
        border-color: transparent transparent transparent $white;
        border-width: 7px 11px;
        border-style: solid;
        border-radius: 2px;
      }
    }
    .play-bar {
      display: flex;
      align-items: center;
      flex: 1;
      .icon-play {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        width: 50px;
        height: 50px;
        font-size: 40px;
        color: $main-color;
      }
      .play-info {
        flex: 1;
        .name {
          max-width: 90%;
          margin: 0 5px 0 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 24px;
          color: $white;
          font-weight: normal;
        }

        .lyrics {
          height: 18px;
          overflow: hidden;
          p {
            margin: 0;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
}
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding-bottom: 0;
  overflow: hidden;
  background: $white;
  .content {
    padding-top: 250px;
    padding-bottom: 20px;
  }

  .count-box {
    position: relative;
    display: flex;
    align-items: center;
    height: 54px;
    margin: 0 16px -10px;
    font-size: 15px;

    .desc {
      color: $gray;
      font-size: 14px;
    }
    .number {
      margin-left: 5px;
    }
  }

  .list {
    .item {
      padding: 10px 16px;
      .tit {
        font-size: 16px;
        color: $gray;
      }
      .desc {
        display: block;
        max-width: 94%;
        margin: 0;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: $gray;
        &.vip {
          padding-left: 23px;
          background: url('../../static/images/icon_vip.png') no-repeat center
            left;
          background-size: 18px 10px;
        }
      }
      &.active {
        .tit,
        .desc {
          color: $main-color;
        }
      }
    }
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin-bottom: 15px;
    font-size: 14px;
    color: $gray;
  }
  .qui-tit {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 0 40px;
    overflow: hidden;
    text-align: center;
    font-size: 16px;
    color: $gray;
  }
  .qui-text {
    position: relative;
    margin: 0 16px 20px;
    overflow: hidden;
    text-align: justify;
    word-wrap: break-word;
    font-size: 14px;
    color: $gray;
  }

  .brand {
    padding: 20px 0;
    .name {
      padding-top: 36px;
      margin: 0;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: $black;
      background: url('../../static/images/logo.svg') no-repeat center top;
      background-size: 32px 32px;
    }
  }
}
</style>
