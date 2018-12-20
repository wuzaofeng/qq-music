<template>
  <div class="qui">
    <div class="qui-tit">{{ title }}</div>
    <div
      class="qui-text"
      v-html="desc" />
    <div class="brand">
      <p class="name">QQ音乐</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '简介'
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/_var.scss';
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
    background: url('../static/images/logo.svg') no-repeat center top;
    background-size: 32px 32px;
  }
}
</style>
