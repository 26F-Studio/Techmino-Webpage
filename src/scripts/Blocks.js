import * as PIXI from "pixi.js";

class BaseBlock {
  constructor(id, feature, skin) {
    this.id = id;
    this.feature = feature;
    this.skin = skin;
  }

  generateSprite(skinType) {
    const texture = PIXI.Texture.from('skins/' + skinType + '/' + this.skin + '.png');
    const block = new PIXI.Sprite(texture);
    block.anchor.set(0.5);
    return block;
  }
}

class ForbiddenBlock extends BaseBlock {
  constructor() {
    super(0, {
      solid: false,
      fragile: false,
      explosive: false
    }, 'forbidden');
  }
}

class AirBlock extends BaseBlock {
  constructor() {
    super(1, {
      solid: false,
      fragile: false,
      explosive: false
    }, 'transparent');
  }
}

class RedBlock extends BaseBlock {
  constructor() {
    super(2, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'red');
  }
}

class AmberBlock extends BaseBlock {
  constructor() {
    super(3, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'amber');
  }
}

class OrangeBlock extends BaseBlock {
  constructor() {
    super(4, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'orange');
  }
}

class YellowBlock extends BaseBlock {
  constructor() {
    super(5, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'yellow');
  }
}

class LimeBlock extends BaseBlock {
  constructor() {
    super(6, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'lime');
  }
}

class GrassBlock extends BaseBlock {
  constructor() {
    super(7, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'grass');
  }
}

class GreenBlock extends BaseBlock {
  constructor() {
    super(8, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'green');
  }
}

class AquaBlock extends BaseBlock {
  constructor() {
    super(9, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'aqua');
  }
}

class CyanBlock extends BaseBlock {
  constructor() {
    super(10, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'cyan');
  }
}

class SkyBlock extends BaseBlock {
  constructor() {
    super(11, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'sky');
  }
}

class SeaBlock extends BaseBlock {
  constructor() {
    super(12, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'sea');
  }
}

class BlueBlock extends BaseBlock {
  constructor() {
    super(13, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'blue');
  }
}

class PurpleBlock extends BaseBlock {
  constructor() {
    super(14, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'purple');
  }
}

class GrapeBlock extends BaseBlock {
  constructor() {
    super(15, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'grape');
  }
}

class MagentaBlock extends BaseBlock {
  constructor() {
    super(16, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'magenta');
  }
}

class PinkBlock extends BaseBlock {
  constructor() {
    super(17, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'pink');
  }
}

class BoneBlock extends BaseBlock {
  constructor() {
    super(18, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'bone');
  }
}

class TransparentBlock extends BaseBlock {
  constructor() {
    super(19, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'transparent');
  }
}

class LightYellowBlock extends BaseBlock {
  constructor() {
    super(20, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'lightYellow');
  }
}

class GrayBlock extends BaseBlock {
  constructor() {
    super(21, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'gray');
  }
}

class LightGrayBlock extends BaseBlock {
  constructor() {
    super(22, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'lightGray');
  }
}

class LightPurpleBlock extends BaseBlock {
  constructor() {
    super(23, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'lightPurple');
  }
}

class LightPinkBlock extends BaseBlock {
  constructor() {
    super(24, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'lightPink');
  }
}

class LightAquaBlock extends BaseBlock {
  constructor() {
    super(25, {
      solid: true,
      fragile: false,
      explosive: false
    }, 'lightAqua');
  }
}

const blockTypeMap = {
  0: ForbiddenBlock,
  1: AirBlock,
  2: RedBlock,
  3: AmberBlock,
  4: OrangeBlock,
  5: YellowBlock,
  6: LimeBlock,
  7: GrassBlock,
  8: GreenBlock,
  9: AquaBlock,
  10: CyanBlock,
  11: SkyBlock,
  12: SeaBlock,
  13: BlueBlock,
  14: PurpleBlock,
  15: GrapeBlock,
  16: MagentaBlock,
  17: PinkBlock,
  18: BoneBlock,
  19: TransparentBlock,
  20: LightYellowBlock,
  21: GrayBlock,
  22: LightGrayBlock,
  23: LightPurpleBlock,
  24: LightPinkBlock,
  25: LightAquaBlock
};

export {blockTypeMap};
