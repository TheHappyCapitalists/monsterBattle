import { Position } from '../../shared/position';
import { Size } from '../../shared/size';

export type HitBoxPart = {
  position: Position;
  size: Size;
};

export type HitBoxSchema = {
  size: Size;
  Hitboxes: HitBoxPart[];
};
