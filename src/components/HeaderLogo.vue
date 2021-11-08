<template>
  <q-btn
    class="q-py-xs"
    flat
    to="/">
    <q-avatar
      class="img-logo"
      rounded
      :size="avatarSize">
      <q-img src="icons/favicon-128x128.png"/>
    </q-avatar>
    <div
      class="column items-center
       q-py-sm-xs q-py-md-sm
       q-px-xs-xs q-px-sm-sm q-px-md-md"
      :style="{width: logoWidth}">
      <svg class="items-center"
           x="500px"
           y="1000px"
           viewBox="0 -200 6500 1500"
           xml:space="preserve">
              <g id="logoChars_T">
                <polygon class="logoClass_Base logoClass_T"
                         points="53,60 1035,0 964,218 660,218 391,1300 231,1154 415,218 0,218"/>
                <animateMotion id="logoAnime_T" path="M0,0 L0,-150 z" begin="4.25s; logoAnime_O.end + 5s" dur="400ms"
                               repeatCount="0"/>
              </g>
        <g id="logoChars_E">
                <polygon class="logoClass_Base logoClass_E"
                         points="716,290 1429,290 1312,462 875,489 821,695 1148,712 1017,902 761,924 707,1127 1106,1101 1198,1300 465,1300"/>
          <animateMotion id="logoAnime_E" path="M0,0 L0,-150 z" begin="logoAnime_T.begin + 100ms" dur="400ms"
                         repeatCount="0"/>
              </g>
        <g id="logoChars_C">
                <polygon class="logoClass_Base logoClass_C"
                         points="1516,287 2102,290 2036,464 1598,465 1322,905 1395,1102 1819,1064 1743,1280 1286,1310 1106,902"/>
          <animateMotion id="logoAnime_C" path="M0,0 L0,-200 z" begin="logoAnime_E.begin + 100ms" dur="300ms"
                         repeatCount="0"/>
              </g>
        <g id="logoChars_H">
                <polygon class="logoClass_Base logoClass_H"
                         points="2179,290 2411,290 2272,688 2674,666 2801,290 3041,290 2693,1280 2464,1280 2601,879 2199,897 2056,1280 1828,1280"/>
          <animateMotion id="logoAnime_H" path="M0,0 L0,-200 z" begin="logoAnime_C.begin + 100ms" dur="300ms"
                         repeatCount="0"/>
              </g>
        <g id="logoChars_M">
                <polygon class="logoClass_Base logoClass_M"
                         points="3123,290 3480,290 3496,480 3664,290 4017,294 3682,1280 3453,1280 3697,578 3458,843 3304,842 3251,561 3001,1280 2779,1280"/>
          <animateMotion id="logoAnime_M" path="M0,0 L0,-200 z" begin="logoAnime_H.begin + 100ms" dur="300ms"
                         repeatCount="0"/>
              </g>
        <g id="logoChars_I">
                <polygon class="logoClass_Base logoClass_I"
                         points="4088,290 4677,290 4599,501 4426,502 4219,1069 4388,1070 4317,1280 3753,1280 3822,1068 3978,1068 4194,504 4016,504"/>
          <animateMotion id="logoAnime_I" path="M0,0 L0,-200 z" begin="logoAnime_M.begin + 100ms" dur="300ms"
                         repeatCount="0"/>
              </g>
        <g id="logoChars_N">
                <polygon class="logoClass_Base logoClass_N"
                         points="4747,290 4978,295 4921,464 5186,850 5366,290 5599,295 5288,1280 5051,1280 5106,1102 4836,709 4641,1280 4406,1280"/>
          <animateMotion id="logoAnime_N" path="M0,0 L0,-200 z" begin="logoAnime_I.begin + 100ms" dur="300ms"
                         repeatCount="0"/>
              </g>
        <g id="logoChars_O">
                <polygon class="logoClass_Base logoClass_O"
                         points="5814,290 6370,295 6471,415 6238,1156 6058,1280 5507,1280 5404,1154 5635,416 5770,542 5617,1030 5676,1105 5995,1106 6100,1029 6255,541 6199,465 5878,463"/>
          <animateMotion id="logoAnime_O" path="M0,0 L0,-200 z" begin="logoAnime_N.begin + 100ms" dur="300ms"
                         repeatCount="0"/>
              </g>
            </svg>
    </div>
  </q-btn>
</template>

<script>
export default {
  name: "HeaderLogo",
  props: {
    mini: Boolean
  },
  data() {
    return {
      isMini: this.mini,
    }
  },
  watch:{
    mini(value){
      this.isMini = value;
    }
  },
  computed: {
    avatarSize() {
      if (this.isMini) {
        if (this.$q.screen.lt.sm) {
          return "0.8rem";
        } else if (this.$q.screen.lt.md) {
          return "1.5rem";
        } else {
          return "2.5rem";
        }
      } else {
        if (this.$q.screen.lt.sm) {
          return "1.2rem";
        } else if (this.$q.screen.lt.md) {
          return "2rem";
        } else {
          return "3rem";
        }
      }
    },
    logoWidth() {
      if (this.isMini) {
        if (this.$q.screen.lt.sm) {
          return "3rem";
        } else if (this.$q.screen.lt.md) {
          return "7rem";
        } else {
          return "12rem";
        }
      } else {
        if (this.$q.screen.lt.sm) {
          return "5rem";
        } else if (this.$q.screen.lt.md) {
          return "10rem";
        } else {
          return "15rem";
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-logo {
  animation: logo-animation 6s infinite;
}

.logoClass_Base {
  fill: #ffffff
}

@keyframes logo-animation {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-15deg);
  }
  70% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
