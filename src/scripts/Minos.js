import * as PIXI from "pixi.js";

class BaseMino {
  constructor(name, prefix, postfix, shape, color, initPosition, kickMap, mutateMap) {
    this.name = name;
    this.prefix = prefix;
    this.postfix = postfix;
    this._originalShape = shape;
    this.color = color;
    this.position = initPosition;
    this.kickMap = kickMap;
    this.mutateMap = mutateMap;

    this.shape = this._originalShape;
    this.rotation = 1;
  }

  generateGraphics(edgeLength, color) {
    let nodeList = [], route = [];
    for (let index in this._originalShape) {
      if (this._originalShape.hasOwnProperty(index)) {
        for (let corner = 0; corner < 4; corner++) {
          let x = (this._originalShape[index].dx - ((corner % 2) * 2 - 1) / 2) * edgeLength;
          let y = (this._originalShape[index].dy - (Math.floor(corner / 2) * 2 - 1) / 2) * edgeLength;
          nodeList.push({
            x: x,
            y: y
          });
        }
      }
    }
    let startPoint = {},
      previousPoint = {},
      nowPoint = {};
    startPoint.x = nodeList[0].x;
    startPoint.y = nodeList[0].y;
    previousPoint.x = startPoint.x - 1;
    previousPoint.y = startPoint.y;
    nowPoint.x = startPoint.x;
    nowPoint.y = startPoint.y;
    route.push(startPoint);

    let count = 0;
    do {
      for (let direction = 0; direction < 3; direction++) {
        let found = false;
        let tryPoint = _getTryPoint(previousPoint, nowPoint, direction);
        for (let nextPoint of nodeList) {
          if (tryPoint.x === nextPoint.x && tryPoint.y === nextPoint.y) {
            route.push(tryPoint);
            previousPoint.x = nowPoint.x;
            previousPoint.y = nowPoint.y;
            nowPoint.x = nextPoint.x;
            nowPoint.y = nextPoint.y;
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      count++;
    } while ((nowPoint.x !== nodeList[0].x || nowPoint.y !== nodeList[0].y) && count < nodeList.length * 2);

    let graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    for (let index = 0; index < route.length; index++) {
      if (index === 0) {
        graphics.moveTo(route[index].x, route[index].y);
      } else {
        graphics.lineTo(route[index].x, route[index].y);
      }
    }
    graphics.endFill();

    return graphics;

    function _getTryPoint(previousPoint, nowPoint, direction) {
      if (nowPoint.x < previousPoint.x) {
        switch (direction) {
          case 0:
            return {
              x: nowPoint.x,
              y: nowPoint.y - edgeLength
            }
          case 1:
            return {
              x: nowPoint.x - edgeLength,
              y: nowPoint.y
            }
          case 2:
            return {
              x: nowPoint.x,
              y: nowPoint.y + edgeLength
            }
        }
      } else if (nowPoint.x > previousPoint.x) {
        switch (direction) {
          case 0:
            return {
              x: nowPoint.x,
              y: nowPoint.y + edgeLength
            }
          case 1:
            return {
              x: nowPoint.x + edgeLength,
              y: nowPoint.y
            }
          case 2:
            return {
              x: nowPoint.x,
              y: nowPoint.y - edgeLength
            }
        }
      } else if (nowPoint.y < previousPoint.y) {
        switch (direction) {
          case 0:
            return {
              x: nowPoint.x + edgeLength,
              y: nowPoint.y
            }
          case 1:
            return {
              x: nowPoint.x,
              y: nowPoint.y - edgeLength
            }
          case 2:
            return {
              x: nowPoint.x - edgeLength,
              y: nowPoint.y
            }
        }
      } else if (nowPoint.y > previousPoint.y) {
        switch (direction) {
          case 0:
            return {
              x: nowPoint.x - edgeLength,
              y: nowPoint.y
            }
          case 1:
            return {
              x: nowPoint.x,
              y: nowPoint.y + edgeLength
            }
          case 2:
            return {
              x: nowPoint.x + edgeLength,
              y: nowPoint.y
            }
        }
      }
    }
  }

  generatePosition(field) {
    this.position.x += Math.floor((field.width - 1) / 2.0);
    this.position.y += field.height;
  }

  moveX(isReverse, field) {
    let transformPosition = this._collapse(field, {dx: isReverse ? -1 : 1, dy: 0}, this.rotation);
    if (transformPosition) {
      this.position.x += transformPosition.dx;
      this.position.y += transformPosition.dy;
    }
  }

  moveY(isReverse, field) {
    let transformPosition = this._collapse(field, {dx: 0, dy: isReverse ? 1 : -1}, this.rotation);
    if (transformPosition) {
      this.position.x += transformPosition.dx;
      this.position.y += transformPosition.dy;
    }
  }

  rotate(direction, field) {
    let newRotation;
    direction %= 4;
    if (this.rotation + direction < 1) {
      newRotation = this.rotation + direction + 4;
    } else if (this.rotation + direction > 4) {
      newRotation = (this.rotation + direction) % 4;
    } else {
      newRotation = this.rotation + direction;
    }
    if (newRotation !== this.rotation) {
      let transformPosition = this._collapse(field, {dx: 0, dy: 0}, newRotation);
      if (transformPosition) {
        this.rotation = newRotation;
        this.shape = this._getShape(newRotation);
        this.position.x += transformPosition.dx;
        this.position.y += transformPosition.dy;
      }
    }
  }

  _collapse(field, offset, rotation) {
    let canTransform = true, tryKicking = false, transformPosition = {dx: 0, dy: 0};
    for (let block of this._getShape(rotation)) {
      if (!field.cells[x + block.dx + offset.dx][y + block.dy + offset.dy].isEmpty) {
        canTransform = false;
        tryKicking = rotation !== this.rotation;
        break;
      }
    }

    if (tryKicking) {
      let kickList = this.kickMap[this.rotation + rotation];
      if (kickList) {
        for (let kickMethod of kickList) {
          let kickSucceeded = true;
          for (let block of this._getShape(rotation)) {
            if (!field.cells[x + block.dx + offset.dx + kickMethod.dx][y + block.dy + offset.dy + kickMethod.dy].isEmpty) {
              kickSucceeded = false;
              break;
            }
          }
          if (kickSucceeded) {
            transformPosition.dx = kickMethod.dx;
            transformPosition.dy = kickMethod.dy;
            canTransform = true;
            break;
          }
        }
      }
    }

    if (canTransform) {
      return transformPosition;
    } else {
      return null;
    }
  }

  _getShape(rotation) {
    let shape = this._originalShape;
    switch (rotation) {
      case 1:
        shape = this._originalShape;
        break;
      case 2:
        for (let index in this._originalShape) {
          if (this._originalShape.hasOwnProperty(index)) {
            shape[index].dx = this._originalShape[index].dy;
            shape[index].dy = -this._originalShape[index].dx;
          }
        }
        break;
      case 3:
        for (let index in this._originalShape) {
          if (this._originalShape.hasOwnProperty(index)) {
            shape[index].dx = -this._originalShape[index].dx;
            shape[index].dy = -this._originalShape[index].dy;
          }
        }
        break;
      case 4:
        for (let index in this._originalShape) {
          if (this._originalShape.hasOwnProperty(index)) {
            shape[index].dx = -this._originalShape[index].dy;
            shape[index].dy = this._originalShape[index].dx;
          }
        }
        break;
    }
    return shape;
  }
}

class IMino extends BaseMino {
  constructor() {
    super('I', 'classic', null, [
      {dx: -1.5, dy: +0.5},
      {dx: +1.5, dy: +0.5},
      {dx: -0.5, dy: +0.5},
      {dx: +0.5, dy: +0.5},
    ], 0x5BEAED, {x: 0.5, y: -0.5}, {
      12: [{dx: +0, dy: +1}, {dx: +1, dy: +0}, {dx: -2, dy: +0}, {dx: -2, dy: -1}, {dx: +1, dy: +2}],
      21: [{dx: +2, dy: +0}, {dx: -1, dy: +0}, {dx: -1, dy: -2}, {dx: +2, dy: +1}, {dx: +0, dy: +1}],
      14: [{dx: +0, dy: +1}, {dx: -1, dy: +0}, {dx: +2, dy: +0}, {dx: +2, dy: -1}, {dx: -1, dy: +2}],
      41: [{dx: -2, dy: +0}, {dx: +1, dy: +0}, {dx: +1, dy: -2}, {dx: -2, dy: +1}, {dx: +0, dy: +1}],
      23: [{dx: -1, dy: +0}, {dx: +2, dy: +0}, {dx: +2, dy: -1}, {dx: +0, dy: -1}, {dx: -1, dy: +2}],
      32: [{dx: -2, dy: +0}, {dx: +1, dy: +0}, {dx: +1, dy: -2}, {dx: -2, dy: +1}, {dx: +0, dy: +1}],
      43: [{dx: +1, dy: +0}, {dx: -2, dy: +0}, {dx: -2, dy: -1}, {dx: +0, dy: -1}, {dx: +1, dy: +2}],
      34: [{dx: +2, dy: +0}, {dx: -1, dy: +0}, {dx: -1, dy: -2}, {dx: +2, dy: +1}, {dx: +0, dy: +1}],
      13: [{dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +1}],
      31: [{dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -1}],
      24: [{dx: +0, dy: -1}, {dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: +1}],
      42: [{dx: +0, dy: -1}, {dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: +1}],
    }, null);
  }
}

class OMino extends BaseMino {
  constructor() {
    super('O', 'classic', null, [
      {dx: -0.5, dy: +0.5},
      {dx: -0.5, dy: -0.5},
      {dx: +0.5, dy: +0.5},
      {dx: +0.5, dy: -0.5},
    ], 0xEAED5B, {x: 0.5, y: 0.5}, null, {
      //TODO: Implement O-Spin Map
    });
  }
}

class TMino extends BaseMino {
  constructor() {
    super('T', 'classic', null, [
      {dx: -1, dy: +0},
      {dx: +0, dy: +1},
      {dx: +1, dy: +0},
      {dx: +0, dy: +0},
    ], 0xBA5BED, {x: 0, y: 0}, {
      12: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: +2}, {dx: +0, dy: +1}],
      21: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: -2}, {dx: +1, dy: -2}],
      14: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -1}, {dx: +1, dy: -2}],
      41: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: +0, dy: -1}],
      23: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      32: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: -2}],
      43: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}],
      34: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}],
      13: [{dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +1}],
      31: [{dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -1}],
      24: [{dx: +0, dy: -1}, {dx: +0, dy: +1}, {dx: +0, dy: -2}],
      42: [{dx: +0, dy: +1}, {dx: +0, dy: -1}, {dx: +0, dy: +2}],
    }, null);
  }
}

