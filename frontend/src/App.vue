<template>
  <div>
    <Header />
    <div class="space"></div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "./scss/global.scss";
</style>
