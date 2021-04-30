<template>
    <div id="pixi-ground" class="fullscreen" style="z-index: -9"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import {PlayGround} from "src/scripts/PlayGround";

export default {
  name: 'DisplayGround',
  data() {
    return {
      app: new PIXI.Application(),
      playground: new PlayGround(),
    }
  },
  mounted: async function () {
    this.playground = new PlayGround(10, 20);
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0,
      autoStart: false
    });
    document.getElementById('pixi-ground').appendChild(this.app.view);
    await this.playground.playFieldList(this.app);
  },
  methods: {},
}
</script>
