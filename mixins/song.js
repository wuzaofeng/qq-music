import BScroll from 'better-scroll'

const songMix = {
  watch: {
    currentsong() {
      this.$nextTick(() => {
        this.play()
      })
    },
    lyric() {
      this.$nextTick(() => {
        if (this.$refs.lyrics) {
          if (!this.lyricScroll) {
            this.lyricScroll = new BScroll(this.$refs.lyrics)
          } else {
            this.lyricScroll.refresh()
          }
          this.lyric.play()
        }
      })
    }
  },
  mounted() {
    // 最外层滚动条
    this.scroll = new BScroll(this.$refs.wrap, {
      click: true,
      probeType: 3
    })
    this.scroll.on('scroll', this.scrollHandle)

    // 获取播放信息
    this.songSrc()

    // 绑定timeupdate 事件
    this.$refs.audio.ontimeupdate = this.timeupdate
    this.$refs.audio.onended = this.ended
  },
  methods: {
    scrollHandle(pos) {
      const { y } = pos
      if (this.$refs.main) {
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
      }
    },
    playSongAll() {
      this.itemHandle(this.songlist[0], 0)
    },
    lyricHandle({ lineNum, txt }) {
      if (this.isPlay) {
        // 过滤一下歌词, 因为点击时候清除歌词对象，歌词有时候还会出现原来的定时器，不知道是不是插件的bug
        // 总之赋值时候过滤下, 由于只返回行数和txt，只能用txt查找
        let flag = false
        for (let i = 0; i < this.lyric.lines.length; i++) {
          const item = this.lyric.lines[i]
          if (item.txt === txt) {
            flag = true
            break
          }
        }
        if (flag) {
          this.currentLineNum = lineNum
          // this.$refs.lyricsLine[lineNum] 有点问题
          let lineEl = this.$refs.lyricsLine.find(i => i.classList.length > 0)
          this.lyricScroll.stop()
          this.lyricScroll.scrollToElement(lineEl, 1500)
        }
      }
    },
    play() {
      this.isPlay = true
      this.$refs.audio.play()
    },
    pause() {
      this.isPlay = false
      this.lyric.stop()
      this.$refs.audio.pause()
    },
    toggle() {
      if (this.isPlay) {
        this.pause()
      } else {
        this.play()
      }
    },
    timeupdate() {
      if (this.isPlay && this.$refs.audio) {
        let { duration = '', currentTime = '' } = this.$refs.audio
        if (Number.isNaN(duration)) duration = 0
        if (Number.isNaN(currentTime)) duration = 1
        const dasharray = (currentTime / duration) * 100
        this.dasharray = Number.isNaN(dasharray) ? 0 : dasharray
        if (currentTime && duration) this.lyric.seek(currentTime * 1000)
      }
    },
    ended() {
      const totalNum = this.songlist.length
      let num = this.currentNum + 1 === totalNum ? 0 : this.currentNum + 1
      const item = this.songlist[num]
      // 判断是不是可播放，还是最后一个
      if (item.action.alert === 0 || item.pay.pay_play) {
        num += 1
      }
      this.itemHandle(this.songlist[num], num)
    }
  },
  destroyed() {
    this.lyric && this.lyric.stop()
  }
}

export default songMix
