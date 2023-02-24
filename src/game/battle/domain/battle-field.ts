import { Position } from '../../shared/position';
import { BattleArea, Biome } from './battle-area';
import { Size } from '../../shared/size';
import { BasicsAngle } from '../../shared/angle';

export type Spawn = {
  position: Position;
  angle: number;
};

export class BattleField {
  public position: Position;
  public size: Size;
  public biome: Biome;
  constructor(private battleArea: BattleArea) {
    this.size = { width: 800, height: 800 };
    this.position = { x: 800, y: 450 };
    this.biome = this.battleArea.biome;
  }

  getAlliedSpawn() {
    return {
      position: {
        x: -0.8 * (this.size.width / 2),
        y: -0.8 * (this.size.height / 2),
      },
      angle: BasicsAngle.up,
    };
  }

  getOpponentSpawn() {
    return {
      position: {
        x: (this.size.width / 2) * 0.8,
        y: (this.size.width / 2) * 0.8,
      },
      angle: BasicsAngle.bottomLeft,
    };
  }
}
