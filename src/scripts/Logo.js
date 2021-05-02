import * as PIXI from "pixi.js";
import {MinoTypeMap} from "src/scripts/Minos";

const paths = {
  T: [
    53, 120,
    1035, 60,
    964, 278,
    660, 278,
    391, 1360,
    231, 1214,
    415, 278,
    0, 278,
  ],
  E: [
    736, 290,
    1449, 290,
    1332, 462,
    895, 489,
    841, 695,
    1168, 712,
    1037, 902,
    781, 924,
    727, 1127,
    1126, 1101,
    1218, 1300,
    485, 1300,
  ],
  C: [
    1636, 287,
    2222, 290,
    2156, 464,
    1718, 465,
    1442, 905,
    1515, 1102,
    1939, 1064,
    1863, 1280,
    1406, 1310,
    1226, 902
  ],
  H: [
    2479, 290,
    2711, 290,
    2572, 688,
    2974, 666,
    3101, 290,
    3341, 290,
    2993, 1280,
    2764, 1280,
    2901, 879,
    2499, 897,
    2356, 1280,
    2128, 1280
  ],
  M: [
    3523, 290,
    3880, 290,
    3896, 480,
    4064, 290,
    4417, 294,
    4082, 1280,
    3853, 1280,
    4097, 578,
    3858, 843,
    3704, 842,
    3651, 561,
    3401, 1280,
    3179, 1280
  ],
  I: [
    4428, 290,
    5017, 290,
    4939, 501,
    4766, 502,
    4559, 1069,
    4728, 1070,
    4657, 1280,
    4093, 1280,
    4162, 1068,
    4318, 1068,
    4534, 504,
    4356, 504
  ],
  N: [
    5307, 290,
    5538, 295,
    5481, 464,
    5746, 850,
    5926, 290,
    6159, 295,
    5848, 1280,
    5611, 1280,
    5666, 1102,
    5396, 709,
    5201, 1280,
    4966, 1280
  ],
  O: [
    6414, 290,
    6970, 295,
    7071, 415,
    6838, 1156,
    6658, 1280,
    6107, 1280,
    6004, 1154,
    6235, 416,
    6370, 542,
    6217, 1030,
    6276, 1105,
    6595, 1106,
    6700, 1029,
    6855, 541,
    6799, 465,
    6478, 463
  ]
};

class Logo {
  static getBounds() {
    return {
      top: 680,
      left: 517.5,
      bottom: 1360,
      right: 7071
    }
  }

  constructor(character) {
    this.path = paths[character];
    this.minos = [];
    this.interval = 1000;
    this.baseSpeed = 1;
    this.minoAmount = 10;

    this.bounds = {
      top: 999999,
      left: 999999,
      bottom: 0,
      right: 0
    }
    for (let index = 0; index < this.path.length; index++) {
      if (index % 2 === 0) {
        if (this.path[index] < this.bounds.left) {
          this.bounds.left = this.path[index];
        }
        if (this.path[index] > this.bounds.right) {
          this.bounds.right = this.path[index];
        }
      } else {
        if (this.path[index] < this.bounds.top) {
          this.bounds.top = this.path[index];
        }
        if (this.path[index] > this.bounds.bottom) {
          this.bounds.bottom = this.path[index];
        }
      }
    }

    this.baseLength = (this.bounds.right - this.bounds.left) / 4;
  }

  generateFilled(fillColor, fillAlpha = 1, scale = 1) {
    return this.generate(
      0,
      0x000000,
      0,
      0,
      fillColor,
      fillAlpha,
      scale
    );
  }

  generateOutlined(lineWidth, lineColor, lineAlpha, lineAlignment, scale) {
    return this.generate(
      lineWidth,
      lineColor,
      lineAlpha,
      lineAlignment,
      0x000000,
      0,
      scale
    );
  }

  generate(lineWidth, lineColor, lineAlpha, lineAlignment, fillColor, fillAlpha = 1, scale = 1) {
    let container = new PIXI.Container();

    let characterGraphics = new PIXI.Graphics();
    characterGraphics.lineStyle({
      width: lineWidth,
      color: lineColor,
      alpha: lineAlpha,
      alignment: lineAlignment,
      native: false,
      cap: PIXI.LINE_CAP.BUTT,
      join: PIXI.LINE_JOIN.MITER,
      miterLimit: 10
    });
    characterGraphics.beginFill(fillColor, fillAlpha);
    characterGraphics.drawPolygon(this.path);
    characterGraphics.endFill();
    characterGraphics.pivot.x = characterGraphics.width / 2;
    characterGraphics.pivot.y = characterGraphics.height / 2;
    characterGraphics.scale.x = scale;
    characterGraphics.scale.y = scale;
    container.addChild(characterGraphics);

    for (let i = 0; i < this.minoAmount; i++) {
      let minoGraphics;
      switch (Math.floor(Math.random() * 7)) {
        case 0:
          minoGraphics = new MinoTypeMap.I().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height;
          break;
        case 1:
          minoGraphics = new MinoTypeMap.O().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height / 2.0;
          break;
        case 2:
          minoGraphics = new MinoTypeMap.T().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height * 0.75;
          break;
        case 3:
          minoGraphics = new MinoTypeMap.S().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height * 0.75;
          break;
        case 4:
          minoGraphics = new MinoTypeMap.Z().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height * 0.75;
          break;
        case 5:
          minoGraphics = new MinoTypeMap.J().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height * 0.75;
          break;
        case 6:
          minoGraphics = new MinoTypeMap.L().generateGraphics(this.baseLength, 0xFFFFFF);
          minoGraphics.pivot.x = minoGraphics.width / 2.0;
          minoGraphics.pivot.y = minoGraphics.height * 0.75;
          break;
        default:
          break;
      }

      const mino = {
        graphics: minoGraphics,
        x: 0,
        y: 0,
        speed: 0
      };
      this._randomizeMino(mino, true);
      // container.addChild(mino.graphics);
      this.minos.push(mino);
    }
    return container;
  }

  moveMino(aspectRatio, delta) {
    let movedY = delta * this.baseSpeed;
    for (let i = 0; i < this.minoAmount; i++) {
      const mino = this.minos[i];

      mino.y -= movedY * mino.speed;
      if (mino.y < this.interval * -0.5) {
        this._randomizeMino(mino, false);
      }

      mino.graphics.x = mino.x * (this.bounds.right - this.bounds.left) * 6 / aspectRatio;
      mino.graphics.y = mino.y / this.interval * (this.bounds.bottom - this.bounds.top);
    }
  }

  _randomizeMino(mino, initial) {
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

export {Logo};
