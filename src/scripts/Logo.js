import * as PIXI from "pixi.js";

class Logo {
  constructor() {
    this.paths = {
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
    }
  }

  getBounds() {
    return {
      top: 680,
      left: 517.5,
      bottom: 1360,
      right: 7071
    }
  }

  generateFilled(character, fillColor, fillAlpha = 1, scale = 1) {
    return this.generate(character,
      0,
      0x000000,
      0,
      0,
      fillColor,
      fillAlpha,
      scale
    );
  }

  generateOutlined(character, lineWidth, lineColor, lineAlpha, lineAlignment, scale) {
    return this.generate(character,
      lineWidth,
      lineColor,
      lineAlpha,
      lineAlignment,
      0x000000,
      0,
      scale
    );
  }

  generate(character, lineWidth, lineColor, lineAlpha, lineAlignment, fillColor, fillAlpha, scale) {
    let container = new PIXI.Container();
    let graphics = new PIXI.Graphics();
    graphics.lineStyle({
      width: lineWidth,
      color: lineColor,
      alpha: lineAlpha,
      alignment: lineAlignment,
      native: false,
      cap: PIXI.LINE_CAP.BUTT,
      join: PIXI.LINE_JOIN.MITER,
      miterLimit: 10
    });
    graphics.beginFill(fillColor, fillAlpha);
    graphics.drawPolygon(this.paths[character]);
    graphics.endFill();
    graphics.pivot.x = graphics.width / 2;
    graphics.pivot.y = graphics.height / 2;
    graphics.scale.x = scale;
    graphics.scale.y = scale;
    container.addChild(graphics);
    let bounds = {
      top: 999999,
      left: 999999,
      bottom: 0,
      right: 0
    }
    for (let even = 0; even < this.paths[character].length; even += 2) {
      if(this.paths[character][even] < bounds.left){
        bounds.left = this.paths[character][even];
      }
      if(this.paths[character][even] > bounds.right){
        bounds.right = this.paths[character][even];
      }
    }

    for (let odd = 1; odd < this.paths[character].length; odd += 2) {
      if(this.paths[character][odd] < bounds.top){
        bounds.top = this.paths[character][odd];
      }
      if(this.paths[character][odd] > bounds.bottom){
        bounds.bottom = this.paths[character][odd];
      }
    }

    console.log(bounds);

    return container;
  }
}

export {Logo};
