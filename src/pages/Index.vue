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
        <div class="column full-width text-center">
          <div
            class="text-primary text-weight-bold q-pb-md"
            :class="nutshellPrimaryFont">
            {{ $t('nutshell.primary') }}
          </div>
          <div
            class="text-info text-weight-thin q-pb-md"
            :class="nutshellMinorFont"
            v-for="item in $t('nutshell.minors')"
            :key="item">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="row full-width justify-center q-pa-sm">
          <q-btn
            class="q-ma-xs"
            color="green"
            icon="cloud_download"
            :size="joinButtonSize"
            :label="$t('downloads.others')"
            type="a"
            href="http://mc.yuhao7370.top:5212/s/gvi6"
            target="_blank"/>
          <q-btn
            class="q-ma-xs"
            color="light-blue"
            icon="fab fa-apple"
            icon-right="open_in_new"
            :size="joinButtonSize"
            :label="$t('downloads.apple')"
            type="a"
            href="https://apps.apple.com/app/id1590869403"
            target="_blank"/>
      </div>
      <div class="row full-width justify-center q-pa-sm">
        <q-btn
          class="q-ma-xs"
          color="blue"
          icon="fab fa-qq"
          :size="joinButtonSize"
          :label="$t('joinNow.qq')"
          type="a"
          href="https://jq.qq.com/?_wv=1027&k=EXHlUEpX"
          target="_blank"/>
        <q-btn
          class="q-ma-xs"
          color="blue-grey"
          icon="fab fa-discord"
          :size="joinButtonSize"
          :label="$t('joinNow.discord')"
          type="a"
          href="https://discord.gg/zSXzwkUkVe"
          target="_blank"/>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import {AuthType, createClient} from "webdav";

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
  computed: {
    nutshellPrimaryFont() {
      if (this.$q.screen.lt.sm) {
        return "text-h5";
      } else if (this.$q.screen.lt.md) {
        return "text-h3";
      } else {
        return "text-h2";
      }
    },
    nutshellMinorFont() {
      if (this.$q.screen.lt.sm) {
        return "text-subtitle1";
      } else if (this.$q.screen.lt.md) {
        return "text-h5";
      } else {
        return "text-h4";
      }
    },
    joinButtonSize() {
      if (this.$q.screen.lt.sm) {
        return "sm";
      } else if (this.$q.screen.lt.md) {
        return "md";
      } else {
        return "lg";
      }
    }
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
    openLink(link) {
      window.open(link, "_blank");
    }
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

