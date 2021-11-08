<template>
  <q-responsive :ratio="responsiveRatio" class="full-width">
    <svg
      :viewBox="[-300, 0, 7500, 1500]"
    >
      <svg
        v-for="character in logo.characters"
        :viewBox="[-30, -30, 7500, 1500]"
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
          <animate
            :id="character.name + '_FlashInFill'"
            class="flash-in-animate"
            attributeName="fill"
            to="#FFFFFF"
            begin="indefinite"
            dur="200ms"
            fill="freeze"/>
          <animate
            attributeName="stroke-opacity"
            to="1.0"
            :begin="character.name + '_FlashInFill.begin'"
            dur="200ms"
            fill="freeze"/>
          <animate
            attributeName="stroke-width"
            to="50px"
            :begin="character.name + '_FlashInFill.begin'"
            dur="200ms"
            fill="freeze"/>

          <animate
            :id="character.name + '_FlashOutFill'"
            attributeName="fill"
            :to="character.fillColor"
            :begin="character.name + '_FlashInFill.end'"
            dur="1s"
            fill="freeze"/>
          <animate
            attributeName="stroke-width"
            to="40px"
            :begin="character.name + '_FlashInFill.end'"
            dur="1s"
            fill="freeze"/>
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
    let frameLimit = 70;
    let frameInterval = 33;
    this.logo.initPosition();
    let inInterval = setInterval(() => {
      this.logo.animateIn(frameLimit);
    }, frameInterval);
    setTimeout(() => {
      clearInterval(inInterval);
      document.querySelectorAll(".flash-in-animate").forEach((element) => {
        element.beginElement();
      });
    }, frameLimit * frameInterval);
  },
  computed: {
    responsiveRatio() {
      if (this.$q.screen.lt.md) {
        return 16 / 9;
      } else if (this.$q.screen.lt.lg) {
        return 16 / 6;
      } else {
        return 16 / 4;
      }
    }
  }
}
</script>

<style scoped>

</style>