class SMino extends BaseMino {
  constructor() {
    super('S', 'classic', null, [
      {dx: +1, dy: +1},
      {dx: +0, dy: +1},
      {dx: -1, dy: +0},
      {dx: +0, dy: +0},
    ], 0xED5B5B, {x: 0, y: 0}, {
      12: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: +2}, {dx: +0, dy: +1}],
      21: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: -2}, {dx: +1, dy: -2}],
      14: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -1}, {dx: +1, dy: -2}],
      41: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: +0, dy: -1}],
      23: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      32: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: -2}],
      43: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}],
      34: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}],
      13: [{dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +1}],
      31: [{dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -1}],
      24: [{dx: +0, dy: -1}, {dx: +0, dy: +1}, {dx: +0, dy: -2}],
      42: [{dx: +0, dy: +1}, {dx: +0, dy: -1}, {dx: +0, dy: +2}],
    }, null);
  }
}

class ZMino extends BaseMino {
  constructor() {
    super('Z', 'classic', null, [
      {dx: -1, dy: +1},
      {dx: +0, dy: +1},
      {dx: +1, dy: +0},
      {dx: +0, dy: +0},
    ], 0x5BED5B, {x: 0, y: 0}, {
      12: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: +2}, {dx: +0, dy: +1}],
      21: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: -2}, {dx: +1, dy: -2}],
      14: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -1}, {dx: +1, dy: -2}],
      41: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: +0, dy: -1}],
      23: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      32: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: -2}],
      43: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}],
      34: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}],
      13: [{dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +1}],
      31: [{dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -1}],
      24: [{dx: +0, dy: -1}, {dx: +0, dy: +1}, {dx: +0, dy: -2}],
      42: [{dx: +0, dy: +1}, {dx: +0, dy: -1}, {dx: +0, dy: +2}],
    }, null);
  }
}

