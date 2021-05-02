<template>
  <div id="pixi-logo" class="full-logo"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import {Logo} from "src/scripts/Logo.js";

export default {
  name: "AnimatedLogo",
  props: {
    minoBaseAmount: Number,
  },
  data() {
    return {
      app: new PIXI.Application(),
      animatedLogo: new PIXI.Container,
      initialRatio: 0,
      interval: 0,
      characters: {
        object: [],
        container: []
      },
    }
  },
  mounted() {
    this.app = new PIXI.Application({
      resizeTo: document.getElementById("logo-container"),
      backgroundAlpha: 0,
    });
    document.getElementById("pixi-logo").appendChild(this.app.view);

    this.initLogo();

    this.app.ticker.add((delta) => {
      let bounds = Logo.getBounds();
      let aspectRatio = this.app.view.width / (bounds.right * this.initialRatio) / 1.2;
      // for (let object of this.characters.object) {
      //   object.moveMino(aspectRatio, delta);
      // }
      this.animatedLogo.scale.x = aspectRatio;
      this.animatedLogo.scale.y = aspectRatio;
    });
  },
  methods: {
    initLogo() {
      let bounds = Logo.getBounds();
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

      this.characters.object.push(new Logo('T'));
      this.characters.object.push(new Logo('E'));
      this.characters.object.push(new Logo('C'));
      this.characters.object.push(new Logo('H'));
      this.characters.object.push(new Logo('M'));
      this.characters.object.push(new Logo('I'));
      this.characters.object.push(new Logo('N'));
      this.characters.object.push(new Logo('O'));

      this.characters.container.push(this.characters.object[0].generate(50, 0xFFFFFF, 1, 1, 0xCC66FF))
      this.characters.container.push(this.characters.object[1].generate(50, 0xFFFFFF, 1, 1, 0x7FFFFF))
      this.characters.container.push(this.characters.object[2].generate(50, 0xFFFFFF, 1, 1, 0xB2B2FF))
      this.characters.container.push(this.characters.object[3].generate(50, 0xFFFFFF, 1, 1, 0xFFCC4C))
      this.characters.container.push(this.characters.object[4].generate(50, 0xFFFFFF, 1, 1, 0xFFB27F))
      this.characters.container.push(this.characters.object[5].generate(50, 0xFFFFFF, 1, 1, 0xFF7FFF))
      this.characters.container.push(this.characters.object[6].generate(50, 0xFFFFFF, 1, 1, 0x7FFF7F))
      this.characters.container.push(this.characters.object[7].generate(50, 0xFFFFFF, 1, 1, 0xFFFF7F))

      for (let character of this.characters.container) {
        character.scale.x *= this.initialRatio;
        character.scale.y *= this.initialRatio;
        character.x += (this.app.view.width - (bounds.right - bounds.left * 3.5) * this.initialRatio) / 2.0;
        character.y += (this.app.view.height - (bounds.bottom - bounds.top * 2) * this.initialRatio) / 2.0;
        this.animatedLogo.addChild(character);
      }
      this.app.stage.addChild(this.animatedLogo);
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
