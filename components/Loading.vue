<template>
  <div
    v-if="loading"
    class="loading">
    <div class="main">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>

</template>

<script>
export default {
  name: '',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    styleObject: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.loading {
  position: relative;
}

.main {
  position: relative;
  width: 80px;
  margin-left: -40px;
  left: 50%;
}
.loading span {
  display: inline-block;
  width: 8px;
  height: 16px;
  border-radius: 4px;
  background: lightgreen;
  animation: load 1s ease infinite;
}

@keyframes load {
  0%,
  100% {
    height: 16px;
    background: lightgreen;
  }
  50% {
    height: 30px;
    margin: -15px 0;
    background: lightblue;
  }
}
.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.4s;
}
.loading span:nth-child(4) {
  animation-delay: 0.6s;
}
.loading span:nth-child(5) {
  animation-delay: 0.8s;
}
</style>
