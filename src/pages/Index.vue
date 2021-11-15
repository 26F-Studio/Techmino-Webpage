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
        <q-btn-dropdown
          split
          no-caps
          color="green"
          dropdown-icon="mdi-dots-vertical"
          :size="joinButtonSize"
          :icon="mainDownloadLink.icon"
          :label="$t(mainDownloadLink.text)"
          type="a"
          :href="mainDownloadLink.link"
          target="_blank">
          <q-list
            v-for="(value,key) in downloadLinkList"
            :key="key">
            <q-item
              clickable
              v-close-popup
              @click="openLink(value.link)">
              <q-item-section avatar>
                <q-avatar
                  :icon="value.icon"
                  :color="value.color"
                  text-color="white"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t(value.text) }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="value.extern">
                <q-icon name="mdi-open-in-new" color="white"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
      mainDownloadLink: {},
      downloadLinkList: {
        win32: {
          link: 'https://d.flaribbit.workers.dev/Techmino_Win32.zip',
          icon: 'mdi-microsoft-windows-classic',
          color: 'brown',
          extern: false,
          text: 'downloads.win32',
        },
        win64: {
          link: 'https://d.flaribbit.workers.dev/Techmino_Win64.zip',
          icon: 'mdi-microsoft-windows',
          color: 'blue',
          extern: false,
          text: 'downloads.win64',
        },
        linux: {
          link: 'https://d.flaribbit.workers.dev/Techmino.AppImage',
          icon: 'mdi-linux',
          color: 'orange',
          extern: false,
          text: 'downloads.linux',
        },
        macOS: {
          link: 'https://d.flaribbit.workers.dev/Techmino_macOS.dmg',
          icon: 'mdi-apple-finder',
          color: 'cyan',
          extern: false,
          text: 'downloads.macOS',
        },
        iOS: {
          link: 'https://apps.apple.com/app/id1590869403',
          icon: 'mdi-apple-ios',
          color: 'pink',
          extern: true,
          text: 'downloads.iOS',
        },
        android: {
          link: 'https://d.flaribbit.workers.dev/Techmino.apk',
          icon: 'mdi-android',
          color: 'light-green',
          extern: false,
          text: 'downloads.android',
        },
      },
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
    nutshellDownloadFont() {
      if (this.$q.screen.lt.sm) {
        return "text-h6";
      } else if (this.$q.screen.lt.md) {
        return "text-h4";
      } else {
        return "text-h3";
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
  created() {
    this.checkPlatform();
  },
  methods: {
    checkPlatform() {
      if (this.$q.platform.is.linux) {
        this.mainDownloadLink = this.downloadLinkList.linux;
        delete this.downloadLinkList.linux;
      } else if (this.$q.platform.is.mac) {
        this.mainDownloadLink = this.downloadLinkList.macOS;
        delete this.downloadLinkList.macOS;
      } else if (this.$q.platform.is.ios) {
        this.mainDownloadLink = this.downloadLinkList.iOS;
        delete this.downloadLinkList.iOS;
      } else if (this.$q.platform.is.android) {
        this.mainDownloadLink = this.downloadLinkList.android;
        delete this.downloadLinkList.android;
      } else {
        this.mainDownloadLink = this.downloadLinkList.win64;
        delete this.downloadLinkList.win64;
      }
    },
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

