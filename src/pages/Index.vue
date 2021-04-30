<template>
  <q-page class="flex flex-center fullscreen-page absolute-top">
    <InterstellarTravel class="dimmed" :mino-base-amount="300"/>
    <q-scroll-area
      class="fixed-full"
      ref="scrollArea"
      :visible="visible">
      <div class="row full-width">
        <div class="full-width self-start">
          <HomeCarousel v-on:scroll-down="animateScroll"/>
        </div>
        <div id="logo-container" ref="logoContainer" class="full-width" style="height:600px">
          <AnimatedLogo/>
        </div>
        <div v-for="n in 400" :key="n" class="q-py-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import InterstellarTravel from "components/InterstellarTravel";
import HomeCarousel from "components/HomeCarousel";
import AnimatedLogo from "components/AnimatedLogo";

export default {
  name: 'PageIndex',
  components: {
    AnimatedLogo,
    HomeCarousel,
    InterstellarTravel
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
    window.onresize = () => {
      this.resizeLogoContainer();
    }
  },
  methods: {
    resizeLogoContainer(){
      this.$refs.logoContainer.style.height = window.innerWidth / 3 + "px";
    },
    async animateScroll() {
      let totalDuration = 800;
      let sectionCount = 10;
      let ratio = this.$refs.scrollArea.getScrollPosition() / window.innerHeight;
      for (let i = 0; i < sectionCount; i++) {
        await this.scrollWithDelay(
          ratio + (1 - ratio) * this.easeOutQuart(i / sectionCount),
          totalDuration / sectionCount
        );
      }
    },
    easeOutQuart(x) {
      return 1 - Math.pow(1 - x, 4);
    },
    async scrollWithDelay(ratio, duration) {
      this.$refs.scrollArea.setScrollPosition(window.innerHeight * ratio, duration);
      await new Promise((resolve) => {
        setTimeout(resolve, duration);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.fullscreen-page {
  position: absolute;
}
</style>

