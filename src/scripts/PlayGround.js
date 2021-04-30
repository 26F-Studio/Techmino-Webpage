import {blockTypeMap} from "src/scripts/Blocks";
import MissDrops from "src/assets/fieldLists/MissDrops.json"

class PlayGround {
  constructor(fieldWidth, fieldHeight) {
    this.field = {
      width: fieldWidth,
      height: fieldHeight,
      cells: []
    };
    this.clearField();
  }

  clearField() {
    for (let i = 0; i < this.field.height; i++) {
      this.field.cells[i] = [];
      for (let j = 0; j < this.field.width; j++) {
        this.field.cells[i][j] = new blockTypeMap[1]();
      }
    }
  }

  setField(fieldData) {
    fieldData = fieldData.substr(15);
    const zlib = require('zlib');
    let compressedData = Buffer.from(fieldData, 'base64');
    zlib.unzip(compressedData, (err, buffer) => {
      if (err) {
        console.log(err);
      } else {
        for (let index in buffer) {
          if (buffer.hasOwnProperty(index)) {
            this.field.cells[Math.floor(index / this.field.width)][index % this.field.width] = new blockTypeMap[buffer[index]]();
          }
        }
      }
    });
  }

  async playFieldList(app) {
    let freshDelay = 20, endDelay = 1000;
    let animationIndex = Math.floor(Math.random() * MissDrops.length);
    while (!0) {
      for (let fieldData of MissDrops[animationIndex].begin) {
        this.clearField();
        this.setField(fieldData);
        await this.sleep(freshDelay);
        this.generateField(app);
        await this.sleep(MissDrops[animationIndex].interval);
      }
      for (let loopIndex = 0; loopIndex < MissDrops[animationIndex]["repeatCount"]; loopIndex++) {
        for (let fieldData of MissDrops[animationIndex].loop) {
          this.clearField();
          this.setField(fieldData);
          await this.sleep(freshDelay);
          this.generateField(app);
          await this.sleep(MissDrops[animationIndex].interval);
        }
      }
      for (let fieldData of MissDrops[animationIndex].end) {
        this.clearField();
        this.setField(fieldData);
        await this.sleep(freshDelay);
        this.generateField(app);
        await this.sleep(MissDrops[animationIndex].interval);
      }
      await this.sleep(endDelay);
    }
  }

  generateField(app) {
    app.stage.removeChildren();
    let blockWidth;
    if (window.innerWidth / window.innerHeight > this.field.width / this.field.height) {
      blockWidth = window.innerHeight / this.field.height;
    } else {
      blockWidth = window.innerWidth / this.field.width;
    }
    let initX = (window.innerWidth - blockWidth * this.field.width + 1) / 2;
    for (let row = 0; row < this.field.height; row++) {
      for (let column = 0; column < this.field.width; column++) {
        let blockSprite = this.field.cells[row][column].generateSprite('crystal');
        blockSprite.scale.x = blockWidth / blockSprite.width;
        blockSprite.scale.y = blockWidth / blockSprite.height;
        blockSprite.x = blockWidth * column + initX;
        blockSprite.y = blockWidth * (this.field.height - 1 - row);
        app.stage.addChild(blockSprite);
      }
    }
    app.render();
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export {PlayGround};
