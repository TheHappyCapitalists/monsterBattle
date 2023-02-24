import { Size } from '../../shared/size';
import { Position } from '../../shared/position';
import { Biome } from './battle-area';

export type BattleState = {
  alliedMonster: {
    position: Position;
    angle: number;
    name: string;
  };
  opponentMonster: {
    position: Position;
    angle: number;
    name: string;
  };
  battleField: {
    position: Position;
    size: Size;
    biome: Biome;
  };
};
