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
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.main {
  position: relative;
  width: 80px;
  height: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loading span {
  display: inline-block;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  background: lightgreen;
  -webkit-animation: load 1s ease infinite;
}

.main {
}

@keyframes load {
  0%,
  100% {
    height: 40px;
    background: lightgreen;
  }
  50% {
    height: 70px;
    margin: -15px 0;
    background: lightblue;
  }
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.4s;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.6s;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.8s;
}
</style>
