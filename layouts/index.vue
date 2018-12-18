<template>
  <section class="container max-width">
    <Head />
    <main class="main">
      <nav class="nav">
        <nuxt-link
          v-for="item in nav"
          :to="item.link"
          :key="item.type"
          class="item"
        >{{ item.name }}</nuxt-link>
      </nav>
      <nuxt/>
    </main>
  </section>
</template>

<script>
import '~/assets/iconfont'
// import '~/assets/lib-flexible-min'
import Head from '~/components/Head.vue'
export default {
  components: {
    Head
  },
  data() {
    return {
      active: 'type',
      nav: [
        {
          type: 'recommend',
          link: '/recommend',
          name: '推荐'
        },
        {
          type: 'ranking',
          link: 'ranking',
          name: '排行榜'
        },
        {
          type: 'search',
          link: '/search',
          name: '搜索'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
$gray: #808080;
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.main {
  flex: 1;
  width: 100%;
}
.nav {
  display: flex;
  .item {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: $gray;
  }

  .active {
    position: relative;
    color: $link-active;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 2px;
      background-color: $link-active-line;
    }
  }
}
</style>
