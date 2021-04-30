<template>
  <div id="pixi-logo" class="full-logo"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import {Logo} from "src/scripts/Logo.js";
import {MinoTypeMap} from "src/scripts/Minos";

export default {
  name: "AnimatedLogo",
  props: {
    minoBaseAmount: Number,
  },
  data() {
    return {
      app: new PIXI.Application(),
      logo: new Logo(),
      animatedLogo: new PIXI.Container,
      initialRatio: 0,
      interval: 0,
      characters: [],
    }
  },
  mounted() {
    this.app = new PIXI.Application({
      resizeTo: document.getElementById("logo-container"),
      backgroundAlpha: 0,
    });
    document.getElementById("pixi-logo").appendChild(this.app.view);

    this.initLogo();
    this.interval = 1000;

    const baseSpeed = 1;
    const edgeLength = 30;
    const minoAmount = 100;

    let minos = [];
    let minosContainer = new PIXI.Container();

    for (let i = 0; i < minoAmount; i++) {
      let graphics;
      switch (Math.floor(Math.random() * 7)) {
        case 0:
          graphics = new MinoTypeMap.I().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height;
          break;
        case 1:
          graphics = new MinoTypeMap.O().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height / 2.0;
          break;
        case 2:
          graphics = new MinoTypeMap.T().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 3:
          graphics = new MinoTypeMap.S().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 4:
          graphics = new MinoTypeMap.Z().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 5:
          graphics = new MinoTypeMap.J().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        case 6:
          graphics = new MinoTypeMap.L().generateGraphics(edgeLength, 0xFFFFFF);
          graphics.pivot.x = graphics.width / 2.0;
          graphics.pivot.y = graphics.height * 0.75;
          break;
        default:
          break;
      }
      graphics.rotation = Math.random() * Math.PI * 2;

      const mino = {
        graphics: graphics,
        x: 0,
        y: 0,
        speed: 0
      };
      this.randomizeStar(mino, true);
      minosContainer.addChild(mino.graphics);
      minos.push(mino);
    }
    this.app.stage.addChild(minosContainer);

    this.app.ticker.add((delta) => {
      let movedY = delta * baseSpeed;
      for (let i = 0; i < minoAmount; i++) {
        const mino = minos[i];

        mino.y -= movedY * mino.speed;
        if (mino.y < this.interval * -0.1) {
          this.randomizeStar(mino, false);
        }

        mino.graphics.x = mino.x * this.app.view.width;
        mino.graphics.y = mino.y / this.interval * this.app.view.height;
      }
      let bounds = this.logo.getBounds();
      let aspectRatio = this.app.view.width / (bounds.right * this.initialRatio) / 1.2;
      this.animatedLogo.scale.x = aspectRatio;
      this.animatedLogo.scale.y = aspectRatio;
    });
  },
  methods: {
    initLogo() {
      let bounds = this.logo.getBounds();
      let scaleOnY = false;

      if (
        this.app.view.width / (bounds.right - bounds.left) / 1.2 <=
        this.app.view.height / (bounds.bottom - bounds.top) / 1.2
      ) {
        this.initialRatio = this.app.view.width / (bounds.right - bounds.left) / 1.2;
      } else {
        this.initialRatio = this.app.view.height / (bounds.bottom - bounds.top) / 1.2;
        scaleOnY = true;
      }


      this.characters.push(this.logo.generate('T', 50,0xFFFFFF,1,1,0xCC66FF,1,1));
      this.characters.push(this.logo.generate('E', 50,0xFFFFFF,1,1,0x7FFFFF,1,1));
      this.characters.push(this.logo.generate('C', 50,0xFFFFFF,1,1,0xB2B2FF,1,1));
      this.characters.push(this.logo.generate('H', 50,0xFFFFFF,1,1,0xFFCC4C,1,1));
      this.characters.push(this.logo.generate('M', 50,0xFFFFFF,1,1,0xFFB27F,1,1));
      this.characters.push(this.logo.generate('I', 50,0xFFFFFF,1,1,0xFF7FFF,1,1));
      this.characters.push(this.logo.generate('N', 50,0xFFFFFF,1,1,0x7FFF7F,1,1));
      this.characters.push(this.logo.generate('O', 50,0xFFFFFF,1,1,0xFFFF7F,1,1));
      for (let character of this.characters) {
        character.scale.x *= this.initialRatio;
        character.scale.y *= this.initialRatio;
        character.x += (this.app.view.width - (bounds.right - bounds.left * 3.5) * this.initialRatio) / 2.0;
        character.y += (this.app.view.height - (bounds.bottom - bounds.top * 2) * this.initialRatio) / 2.0;
        this.animatedLogo.addChild(character);
      }
      this.app.stage.addChild(this.animatedLogo);
    },
    randomizeStar(mino, initial) {
      mino.x = Math.random();
      mino.y = initial ? (1 - Math.random()) * this.interval : mino.y + this.interval * 1.2;
      mino.speed = (Math.random() + 0.2) * 3;

      let scale = (Math.random() + 1) / 2;
      mino.graphics.scale.x = scale;
      mino.graphics.scale.y = scale;
      mino.graphics.tint = Math.random() < 0.5 ? 0x000000 : 0xFFFFFF;
      mino.graphics.alpha = Math.random() * 0.3;
      mino.graphics.rotation = Math.floor(Math.random() * 4) * Math.PI / 2;
    }
  }
}
</script>

<style scoped>
.full-logo {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
