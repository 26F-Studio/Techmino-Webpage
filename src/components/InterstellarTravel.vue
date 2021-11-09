<template>
  <div id="pixi-interstellar" class="absolute-full"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import {MinoTypeMap} from "src/scripts/Minos.js";

export default {
  name: "InterstellarTravel",
  props: {
    minoBaseAmount: Number,
  },
  mounted() {
    const app = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0
    });
    document.getElementById("pixi-interstellar").appendChild(app.view);

    const windowFactor = Math.min(window.innerWidth, window.innerHeight) / 1080.0;

    const fov = 20;
    const edgeLength = 10;
    const baseSpeed = 0.5;

    const minoAmount = this.minoBaseAmount * windowFactor;
    const minoBaseSize = windowFactor;

    let cameraZ = 0;

    const stars = [];

    for (let i = 0; i < minoAmount; i++) {
      let graphics;
      switch (Math.floor(Math.random() * 7)) {
        case 0:
          graphics = new MinoTypeMap.I().generateGraphics(edgeLength, 0x5BEAED);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height;
          break;
        case 1:
          graphics = new MinoTypeMap.O().generateGraphics(edgeLength, 0xEAED5B);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height / 2.0;
          break;
        case 2:
          graphics = new MinoTypeMap.T().generateGraphics(edgeLength, 0xBA5BED);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 3:
          graphics = new MinoTypeMap.S().generateGraphics(edgeLength, 0xED5B5B);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 4:
          graphics = new MinoTypeMap.Z().generateGraphics(edgeLength, 0x5BED5B);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 5:
          graphics = new MinoTypeMap.J().generateGraphics(edgeLength, 0xED955B);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 6:
          graphics = new MinoTypeMap.L().generateGraphics(edgeLength, 0x5B8AED);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        default:
          break;
      }
      graphics.rotation = Math.random() * Math.PI * 2;

      const mino = {
        graphics: graphics,
        z: 0,
        x: 0,
        y: 0,
        rotateSpeed: 0,
      };
      randomizeStar(mino, true);
      app.stage.addChild(mino.graphics);
      stars.push(mino);
    }

    function randomizeStar(star, initial) {
      star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

      const deg = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 1;
      star.x = Math.cos(deg) * distance;
      star.y = Math.sin(deg) * distance;
      star.rotateSpeed = (Math.random() - 0.5) / 50.0 * Math.PI;
    }

    app.ticker.add((delta) => {
      cameraZ += delta * 10 * baseSpeed;
      for (let i = 0; i < minoAmount; i++) {
        const star = stars[i];
        if (star.z < cameraZ) {
          randomizeStar(star);
        }

        const z = star.z - cameraZ;
        star.graphics.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
        star.graphics.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

        const distanceScale = Math.max(0, (2000 - z) / 2000);
        star.graphics.scale.x = distanceScale * minoBaseSize;
        star.graphics.scale.y = distanceScale * minoBaseSize;
        star.graphics.rotation += star.rotateSpeed;
      }
    });
  },
  methods: {}
}
</script>

<style scoped>

</style>
