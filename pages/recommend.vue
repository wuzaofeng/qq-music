<template>
  <div class="recommend">
    <div class="swiper-wrap">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="item in slider"
          :key="item.id">
          <a
            :href="item.linkUrl"
            class="link">
            <img
              :src="item.picUrl"
              :alt="item.id"
              class="img">
          </a>
        </swiper-slide>
      </swiper>
      <div
        slot="pagination"
        class="swiper-pagination" />
    </div>
    <div class="radio">
      <h2 class="title">电台</h2>
      <div class="radio-wrap">
        <homeItem
          v-for="item in radioList"
          :key="item.radioid"
          :title="item.Ftitle"
          :img-src="item.picUrl"
          :id="item.radioid"
          type="radio"
          @click="clickHandle"
        /> 
      </div>
    </div>
    <div class="song">
      <h2 class="title">热门歌单</h2>
      <div class="song-wrap">
        <homeItem
          v-for="item in songList"
          :key="item.id"
          :title="item.songListDesc"
          :img-src="item.picUrl"
          :img-alt="item.pic_mid"
          :text="item.songListAuthor"
          :count="item.accessnum"
          :id="item.id"
          type="song"
          @click="clickHandle"
        />
      </div>
    </div>
    <nuxt-child/>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import homeItem from '~/components/HomeItem'
import * as Http from '~/api/api'
export default {
  layout: 'index',
  async asyncData() {
    const { data } = await Http.Home()
    const { radioList, slider, songList } = data
    return { radioList, slider, songList }
  },
  components: {
    swiper,
    swiperSlide,
    homeItem
  },
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        loop: true
      }
    }
  },
  methods: {
    clickHandle(type, id) {
      this.$router.push({ name: `${type}-id`, params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
.swiper-wrap {
  position: relative;
  .link {
    display: block;
  }
  .img {
    display: inline-block;
    width: 100%;
  }
}
.swiper-pagination {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  .swiper-pagination-bullet {
    margin-right: 5px;
    color: rgba(144, 144, 144, 0.8);
    &:last-child {
      margin-right: 0;
    }
  }
}
.title {
  font-size: 16px;
  color: $black;
  margin: 10px;
  font-weight: normal;
}
.radio-wrap,
.song-wrap {
  margin-left: 10px;
  margin-bottom: 7px;
  overflow: hidden;
}
</style>

<style lang="scss">
@import '~/scss/_var.scss';
.swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  margin: 0 4px;
  background-color: rgba(144, 144, 144, 0.8);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
.swiper-pagination-bullet-active {
  background: $white;
}
</style>
