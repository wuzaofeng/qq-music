<template>
  <header class="header">
    <i class="music-logo">qq音乐</i>
    <span class="btn-download">下载APP</span>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~/scss/_var.scss';
$download-bg: #149c5a;
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 44px;
  background-color: $main-color;

  .music-logo {
    float: left;
    display: block;
    width: 90px;
    height: 25px;
    margin-left: 10px;
    background-image: url('https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo.png?max_age=19830212&d=20151105145423');
    background-size: cover;
    background-repeat: no-repeat;
    text-indent: -9999px;
  }

  .btn-download {
    position: absolute;
    display: inline-block;
    right: 10px;
    top: 8px;
    height: 28px;
    padding: 0 12px;
    line-height: 28px;
    border-radius: 99px;
    font-size: 14px;
    background: $download-bg;
    color: $white;
  }
}
</style>