class JMino extends BaseMino {
  constructor() {
    super('J', 'classic', null, [
      {dx: -1, dy: +1},
      {dx: -1, dy: +0},
      {dx: +1, dy: +0},
      {dx: +0, dy: +0},
    ], 0xED955B, {x: 0, y: 0}, {
      12: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +1, dy: +0}, {dx: +0, dy: -2}, {dx: +1, dy: +1}],
      21: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: -1, dy: +0}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      14: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}, {dx: +1, dy: -1}, {dx: +0, dy: +1}],
      41: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: +0, dy: -1}, {dx: -1, dy: +1}],
      23: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +1, dy: +1}, {dx: -1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      32: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: -1, dy: -1}, {dx: +1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: -2}],
      43: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +1, dy: +0}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: -1, dy: +1}],
      34: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: -1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}],
      13: [{dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +1}],
      31: [{dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -1}],
      24: [{dx: +0, dy: -1}, {dx: +0, dy: +1}, {dx: +1, dy: +0}],
      42: [{dx: +0, dy: +1}, {dx: +0, dy: -1}, {dx: -1, dy: +0}],
    }, null);
  }
}

class LMino extends BaseMino {
  constructor() {
    super('L', 'classic', null, [
      {dx: +1, dy: +1},
      {dx: +1, dy: +0},
      {dx: -1, dy: +0},
      {dx: +0, dy: +0},
    ], 0x5B8AED, {x: 0, y: 0}, {
      12: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: +1, dy: +0}, {dx: +0, dy: -2}, {dx: +1, dy: +1}],
      21: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: -1, dy: +0}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      14: [{dx: +1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}, {dx: +1, dy: -1}, {dx: +0, dy: +1}],
      41: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: +0, dy: -1}, {dx: -1, dy: +1}],
      23: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: +1, dy: +1}, {dx: -1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +2}, {dx: +1, dy: +2}],
      32: [{dx: -1, dy: +0}, {dx: -1, dy: +1}, {dx: -1, dy: -1}, {dx: +1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -2}, {dx: -1, dy: -2}],
      43: [{dx: -1, dy: +0}, {dx: -1, dy: -1}, {dx: +1, dy: +0}, {dx: +0, dy: +2}, {dx: -1, dy: +2}, {dx: -1, dy: +1}],
      34: [{dx: +1, dy: +0}, {dx: +1, dy: -1}, {dx: -1, dy: +0}, {dx: +1, dy: +1}, {dx: +0, dy: -2}, {dx: +1, dy: -2}],
      13: [{dx: -1, dy: +0}, {dx: +1, dy: +0}, {dx: +0, dy: -1}, {dx: +0, dy: +1}],
      31: [{dx: +1, dy: +0}, {dx: -1, dy: +0}, {dx: +0, dy: +1}, {dx: +0, dy: -1}],
      24: [{dx: +0, dy: -1}, {dx: +0, dy: +1}, {dx: +1, dy: +0}],
      42: [{dx: +0, dy: +1}, {dx: +0, dy: -1}, {dx: -1, dy: +0}],
    }, null);
  }
}

const MinoTypeMap = {
  I: IMino,
  O: OMino,
  T: TMino,
  S: SMino,
  Z: ZMino,
  J: JMino,
  L: LMino
};

export {MinoTypeMap};
