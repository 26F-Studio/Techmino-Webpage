<template>
  <q-carousel
    ref="carousel"
    class="bg-transparent"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    infinite
    swipeable
    :autoplay="false"
    :dark="true"
    :keep-alive="true"
    :style="carouselStyle"
    @transition="resumeVideo">
    <q-carousel-slide :name="1">
      <q-media-player
        ref="videoTitle"
        type="video"
        background-color="transparent"
        source="videos/Title.webm"
        class="full-media-player"
        :autoplay="true"
        :loop="true"
        :mobile-mode="true"
        :muted="true"
        :no-controls="true"
        style="opacity: 0.8;"/>
      <div class="absolute-center custom-caption">
        <div class="text-h2">{{ $t('carousel.title.title') }}</div>
        <div class="text-subtitle1">{{ $t('carousel.description.title') }}</div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="2">
      <q-media-player
        ref="videoLayouts"
        type="video"
        background-color="transparent"
        source="videos/Layouts.webm"
        class="full-media-player"
        :autoplay="true"
        :loop="true"
        :mobile-mode="true"
        :muted="true"
        :no-controls="true"
        style="opacity: 0.8;"/>
      <div class="absolute-center custom-caption">
        <div class="text-h2">{{ $t('carousel.title.layouts') }}</div>
        <div class="text-subtitle1">{{ $t('carousel.description.layouts') }}</div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="3">
      <q-media-player
        ref="videoMods"
        type="video"
        background-color="transparent"
        source="videos/Mods.webm"
        class="full-media-player"
        :autoplay="true"
        :loop="true"
        :mobile-mode="true"
        :muted="true"
        :no-controls="true"
        style="opacity: 0.8;"/>
      <div class="absolute-center custom-caption">
        <div class="text-h2">{{ $t('carousel.title.mods') }}</div>
        <div class="text-subtitle1">{{ $t('carousel.description.mods') }}</div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="4">
      <q-media-player
        ref="videoCustomGame"
        type="video"
        background-color="transparent"
        source="videos/CustomGame.webm"
        class="full-media-player"
        :autoplay="true"
        :loop="true"
        :mobile-mode="true"
        :muted="true"
        :no-controls="true"
        style="opacity: 0.8;"/>
      <div class="absolute-center custom-caption">
        <div class="text-h2">{{ $t('carousel.title.customGame') }}</div>
        <div class="text-subtitle1">{{ $t('carousel.description.customGame') }}</div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="5">
      <q-media-player
        ref="videoCustomField"
        type="video"
        background-color="transparent"
        source="videos/CustomField.webm"
        class="full-media-player"
        :autoplay="true"
        :loop="true"
        :mobile-mode="true"
        :muted="true"
        :no-controls="true"
        style="opacity: 0.8;"/>
      <div class="absolute-center custom-caption">
        <div class="text-h2">{{ $t('carousel.title.customField') }}</div>
        <div class="text-subtitle1">{{ $t('carousel.description.customField') }}</div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="6">
      <q-media-player
        ref="videoMusicRoom"
        type="video"
        background-color="transparent"
        source="videos/MusicRoom.webm"
        class="full-media-player"
        :autoplay="true"
        :loop="true"
        :mobile-mode="true"
        :muted="true"
        :no-controls="true"
        style="opacity: 0.8;"/>
      <div class="absolute-center custom-caption">
        <div class="text-h2">{{ $t('carousel.title.musicRoom') }}</div>
        <div class="text-subtitle1">{{ $t('carousel.description.musicRoom') }}</div>
      </div>
    </q-carousel-slide>
    <template v-slot:control>
      <q-carousel-control position="left">
        <div class="col full-height items-start">
          <q-btn
            unelevated
            class="full-height"
            size="xl"
            text-color="white"
            icon="chevron_left"
            @click="$refs.carousel.previous()"/>
        </div>
      </q-carousel-control>
      <q-carousel-control position="right">
        <div class="col full-height items-end">
          <q-btn
            unelevated
            class="full-height"
            size="xl"
            text-color="white"
            icon="chevron_right"
            @click="$refs.carousel.next()"/>
        </div>
      </q-carousel-control>
      <q-carousel-control position="bottom">
        <div
          v-ripple
          class="q-py-lg cursor-pointer"
          @click="$emit('scroll-down')">
          <q-icon
            id="icon-effect"
            class="absolute-center q-pt-md q-pb-xl"
            size="xl"
            name="keyboard_arrow_down"/>
          <q-icon
            class="absolute-center q-pt-md q-pb-xl"
            size="xl"
            name="keyboard_arrow_down"
            style="color: rgba(255, 255, 255, 0.5);"/>
        </div>
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: "HomeCarousel",
  data() {
    return {
      slide: 1,
      carouselStyle: {
        height: "0px"
      }
    }
  },
  mounted() {
    this.resizeCarousel();
    window.onresize = this.resizeCarousel;
    setInterval(() => {
      this.$refs.carousel.next();
    }, 9000);
  },
  methods: {
    resizeCarousel() {
      this.carouselStyle.height = window.innerHeight + "px";
    },
    logging(message) {
      console.log(message);
    },
    resumeVideo(newVal) {
      switch (newVal) {
        case 1:
          this.$refs.videoTitle.play();
          break;
        case 2:
          this.$refs.videoLayouts.play();
          break;
        case 3:
          this.$refs.videoMods.play();
          break;
        case 4:
          this.$refs.videoCustomGame.play();
          break;
        case 5:
          this.$refs.videoCustomField.play();
          break;
        case 6:
          this.$refs.videoMusicRoom.play();
          break;
      }
    }
  }
}
</script>

<style scoped>
.full-media-player {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
}

#icon-effect {
  animation: icon-effect-animation 3s infinite;
}

@keyframes icon-effect-animation {
  0% {
    top: 50%;
    color: rgba(255, 255, 255, 0.0);
  }
  20% {
    top: 50%;
    color: rgba(255, 255, 255, 1.0);
  }
  50% {
    top: 50%;
    color: rgba(255, 255, 255, 1.0);
  }
  70% {
    color: rgba(255, 255, 255, 1.0);
  }
  100% {
    top: 100%;
    color: rgba(255, 255, 255, 0.0);
  }
}
</style>
