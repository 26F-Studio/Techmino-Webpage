<template>
  <q-page class="flex flex-center fullscreen-page">
    <InterstellarTravel class="dimmed" :mino-base-amount="300" style="opacity: 0.75"/>
    <q-scroll-area
      class="fixed-full"
      ref="scrollArea"
      :visible="visible">
      <div class="column items-start full-width">
        <q-responsive :ratio="20" class="full-width"/>
        <ResponsiveLogo/>
        <div class="column full-width items-center">
          <div class="text-h2 text-primary text-weight-bold q-pb-lg">
            {{ $t('nutshell.primary') }}
          </div>
          <div
            class="text-h4 text-info text-weight-thin q-pb-md"
            v-for="item in $t('nutshell.minors')"
            :key="item">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="row full-width justify-center q-pa-xl">
        <q-btn
          class="q-mx-md"
          color="blue"
          icon="fab fa-qq"
          size="lg"
          :label="$t('joinNow.qq')"
          type="a"
          href="https://jq.qq.com/?_wv=1027&k=EXHlUEpX"
          target="_blank"/>
        <q-btn
          class="q-mx-md"
          color="blue-grey"
          icon="fab fa-discord"
          size="lg"
          :label="$t('joinNow.discord')"
          type="a"
          href="https://discord.gg/zSXzwkUkVe"
          target="_blank"/>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import InterstellarTravel from "components/InterstellarTravel";
import ResponsiveLogo from "components/ResponsiveLogo";

export default {
  name: 'PageIndex',
  components: {
    ResponsiveLogo,
    InterstellarTravel,
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
  },
  methods: {
    // async animateScroll() {
    //   let totalDuration = 800;
    //   let sectionCount = 10;
    //   let ratio = this.$refs.scrollArea.getScrollPosition() / window.innerHeight;
    //   for (let i = 0; i < sectionCount; i++) {
    //     await this.scrollWithDelay(
    //       ratio + (1 - ratio) * this.easeOutQuart(i / sectionCount),
    //       totalDuration / sectionCount
    //     );
    //   }
    // },
    // easeOutQuart(x) {
    //   return 1 - Math.pow(1 - x, 4);
    // },
    // async scrollWithDelay(ratio, duration) {
    //   this.$refs.scrollArea.setScrollPosition(window.innerHeight * ratio, duration);
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, duration);
    //   });
    // },
  },
  beforeDestroy() {
    window.onresize = () => {
    };
  }
}
</script>

<style lang="scss" scoped>
.fullscreen-page {
  position: absolute;
}
</style>

