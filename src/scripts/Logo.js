const paths = {
  T: [
    53, 60,
    1035, 0,
    964, 218,
    660, 218,
    391, 1300,
    231, 1154,
    415, 218,
    0, 218,
  ],
  E: [
    251, 0,
    964, 0,
    847, 172,
    410, 199,
    356, 405,
    683, 422,
    552, 612,
    296, 634,
    242, 837,
    641, 811,
    733, 1010,
    0, 1010,
  ],
  C: [
    410, 0,
    996, 3,
    930, 177,
    492, 178,
    216, 618,
    289, 815,
    713, 777,
    637, 993,
    180, 1023,
    0, 615
  ],
  H: [
    351, 0,
    583, 0,
    444, 398,
    846, 376,
    973, 0,
    1213, 0,
    865, 990,
    636, 990,
    773, 589,
    371, 607,
    228, 990,
    0, 990,
  ],
  M: [
    344, 0,
    701, 0,
    717, 190,
    885, 0,
    1238, 4,
    903, 990,
    674, 990,
    918, 288,
    679, 553,
    525, 552,
    472, 271,
    222, 990,
    0, 990,
  ],
  I: [
    335, 0,
    924, 0,
    846, 211,
    673, 212,
    466, 779,
    635, 780,
    564, 990,
    0, 990,
    69, 778,
    225, 778,
    441, 214,
    263, 214
  ],
  N: [
    341, 0,
    572, 5,
    515, 174,
    780, 560,
    960, 0,
    1193, 5,
    882, 990,
    645, 990,
    700, 812,
    430, 419,
    235, 990,
    0, 990,
  ],
  O: [
    410, 0,
    966, 5,
    1067, 125,
    834, 866,
    654, 990,
    103, 990,
    0, 864,
    231, 126,
    366, 252,
    213, 740,
    272, 815,
    591, 816,
    696, 739,
    851, 251,
    795, 175,
    474, 173,
  ]
};

class Logo {
  constructor() {
    this.timer = 0;

    this.bounds = {
      top: 680,
      left: 517.5,
      bottom: 1360,
      right: 7071
    };

    this.characters = {
      T: {},
      E: {},
      C: {},
      H: {},
      M: {},
      I: {},
      N: {},
      O: {},
    };
    for (let character in paths) {
      this.characters[character].name = character;
      this.characters[character].path = paths[character];
      this.characters[character].style = {};
      this.characters[character].style.stroke = "#FFFFFF";
      this.characters[character].style["stroke-opacity"] = 0;
      this.characters[character].style["stroke-width"] = "30px";
      this.characters[character].style.fill = "none";
      this.characters[character].position = {x: 0, y: 0};
    }
    this.characters.T.fillColor = "#CC66FF";
    this.characters.E.fillColor = "#7FFFFF";
    this.characters.C.fillColor = "#B2B2FF";
    this.characters.H.fillColor = "#FFCC4C";
    this.characters.M.fillColor = "#FFB27F";
    this.characters.I.fillColor = "#FF7FFF";
    this.characters.N.fillColor = "#7FFF7F";
    this.characters.O.fillColor = "#FFFF7F";

    this.characters.T.originalPosition = {x: 0, y: 0};
    this.characters.E.originalPosition = {x: 500, y: 330};
    this.characters.C.originalPosition = {x: 1200, y: 327};
    this.characters.H.originalPosition = {x: 1970, y: 330};
    this.characters.M.originalPosition = {x: 2970, y: 330};
    this.characters.I.originalPosition = {x: 4010, y: 330};
    this.characters.N.originalPosition = {x: 4720, y: 330};
    this.characters.O.originalPosition = {x: 5770, y: 330};

    this.animations = {
      T(character, timer) {
        character.position.y = character.originalPosition.y + Math.pow(Math.max(60 - timer, 0), 2) / 2;
      },
      E(character, timer) {
        character.position.y = character.originalPosition.y - Math.pow(Math.max(60 - timer, 0), 2) / 2;
      },
      C(character, timer) {
        character.position.x = character.originalPosition.x + Math.sin(new Date().getTime() / 1000 * 3 + 626 * 3) * Math.max(60 - timer, 0) * 10;
        character.position.y = character.originalPosition.y + Math.cos(new Date().getTime() / 1000 * 3 + 626 * 3) * Math.max(60 - timer, 0) * 10;
      },
      H(character, timer) {
        character.position.x = character.originalPosition.x + Math.sin(new Date().getTime() / 1000 * 3 + 626 * 4) * Math.max(60 - timer, 0) * 10;
        character.position.y = character.originalPosition.y - Math.cos(new Date().getTime() / 1000 * 3 + 626 * 4) * Math.max(60 - timer, 0) * 10;
      },
      M(character, timer) {
        character.position.y = character.originalPosition.y + Math.pow(Math.max(60 - timer, 0), 2) / 2;
      },
      I(character, timer) {
        character.position.y = character.originalPosition.y + Math.pow(Math.max(60 - timer, 0), 2) / 2;
      },
      N(character, timer) {
        character.position.y = character.originalPosition.y + Math.pow(Math.max(60 - timer, 0), 2) / 2;
      },
      O(character, timer) {
        character.position.y = character.originalPosition.y + Math.pow(Math.max(60 - timer, 0), 2) / 2;
      },
      fadeIn(character) {
        character.style["stroke-opacity"] = character.style["stroke-opacity"] < 0.6 ? character.style["stroke-opacity"] + 0.01 : 0.6;
      }
    };
  }

  initPosition() {
    for (let character in this.characters) {
      if (this.characters.hasOwnProperty(character)) {
        this.characters[character].position.x = this.characters[character].originalPosition.x;
        this.characters[character].position.y = this.characters[character].originalPosition.y;
      }
    }
  }


  animate(frameLimit) {
    if (this.timer < frameLimit) {
      for (let character in this.characters) {
        if (this.characters.hasOwnProperty(character)) {
          this.animations[character](this.characters[character], this.timer);
          this.animations.fadeIn(this.characters[character]);
        }
      }
      this.timer++;
    }
  }
}

export {
  Logo
};
