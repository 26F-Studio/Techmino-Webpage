<template>
  <q-responsive :ratio="responsiveRatio" class="full-width">
    <svg
      :viewBox="[-300, 0, 7500, 1500]"
    >
      <svg
        v-for="character in logo.characters"
        :viewBox="[-15, -15, 7500, 1500]"
        :key="character.name"
        :x="character.position.x + 'px'"
        :y="character.position.y + 'px'"
        :style="character.style"
      >
        <g>
          <polygon
            class="logoClass_Base"
            :points="character.path"
          />
          <!--            <animateMotion-->
          <!--              id="logoAnime_T"-->
          <!--              path="M-50,-200 L0,0"-->
          <!--              begin="1s; logoAnime_O.end + 5s"-->
          <!--              dur="3s"-->
          <!--              repeatCount="0"-->
          <!--            />-->
        </g>
      </svg>
    </svg>
  </q-responsive>
</template>

<script>
import {Logo} from "src/scripts/Logo";

export default {
  name: "ResponsiveLogo",
  data() {
    return {
      logo: new Logo()
    }
  },
  mounted() {
    let frameLimit = 90;
    let frameInterval = 33;
    this.logo.initPosition();
    let inInterval = setInterval(() => {
      this.logo.animate(frameLimit);
    }, frameInterval);
    setTimeout(() => {
      clearInterval(inInterval);
    }, frameLimit * frameInterval);
  },
  computed: {
    responsiveRatio() {
      if (this.$q.screen.lt.md) {
        return 16 / 7;
      } else {
        return 16 / 5;
      }
    }
  }
}
</script>

<style scoped>

</style>
